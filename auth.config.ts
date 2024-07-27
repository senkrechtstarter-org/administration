import NextAuth, { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            return !!auth?.user;
        },
    },

    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
