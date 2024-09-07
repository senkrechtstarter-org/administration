"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProtocol } from "../../lib/actions";
import { ActionIcon, Menu } from "@mantine/core";

export default function ProtocolCardDropdown({
    protocolId,
}: {
    protocolId: any;
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
                        router.push(`protocols/${protocolId}/edit`);
                    }}>
                    Bearbeiten
                </Menu.Item>
                <Menu.Item
                    key="delete"
                    color="red"
                    onClick={() => deleteProtocol(protocolId)}>
                    Löschen
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
