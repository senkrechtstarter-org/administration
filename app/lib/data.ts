import { sql } from "@vercel/postgres";

export async function fetchUsers() {
    try {
        const response = await sql`SELECT * FROM member`;
        return response.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch users.");
    }
}

export async function fetchSchools() {
    try {
        const response = await sql`SELECT * FROM school`;
        return response.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch schools.");
    }
}

export async function fetchSchool(id: string) {
    try {
        const response = await sql`SELECT * FROM school WHERE id = ${id}`;
        return response.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to find school.");
    }
}

export async function fetchAdmins(schoolId: string) {
    try {
        const response =
            await sql`SELECT * FROM admin JOIN member on admin.member_id = member.id WHERE admin.school_id = ${schoolId}`;
        return response.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch admins.");
    }
}

export async function fetchParticipants(reportId: string) {
    try {
        const response =
            await sql`SELECT * FROM participant JOIN member on participant.member_id = member.id WHERE report_id = ${reportId}`;
        return response.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch participants.");
    }
}

export async function fetchUser(id: string) {
    try {
        const response = await sql`SELECT * FROM member WHERE id = ${id}`;
        return response.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        const data = await sql`SELECT * FROM member WHERE email = ${email}`;
        console.log("data: ", data);
        return data.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch user by email.");
    }
}

export async function fetchReports(schoolId: string) {
    try {
        const response =
            await sql`SELECT * FROM report WHERE report.school_id = ${schoolId}`;
        return response.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch reports.");
    }
}

export async function fetchReport(id: string) {
    try {
        const response = await sql`SELECT * FROM report WHERE id = ${id}`;
        return response.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch report.");
    }
}
