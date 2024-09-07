"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteReport } from "../../lib/actions";
import { ActionIcon, Button, Menu, Popover } from "@mantine/core";

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
        <Menu withArrow>
            <Menu.Target>
                <ActionIcon variant="subtle">
                    <EllipsisVerticalIcon />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    key="edit"
                    onClick={() => {
                        router.push(
                            `/schools/${schoolId}/reports/${reportId}/edit`,
                        );
                    }}>
                    Bearbeiten
                </Menu.Item>
                <Menu.Item
                    key="delete"
                    color="red"
                    onClick={() => deleteReport(reportId)}>
                    Löschen
                    {/* <DeleteSchoolButton id={school.id} /> */}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
