import "@/app/components/global.css";

import { inter } from "./components/fonts";
import SessionWrapper from "./components/SessionWrapper";
import { Providers } from "./providers";

// export const experimental_ppr = true;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>Senkrechtstarter Aachen</title>
            </head>
            <body
                className={`${inter.className} antialiased max-w-screen-2xl mx-auto`}>
                <SessionWrapper>
                    <Providers>
                        <main>{children}</main>
                    </Providers>
                </SessionWrapper>
            </body>
        </html>
    );
}
