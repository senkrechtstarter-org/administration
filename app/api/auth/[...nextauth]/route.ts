import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/client";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },

    // adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    // Add session management configuration if missing
    // session: {
    //     strategy: "jwt", // or 'database' if you are handling sessions through the database
    // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
