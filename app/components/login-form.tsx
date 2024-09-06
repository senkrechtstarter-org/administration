"use client";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Card } from "@mantine/core";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    return (
        <Card>
            <Button
                onClick={() => {
                    signIn("google", { callbackUrl: "/schools" });
                }}
                rightSection={<ArrowRightIcon />}>
                Weiter mit Google
            </Button>
        </Card>
    );
}
