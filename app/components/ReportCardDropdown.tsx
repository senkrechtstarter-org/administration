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
import { useState } from "react";
import { deleteReport } from "../lib/actions";

export default function ReportCardDropdown({
    reportId,
    schoolId,
}: {
    reportId: any;
    schoolId: string;
}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dropdown showArrow>
            <DropdownTrigger>
                <Button isIconOnly variant="light">
                    <EllipsisVerticalIcon className="w-6" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                onAction={(key) => {
                    if (key === "edit") {
                        router.push(
                            `/schools/${schoolId}/reports/${reportId}/edit`,
                        );
                    }
                }}
                aria-label="Static Actions">
                <DropdownItem key="edit">Edit</DropdownItem>

                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={() => deleteReport(reportId)}>
                    Delete
                    {/* <DeleteSchoolButton id={school.id} /> */}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
