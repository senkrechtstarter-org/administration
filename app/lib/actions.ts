"use server";

import prisma from "@/app/lib/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
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

export async function createSchool(formData: FormData) {
    console.log("Formdata: ", formData);
    const schoolData = CreateSchool.parse({
        name: formData.get("name"),
        address: formData.get("address"),
        contact_person: formData.get("contact_person"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        relation: formData.get("relation"),
    });

    await prisma.school.create({
        data: schoolData as any,
    });

    revalidatePath("/schools");
    redirect("/schools");
}

export async function editSchool(id: string, formData: FormData) {
    const schoolData = CreateSchool.parse({
        name: formData.get("name"),
        address: formData.get("address"),
        contact_person: formData.get("contact_person"),
        email: formData.get("email"),
        phone_number: formData.get("phone_number"),
        relation: formData.get("relation"),
    });

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
    await prisma.user.delete({
        where: { id },
    });
    revalidatePath("/members");
}

export async function createReport(formData: FormData) {
    const reportData = {
        school_id: formData.get("school_id"),
        user_id: formData.get("user_id"),
        date: formData.get("date"),
        content: formData.get("content"),
    };

    await prisma.report.create({
        data: reportData as any,
    });

    revalidatePath("/reports");
    redirect("/reports");
}

export async function editReport(id: string, formData: FormData) {
    const reportData = {
        school_id: formData.get("school_id"),
        user_id: formData.get("user_id"),
        date: formData.get("date"),
        content: formData.get("content"),
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
