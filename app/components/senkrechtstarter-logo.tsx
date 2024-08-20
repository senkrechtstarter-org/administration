import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React from "react";
import { playfair_display } from "./fonts";
import Link from "next/link";

export default function SenkrechtstarterLogo() {
    return (
        <Link href="/home">
            <div
                className={`${playfair_display.className} text-[28px] dark:color-black w-full mt-[-20px]`}>
                Senkrechtstarter Aachen
            </div>
        </Link>
    );
}
