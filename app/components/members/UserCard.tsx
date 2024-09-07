"use client";

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
import MemberDropdown from "./MemberDropdown";

export default function UserCard({ user }: { user: any }) {
    return (
        <Card p="md" withBorder shadow="sm" radius="md">
            <Group justify="space-between" gap="md">
                <Stack align="start" justify="center" gap="sm">
                    <Group>
                        <Title order={4}>{user.name}</Title>
                        <Badge
                            variant="dot"
                            color={user.is_speaker ? "yellow" : "blue"}>
                            {user.is_speaker ? "Speaker" : "Member"}
                        </Badge>
                    </Group>
                    <Text>{user.email}</Text>
                </Stack>

                <MemberDropdown user={user} />
            </Group>
        </Card>
    );
}
