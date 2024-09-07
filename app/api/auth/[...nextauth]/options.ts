import { fetchUserByEmail, isSpeaker } from "@/app/lib/data";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },

    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    // Add session management configuration if missing
    session: {
        strategy: "jwt", // or 'database' if you are handling sessions through the database
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                return !!(await fetchUserByEmail(user.email as string));
            } catch (error) {
                console.error("Database Error:", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            const speaker = await isSpeaker(token.email as string);

            // Ignore typescript error

            session.user.isSpeaker = speaker;

            return session;
        },
    },
};

export default authOptions;

import { DefaultSession } from "next-auth";

// Extend the default Session interface to include isSpeaker
declare module "next-auth" {
    interface Session {
        user: {
            isSpeaker?: boolean; // Custom property you are adding
        } & DefaultSession["user"]; // Include default properties from DefaultSession's user
    }

    // Optionally extend the User type if needed
    interface User {
        isSpeaker?: boolean;
    }
}
