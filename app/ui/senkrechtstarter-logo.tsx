import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React from "react";
import { playfair_display } from "./fonts";

export default function SenkrechtstarterLogo() {
    return (
        <div
            className={`flex w-full flex-row justify-between items-center leading-none text-white sm:mr-2`}>
            <p className={`${playfair_display.className} text-[28px]`}>
                Senkrechtstarter Aachen
            </p>
            <PaperAirplaneIcon className="h-8 w-8 rotate-[-90deg]" />
        </div>
    );
}
