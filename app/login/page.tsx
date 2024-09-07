"use client";

import SenkrechtstarterLogo from "@/app/components/senkrechtstarter-logo";
import LoginForm from "@/app/components/login-form";
import { Card, Center, Container, Flex, Group, Stack } from "@mantine/core";
export default function LoginPage() {
    return (
        <Center h={700}>
            <Card shadow="sm" radius="md" withBorder>
                <Stack p="lg">
                    <SenkrechtstarterLogo />
                    <LoginForm />
                </Stack>
            </Card>
        </Center>
    );
}
