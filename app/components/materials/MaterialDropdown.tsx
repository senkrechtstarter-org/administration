"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Menu } from "@mantine/core";
import { useSession } from "next-auth/react";
import { deleteMaterial, downloadMaterial } from "@/app/lib/actions";
import { Manuale } from "next/font/google";

export default function MemberDropdown({ material }: { material: any }) {
    const { data: session } = useSession();
    return (
        <Menu withArrow position="right-start" offset={5}>
            <Menu.Target>
                <ActionIcon variant="transparent">
                    <EllipsisVerticalIcon />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    key="download"
                    onClick={async () => {
                        const downloadUrl = await downloadMaterial(material.id);
                        window.open(downloadUrl);
                    }}>
                    Herunterladen
                </Menu.Item>
                <Menu.Item
                    key="delete"
                    disabled={!session?.user?.isSpeaker}
                    color="red"
                    onClick={() => deleteMaterial(material.id)}>
                    Löschen
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
