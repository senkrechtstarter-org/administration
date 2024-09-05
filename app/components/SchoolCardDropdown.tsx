"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { deleteSchool, markEmailSent, markEmailUnsent } from "../lib/actions";
import { useSession } from "next-auth/react";

export default function SchoolCardDropdown({ school }: { school: any }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log("school: ", school);
    return (
        <Dropdown showArrow>
            <DropdownTrigger>
                <EllipsisVerticalIcon className="w-6" />
            </DropdownTrigger>
            <DropdownMenu
                onAction={(key) => {
                    if (key === "reports") {
                        router.push(`/schools/${school.id}/reports`);
                    } else if (key === "edit") {
                        router.push(`/schools/${school.id}/edit`);
                    }
                }}
                aria-label="Static Actions"
                disabledKeys={session?.user?.isSpeaker ? [] : ["delete"]}>
                <DropdownItem key="reports">Berichte Ansehen</DropdownItem>
                <DropdownItem key="edit">Bearbeiten</DropdownItem>
                <DropdownItem
                    key="email-sent"
                    onClick={() => {
                        school.email_sent
                            ? markEmailSent(school.id)
                            : markEmailUnsent(school.id);
                    }}>
                    {school.email_sent
                        ? "Als unversendet Markieren"
                        : "Als versendet Markieren"}
                </DropdownItem>
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={() => deleteSchool(school.id)}>
                    Löschen
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
