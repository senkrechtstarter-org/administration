import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React from "react";
import { playfair_display } from "./fonts";
import Link from "next/link";

export default function SenkrechtstarterLogo() {
    return (
        <Link href="/home">
            <div className="flex w-full flex-row justify-between items-center leading-none text-black dark:text-white sm:mr-2 gap-1">
                <div
                    className={`${playfair_display.className} text-[28px] dark:color-black`}>
                    Senkrechtstarter Aachen
                </div>
            </div>
        </Link>
    );
}
