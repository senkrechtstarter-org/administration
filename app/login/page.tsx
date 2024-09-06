"use client";

import SenkrechtstarterLogo from "@/app/components/senkrechtstarter-logo";
import LoginForm from "@/app/components/login-form";
import { Card } from "@mantine/core";
export default function LoginPage() {
    return (
        // <div className="flex items-center max-w-140 m-auto mt-auto justify-center h-[100vh] bg-black">
        <div>
            {/* <Card className="bg-gradient-to-l from-cyan-400 to-blue-500"> */}
            <Card>
                <Card.Section>
                    <SenkrechtstarterLogo />
                </Card.Section>
                {/* <Divider /> */}
                <Card.Section>
                    <LoginForm />
                </Card.Section>
            </Card>
        </div>
    );
}
