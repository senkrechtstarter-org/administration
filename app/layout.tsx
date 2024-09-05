import "@/app/components/global.css";

import { inter } from "./components/fonts";
import SessionWrapper from "./components/SessionWrapper";
import { Providers } from "./providers";
import { getSession, SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

// export const experimental_ppr = true;

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <head>
                <title>Senkrechtstarter Aachen</title>
            </head>
            <body
                className={`${inter.className} antialiased max-w-screen-2xl mx-auto`}>
                <SessionWrapper session={session}>
                    <Providers>
                        <main>{children}</main>
                    </Providers>
                </SessionWrapper>
            </body>
        </html>
    );
}
