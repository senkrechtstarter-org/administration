"use server";

import prisma from "@/app/lib/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
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

export async function createSchool(admins: any, formData: FormData) {
    console.log(
        "Admins: ",
        Array.from(admins).map((id) => ({ id })),
    );
    const adminsArray = Array.from(admins).map((id) => ({ id }));
    console.log("Formdata: ", formData);
    const schoolData = CreateSchool.parse({
        name: formData.get("name"),
        address: formData.get("address"),
        contact_person: formData.get("contact_person"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        relation: formData.get("relation"),
        users: {
            connect: adminsArray,
        },
    });

    console.log("School data: ", schoolData);

    await prisma.school.create({
        data: schoolData as any,
    });

    revalidatePath("/schools");
    redirect("/schools");
}

export async function editSchool(id: string, admins: any, formData: FormData) {
    console.log(
        "Admins: ",
        Array.from(admins).map((id) => ({ id })),
    );
    const adminsArray = Array.from(admins).map((id) => ({ id }));
    const schoolData = CreateSchool.parse({
        name: formData.get("name"),
        address: formData.get("address"),
        contact_person: formData.get("contact_person"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        relation: formData.get("relation"),
        users: {
            connect: adminsArray,
        },
    });

    console.log("School data: ", schoolData);

    await prisma.school.update({
        where: { id },
        data: schoolData as any,
    });

    revalidatePath("/schools");
    redirect("/schools");
}

export async function deleteSchool(id: string) {
    await prisma.school.delete({
        where: { id },
    });
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

    await prisma.user.create({
        data: userData,
    });

    revalidatePath("/members");
    redirect("/members");
}

export async function editUser(id: string, formData: FormData) {
    const userData = CreateUser.parse({
        name: formData.get("name"),
        email: formData.get("email"),
    });

    await prisma.user.update({
        where: { id },
        data: userData,
    });

    revalidatePath("/members");
    redirect("/members");
}

export async function deleteUser(id: string) {
    console.log("Deleting user with id: ", id);
    const repsonse = await prisma.user.delete({
        where: { id },
    });
    console.log("Response: ", repsonse);
    revalidatePath("/members");
}

export async function createReport(
    schoolId: string,
    participants: any,
    formData: FormData,
) {
    const reportData = {
        schoolId: schoolId,
        date: new Date(formData.get("date") as string),
        content: formData.get("content"),
        participants: {
            connect: Array.from(participants).map((id) => ({
                id,
            })),
        },
    };

    console.log("Report data: ", reportData);

    await prisma.report.create({
        data: reportData as any,
    });

    revalidatePath(`/schools/${schoolId}`);
    redirect(`/schools/${schoolId}`);
}

export async function editReport(
    id: string,
    schoolId: string,
    participants: any,
    formData: FormData,
) {
    const reportData = {
        school_id: schoolId,
        date: formData.get("date"),
        content: formData.get("content"),
        participants: participants,
    };

    await prisma.report.update({
        where: { id },
        data: reportData as any,
    });

    revalidatePath("/reports");
    redirect("/reports");
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
