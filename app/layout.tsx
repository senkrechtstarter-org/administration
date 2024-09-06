import "@/app/components/global.css";

import { inter } from "./components/fonts";
import SessionWrapper from "./components/SessionWrapper";

import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

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
                <ColorSchemeScript />
            </head>
            <body
                className={`${inter.className} antialiased max-w-screen-2xl mx-auto`}>
                <SessionWrapper session={session}>
                    <MantineProvider defaultColorScheme={"dark"}>
                        {children}
                    </MantineProvider>
                </SessionWrapper>
            </body>
        </html>
    );
}
