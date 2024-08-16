import prisma from "@/app/lib/client";
import { sql } from "@vercel/postgres";

export async function fetchUsers() {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch users.");
    }
}

export async function fetchSchools() {
    try {
        return await prisma.school.findMany({
            include: { users: true },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch schools.");
    }
}

export async function fetchSchool(id: string) {
    try {
        return await prisma.school.findUnique({
            where: { id },
            include: { users: true },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to find school.");
    }
}

export async function fetchUser(id: string) {
    try {
        return await prisma.user.findUnique({
            where: { id },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function fetchUserByEmail(email: string) {
    // try {
    //     const data = await sql`SELECT * FROM User WHERE email = ${email}`;
    //     return data.rows[0];
    // } catch (error) {
    //     console.error("Database Error:", error);
    //     throw new Error("Failed to fetch users.");
    // }
    try {
        return await prisma.user.findUnique({
            where: { email },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function fetchReports(schoolId: string) {
    try {
        return await prisma.report.findMany({
            where: { schoolId },
            include: { participants: true },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function fetchReport(id: string) {
    try {
        return await prisma.report.findUnique({
            where: { id },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch report.");
    }
}
