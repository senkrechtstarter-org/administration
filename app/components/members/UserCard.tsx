"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteUser, promoteUser, demoteUser } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import {
    ActionIcon,
    Badge,
    Card,
    Chip,
    Group,
    Menu,
    Pill,
    Stack,
    Text,
    Title,
} from "@mantine/core";

export default function UserCard({ user }: { user: any }) {
    const router = useRouter();
    const { data: session } = useSession();
    console.log("User session: ", session);
    console.log("User data: ", user);
    return (
        <Card p="md">
            <Group justify="space-between" gap="md">
                <Stack align="start" justify="center" gap="sm">
                    <Group>
                        <Title order={4}>{user.name}</Title>
                        <Badge
                            variant="dot"
                            color={user.is_speaker ? "yellow" : "gray"}>
                            {user.is_speaker ? "Speaker" : "Member"}
                        </Badge>
                    </Group>
                    <Text>{user.email}</Text>
                </Stack>

                <Menu withArrow>
                    <Menu.Target>
                        <ActionIcon variant="light">
                            <EllipsisVerticalIcon />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            key="edit"
                            onClick={() =>
                                router.push(`/members/${user.id}/edit`)
                            }>
                            Bearbeiten
                        </Menu.Item>
                        <Menu.Item
                            key="switch"
                            disabled={!session?.user?.isSpeaker}
                            color="warning"
                            onClick={() => {
                                user.is_speaker
                                    ? demoteUser(user.id)
                                    : promoteUser(user.id);
                            }}>
                            {user.is_speaker
                                ? "Zum Sprecher Ernennen"
                                : "Zum Mitglied Zurückstufen"}
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
            </Group>
        </Card>
    );
}
