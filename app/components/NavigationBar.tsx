"use client";

import SenkrechtstarterLogo from "@/app/components/senkrechtstarter-logo";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Link,
} from "@nextui-org/react";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavigationBar() {
    return (
        <Navbar isBordered maxWidth="full">
            <NavbarBrand>
                <SenkrechtstarterLogo />
            </NavbarBrand>
            <NavbarContent justify="start">
                <NavbarItem>
                    <Link href="/home">Info</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/schools">Schulen</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/members">Mitglieder</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/materials">Materialien</Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    <Button
                        variant="light"
                        onClick={() => {
                            signOut();
                        }}
                        startContent={<PowerIcon className="w-5" />}>
                        <div className="hidden md:block">Ausloggen</div>
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
