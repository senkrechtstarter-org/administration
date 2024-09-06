// app/components/ThemeSwitcher.tsx
"use client";

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Button, useMantineColorScheme } from "@mantine/core";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <ActionIcon
            variant="subtle"
            onClick={() => {
                toggleColorScheme();
            }}>
            {colorScheme === "dark" ? <SunIcon /> : <MoonIcon />}
        </ActionIcon>
    );
}
