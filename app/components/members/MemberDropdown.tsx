"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Menu } from "@mantine/core";
import { useRouter } from "next/navigation";
import { deleteUser, promoteUser, demoteUser } from "@/app/lib/actions";
import { useSession } from "next-auth/react";

export default function MemberDropdown({ user }: { user: any }) {
    const router = useRouter();
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
                    key="edit"
                    onClick={() => router.push(`/members/${user.id}/edit`)}>
                    Bearbeiten
                </Menu.Item>
                <Menu.Item
                    key="switch"
                    disabled={!session?.user?.isSpeaker}
                    color="orange"
                    onClick={() => {
                        user.is_speaker
                            ? demoteUser(user.id)
                            : promoteUser(user.id);
                    }}>
                    {user.is_speaker
                        ? "Zum Mitglied Zurückstufen"
                        : "Zum Sprecher Ernennen"}
                </Menu.Item>
                <Menu.Item
                    key="delete"
                    disabled={!session?.user?.isSpeaker}
                    color="red"
                    onClick={() => deleteUser(user.id)}>
                    Löschen
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
