"use client";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    return (
        <div>
            <div className="flex-1 rounded-lg">
                <Button
                    className="before:bg-white/10 backdrop-blur-md"
                    variant="flat"
                    onClick={() => {
                        signIn("google", { callbackUrl: "/schools" });
                    }}
                    endContent={<ArrowRightIcon className="w-6 " />}>
                    Log dich mit Google ein!
                </Button>
            </div>
        </div>
    );
}
