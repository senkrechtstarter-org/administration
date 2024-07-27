"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const SchoolSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    last_visit: z.date(),
    contact_person: z.string(),
    email: z.string(),
    phone_number: z.string(),
    relation: z.enum(["Good", "Middle", "Bad"]),
});

const CreateSchool = SchoolSchema.omit({ id: true, last_visit: true });

export async function createSchool(formData: FormData) {
    const { name, address, contact_person, email, phone_number, relation } =
        CreateSchool.parse({
            name: formData.get("name"),
            address: formData.get("address"),
            contact_person: formData.get("contact_person"),
            email: formData.get("email"),
            phone_number: formData.get("phone_number"),
            relation: formData.get("relation"),
        });

    await sql`
    INSERT INTO schools (name, address, contact_person, email, phone_number, relation)
    VALUES (${name}, ${address}, ${contact_person}, ${email}, ${phone_number}, ${relation})
  `;
    revalidatePath("/schools");
    redirect("/schools");
}

export async function editSchool(id: string, formData: FormData) {
    const { name, address, contact_person, email, phone_number, relation } =
        CreateSchool.parse({
            name: formData.get("name"),
            address: formData.get("address"),
            contact_person: formData.get("contact_person"),
            email: formData.get("email"),
            phone_number: formData.get("phone_number"),
            relation: formData.get("relation"),
        });

    await sql`
    UPDATE schools
    SET name = ${name}, address = ${address}, contact_person  = ${contact_person}, email = ${email}, phone_number = ${phone_number}, relation = ${relation}
    WHERE id = ${id}`;
    revalidatePath("/schools");
    redirect("/schools");
}

export async function deleteSchool(id: string) {
    await sql`DELETE FROM schools WHERE id = ${id}`;
    revalidatePath("/schools");
}

const MemberSchema = z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
});

const CreateMember = MemberSchema.omit({ id: true });

export async function createMember(formData: FormData) {
    const { first_name, last_name, email, password } = CreateMember.parse({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${first_name}, ${last_name}, ${email}, ${password})
  `;
    revalidatePath("/members");
    redirect("/members");
}

export async function deleteMember(id: string) {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath("/members");
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
