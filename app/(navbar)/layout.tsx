import "@/app/components/global.css";
import NavigationBar from "../components/NavigationBar";
import { AppShell, AppShellHeader, AppShellMain } from "@mantine/core";

export default function NavbarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppShell header={{ height: 70 }}>
            <AppShellHeader>
                <NavigationBar />
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}
