"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";
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

export async function createSchool(adminIds: string[], formData: FormData) {
    const schoolData = {
        name: formData.get("name")?.toString(),
        address: formData.get("address")?.toString(),
        contact_person: formData.get("contact_person")?.toString(),
        email: formData.get("email")?.toString(),
        phone: formData.get("phone")?.toString(),
        relation: formData.get("relation")?.toString(),
    };

    await sql`INSERT INTO school (name, address, contact_person, email, phone, relation) VALUES (${schoolData.name}, ${schoolData.address}, ${schoolData.contact_person}, ${schoolData.email}, ${schoolData.phone}, ${schoolData.relation})`;

    for (const adminId of adminIds) {
        await sql`INSERT INTO admin (school_id, member_id) VALUES ((SELECT id FROM school WHERE name = ${schoolData.name}), ${adminId})`;
    }
    revalidatePath("/schools");
    redirect("/schools");
}

export async function editSchool(
    id: string,
    adminIds: string[],
    formData: FormData,
) {
    const schoolData = {
        name: formData.get("name")?.toString(),
        address: formData.get("address")?.toString(),
        contact_person: formData.get("contact_person")?.toString(),
        email: formData.get("email")?.toString(),
        phone: formData.get("phone")?.toString(),
        relation: formData.get("relation")?.toString(),
    };

    await sql`UPDATE school SET name = ${schoolData.name}, address = ${schoolData.address}, contact_person = ${schoolData.contact_person}, email = ${schoolData.email}, phone = ${schoolData.phone}, relation = ${schoolData.relation} WHERE id = ${id}`;

    await sql`DELETE FROM admin WHERE school_id = ${id}`;

    for (const adminId of adminIds) {
        await sql`INSERT INTO admin (school_id, member_id) VALUES (${id}, ${adminId})`;
    }

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
        await sql`INSERT INTO report (school_id, date, content) VALUES (${schoolId}, ${date.toISOString()}, ${content}) RETURNING id`;

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
    await sql`UPDATE report SET date = ${date.toISOString()}, content = ${content} WHERE id = ${id}`;

    await sql`DELETE FROM participant WHERE report_id = ${id}`;

    for (const participantId of participantIds) {
        await sql`INSERT INTO participant (report_id, member_id) VALUES (${id}, ${participantId})`;
    }

    revalidatePath(`/schools/${schoolId}/reports`);
    redirect(`/schools/${schoolId}/reports`);
}
export async function createProtocol(
    participantIds: string[],
    date: Date,
    content: string,
) {
    const response =
        await sql`INSERT INTO protocol (date, content) VALUES (${date.toISOString()}, ${content}) RETURNING id`;

    for (const participantId of participantIds) {
        await sql`INSERT INTO protocol_participant (protocol_id, member_id) VALUES (${response.rows[0].id}, ${participantId})`;
    }

    revalidatePath(`/protocols`);
    redirect(`/protocols`);
}

export async function editProtocol(
    protocolId: string,
    participantIds: any,
    date: Date,
    content: string,
) {
    await sql`UPDATE protocol SET date = ${date.toISOString()}, content=  ${content} WHERE id = ${protocolId}`;

    await sql`DELETE FROM protocol_participant WHERE protocol_id = ${protocolId}`;

    for (const participantId of participantIds) {
        await sql`INSERT INTO protocol_participant (protocol_id, member_id) VALUES (${protocolId}, ${participantId})`;
    }

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

export async function toggleEmailSent(schoolId: string) {
    const response =
        await sql`SELECT email_sent FROM school WHERE id = ${schoolId}`;
    const emailSent = response.rows[0].email_sent;

    if (emailSent) {
        await sql`UPDATE school SET email_sent = FALSE WHERE id = ${schoolId}`;
    } else {
        await await sql`UPDATE school SET email_sent = TRUE WHERE id = ${schoolId}`;
    }

    revalidatePath("/schools");
}

export async function createMaterial({
    name,
    url,
}: {
    name: string;
    url: string;
}) {
    await sql`INSERT INTO material (name, url) VALUES ${name}, ${url}`;
    revalidatePath("/materials");
}

export async function deleteMaterial(id: string) {
    const response = await sql`SELECT url FROM material WHERE id = ${id}`;
    const url = response.rows[0].url;
    console.log("blob url", url);
    await del(url);
    await sql`DELETE FROM material WHERE id = ${id}`;
    revalidatePath("/materials");
}

export async function downloadMaterial(id: string): Promise<string> {
    const response = await sql`SELECT url FROM material WHERE id = ${id}`;
    const url = response.rows[0].url;
    return url;
    // TODO: Download file from Vercel blob
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
