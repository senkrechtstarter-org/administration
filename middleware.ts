import { withAuth } from "next-auth/middleware";
import { fetchUserByEmail } from "./app/lib/data";

export default withAuth({
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: async ({ token, req }) => {
            console.log("Token:", token);
            console.log("Request:", req);
            try {
                const user = await fetchUserByEmail(token?.email!);
                console.log("User:", user);
                return !!user;
            } catch (error) {
                console.error("Database Error:", error);
                return false;
            }
        },
    },
});

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
