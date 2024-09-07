"use client";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Card } from "@mantine/core";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    return (
        <Button
            onClick={() => {
                signIn("google", { callbackUrl: "/schools" });
            }}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            rightSection={
                <ArrowRightIcon
                    style={{
                        width: 20,
                        height: 20,
                    }}
                />
            }>
            Mit Google anmelden
        </Button>
    );
}
