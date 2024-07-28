import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { fetchMember } from "./app/lib/data";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut, handlers } = NextAuth({
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            return !!auth?.user;
        },
    },
    providers: [
        // Credentials({
        //     async authorize(credentials) {
        //         const parsedCredentials = z
        //             .object({
        //                 email: z.string().email(),
        //                 password: z.string().min(6),
        //             })
        //             .safeParse(credentials);

        //         if (parsedCredentials.success) {
        //             const { email, password } = parsedCredentials.data;
        //             const user = await fetchMember(email);
        //             if (!user) return null;
        //             const passwordsMatch = await bcrypt.compare(
        //                 password,
        //                 user.password,
        //             );

        //             if (passwordsMatch) return user;
        //         }
        //         console.log("Invalid credentials");
        //         return null;
        //     },
        // }),
        Google,
    ],
});
