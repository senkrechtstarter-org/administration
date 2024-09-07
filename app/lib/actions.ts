"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { sql } from "@vercel/postgres";
// import { AuthError } from "next-auth";

const SchoolSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    last_visit: z.date(),
    contact_person: z.string(),
    email: z.string(),
    phone: z.string(),
    relation: z.enum(["GOOD", "MIDDLE", "BAD"]),
});

const CreateSchool = SchoolSchema.omit({ id: true, last_visit: true });

export async function createSchool(admins: Set<any>, formData: FormData) {
    const adminsArray = Array.from(admins).map((id) => ({ id }));

    const schoolData = {
        name: formData.get("name")?.toString(),
        address: formData.get("address")?.toString(),
        contact_person: formData.get("contact_person")?.toString(),
        email: formData.get("email")?.toString(),
        phone: formData.get("phone")?.toString(),
        relation: formData.get("relation")?.toString(),
    };

    await sql`INSERT INTO school (name, address, contact_person, email, phone, relation) VALUES (${schoolData.name}, ${schoolData.address}, ${schoolData.contact_person}, ${schoolData.email}, ${schoolData.phone}, ${schoolData.relation})`;

    adminsArray.forEach(async (admin) => {
        await sql`INSERT INTO admin (school_id, member_id) VALUES ((SELECT id FROM school WHERE name = ${schoolData.name}), ${admin.id})`;
    });
    revalidatePath("/schools");
    redirect("/schools");
}

export async function editSchool(id: string, admins: any, formData: FormData) {
    const adminsArray = Array.from(admins).map((id) => ({ id }));

    const schoolData = {
        name: formData.get("name")?.toString(),
        address: formData.get("address")?.toString(),
        contact_person: formData.get("contact_person")?.toString(),
        email: formData.get("email")?.toString(),
        phone: formData.get("phone")?.toString(),
        relation: formData.get("relation")?.toString(),
    };

    await sql`UPDATE school SET name = ${schoolData.name}, address = ${schoolData.address}, contact_person = ${schoolData.contact_person}, email = ${schoolData.email}, phone = ${schoolData.phone}, relation = ${schoolData.relation} WHERE id = ${id}`;

    adminsArray.forEach(async (admin) => {
        await sql`INSERT INTO admin (school_id, member_id) VALUES (${id}, ${
            admin.id as string
        })`;
    });

    revalidatePath("/schools");
    redirect("/schools");
}

export async function deleteSchool(id: string) {
    await sql`DELETE FROM School WHERE id = ${id}`;

    revalidatePath("/schools");
}

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
});

const CreateUser = UserSchema.omit({ id: true });

export async function createUser(formData: FormData) {
    const userData = CreateUser.parse({
        name: formData.get("name"),
        email: formData.get("email"),
    });

    await sql`INSERT INTO member (name, email) VALUES (${userData.name}, ${userData.email})`;
    revalidatePath("/members");
    redirect("/members");
}

export async function editUser(id: string, formData: FormData) {
    const userData = CreateUser.parse({
        name: formData.get("name"),
        email: formData.get("email"),
    });

    await sql`UPDATE member SET name = ${userData.name}, email = ${userData.email} WHERE id = ${id}`;

    revalidatePath("/members");
    redirect("/members");
}

export async function deleteUser(id: string) {
    await sql`DELETE FROM member WHERE id = ${id}`;
    revalidatePath("/members");
}

export async function createReport(
    schoolId: string,
    participantIds: string[],
    date: Date,
    content: string,
) {
    const response =
        await sql`INSERT INTO report (school_id, date, content) VALUES (${schoolId}, ${date.toDateString()}, ${content}) RETURNING id`;

    for (const participantId of participantIds) {
        await sql`INSERT INTO participant (report_id, member_id) VALUES (${response.rows[0].id}, ${participantId})`;
    }

    revalidatePath(`/schools/${schoolId}/reports`);
    redirect(`/schools/${schoolId}/reports`);
}

export async function editReport(
    id: string,
    schoolId: string,
    participantIds: any,
    date: Date,
    content: string,
) {
    console.log("Date string: ", date.toDateString());
    console.log("content: ", content);
    console.log("participants: ", participantIds);
    await sql`UPDATE report SET date = ${date.toDateString()}, content = ${content} WHERE id = ${id}`;

    for (const participantId of participantIds) {
        await sql`INSERT INTO participant (report_id, member_id) VALUES (${id}, ${participantId})`;
    }

    revalidatePath(`/schools/${schoolId}/reports`);
    redirect(`/schools/${schoolId}/reports`);
}
export async function createProtocol(
    participantsData: any,
    date: Date,
    content: string,
) {
    const participants = Array.from(participantsData).map((id) => ({ id }));

    console.log("Date string: ", date.toDateString());

    const response =
        await sql`INSERT INTO protocol (date, content) VALUES (${date.toDateString()}, ${content}) RETURNING id`;

    participants.forEach(async (participant: any) => {
        await sql`INSERT INTO protocol_participant (protocol_id, member_id) VALUES (${response.rows[0].id}, ${participant.id})`;
    });

    revalidatePath(`/protocols`);
    redirect(`/protocols`);
}

export async function editProtocol(
    protocolId: string,
    participantsData: any,
    date: Date,
    content: string,
) {
    const participants = Array.from(participantsData).map((id) => ({ id }));

    console.log("Date string: ", date.toDateString());

    const response =
        await sql`UPDATE protocol SET (date, content) VALUES (${date.toDateString()}, ${content})  WHERE id = ${protocolId}`;

    participants.forEach(async (participant: any) => {
        await sql`INSERT INTO protocol_participant (protocol_id, member_id) VALUES (${response.rows[0].id}, ${participant.id})`;
    });

    revalidatePath(`/protocols`);
    redirect(`/protocols`);
}

export async function deleteProtocol(id: string) {
    await sql`DELETE FROM protocol WHERE id = ${id}`;
    revalidatePath("/protocols");
}

export async function deleteReport(id: string) {
    await sql`DELETE FROM report WHERE id = ${id}`;
    revalidatePath("/members");
}

export async function promoteUser(id: string) {
    await sql`UPDATE member SET is_speaker = TRUE WHERE id = ${id}`;
    revalidatePath("/members");
}

export async function demoteUser(id: string) {
    await sql`UPDATE member SET is_speaker = FALSE WHERE id = ${id}`;
    revalidatePath("/members");
}

export async function markEmailSent(schoolId: string) {
    console.log("Marking as sent...");
    await sql`UPDATE school SET email_sent = TRUE WHERE id = ${schoolId}`;
    revalidatePath("/schools");
}

export async function markEmailUnsent(schoolId: string) {
    await sql`UPDATE school SET email_sent = FALSE WHERE id = ${schoolId}`;
    revalidatePath("/schools");
}

export async function authenticate(prevState: string | undefined) {
    "use server";
    try {
        signIn("google");
    } catch (error) {
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case "CredentialsSignin":
        //             return "Invalid credentials.";
        //         default:
        //             return "Something went wrong.";
        //     }
        // }
        throw error;
    }
}
