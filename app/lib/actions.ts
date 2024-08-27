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

    await sql`UPDATE School SET name = ${schoolData.name}, address = ${schoolData.address}, contact_person = ${schoolData.contact_person}, email = ${schoolData.email}, phone = ${schoolData.phone}, relation = ${schoolData.relation} WHERE id = ${id}`;

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
    participantsData: any,
    formData: FormData,
) {
    const reportData = {
        schoolId: schoolId,
        date: new Date(formData.get("date") as string).toDateString(),
        content: formData.get("content")?.toString(),
    };

    const participants = Array.from(participantsData).map((id) => ({ id }));

    const response =
        await sql`INSERT INTO report (school_id, date, content) VALUES (${reportData.schoolId}, ${reportData.date}, ${reportData.content}) RETURNING id`;

    participants.forEach(async (participant: any) => {
        await sql`INSERT INTO participant (report_id, member_id) VALUES (${response.rows[0].id}, ${participant.id})`;
    });

    revalidatePath(`/schools/${schoolId}/reports`);
    redirect(`/schools/${schoolId}/reports`);
}

export async function editReport(
    id: string,
    schoolId: string,
    participants: any,
    formData: FormData,
) {
    const reportData = {
        schoolId: schoolId,
        date: new Date(formData.get("date") as string).toDateString(),
        content: formData.get("content")?.toString(),
        participants: participants,
    };

    await sql`UPDATE report SET date = ${reportData.date}, content = ${reportData.content} WHERE id = ${id}`;

    participants.forEach(async (participant: any) => {
        await sql`INSERT INTO participant (report_id, member_id) VALUES (${id}, ${participant.id})`;
    });

    // await prisma.report.update({
    //     where: { id },
    //     data: reportData as any,
    // });

    revalidatePath(`/schools/${schoolId}/reports`);
    redirect(`/schools/${schoolId}/reports`);
}

export async function deleteReport(id: string) {
    await sql`DELETE FROM report WHERE id = ${id}`;
    revalidatePath("/members");
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
