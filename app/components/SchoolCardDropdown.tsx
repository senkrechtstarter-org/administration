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
import { deleteSchool } from "../lib/actions";

export default function SchoolCardDropdown({ school }: { school: any }) {
    const router = useRouter();
    return (
        <Dropdown showArrow>
            <DropdownTrigger>
                <Button isIconOnly variant="light">
                    <EllipsisVerticalIcon className="w-6" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                onAction={(key) => {
                    if (key === "reports") {
                        router.push(`/schools/${school.id}/reports`);
                    } else if (key === "edit") {
                        router.push(`/schools/${school.id}/edit`);
                    }
                }}
                aria-label="Static Actions">
                <DropdownItem key="reports">Berichte Ansehen</DropdownItem>

                <DropdownItem key="edit">Bearbeiten</DropdownItem>

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
