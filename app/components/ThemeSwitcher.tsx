// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import React from "react";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <Button
            isIconOnly
            variant="light"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? (
                <MoonIcon className="w-5" />
            ) : (
                <SunIcon className="w-5" />
            )}
        </Button>
    );
}
