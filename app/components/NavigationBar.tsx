"use client";

import SenkrechtstarterLogo from "@/app/components/senkrechtstarter-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button, Group, UnstyledButton, Text } from "@mantine/core";
import Link from "next/link";

export default function NavigationBar() {
    return (
        <Group justify="space-between" p="md">
            <Group justify="space-between">
                <SenkrechtstarterLogo />
                <Group ml="xl" gap="md" align="baseline">
                    <Link
                        href="/home"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <UnstyledButton>Home</UnstyledButton>
                    </Link>
                    <Link
                        href="/schools"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <UnstyledButton>Schulen</UnstyledButton>
                    </Link>
                    <Link
                        href="/members"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <UnstyledButton>Mitglieder</UnstyledButton>
                    </Link>
                    <Link
                        href="/protocols"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <UnstyledButton>Protokolle</UnstyledButton>
                    </Link>
                    <Link
                        href="/materials"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <UnstyledButton>Materialien</UnstyledButton>
                    </Link>
                </Group>
            </Group>
            <Group>
                <ThemeSwitcher />
                <Button
                    variant="light"
                    onClick={() => {
                        signOut();
                    }}
                    rightSection={<PowerIcon />}>
                    <div>Ausloggen</div>
                </Button>
            </Group>
        </Group>
    );
}
