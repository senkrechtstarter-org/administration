"use client";

import SenkrechtstarterLogo from "@/app/components/senkrechtstarter-logo";
import LoginForm from "@/app/components/login-form";
import { Card, CardHeader, CardFooter, Divider } from "@nextui-org/react";
export default function LoginPage() {
    return (
        <div className="flex items-center max-w-140 m-auto mt-auto justify-center h-[100vh]">
            <Card className="bg-gradient-to-l from-cyan-400 to-blue-500">
                <CardHeader className="h-20 items-end rounded-lg p-5">
                    <SenkrechtstarterLogo />
                </CardHeader>
                {/* <Divider /> */}
                <CardFooter className="justify-end items-center">
                    <LoginForm />
                </CardFooter>
            </Card>
        </div>
    );
}
