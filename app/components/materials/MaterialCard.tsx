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
import MaterialDropdown from "./MaterialDropdown";

export default function MaterialCard({ material }: { material: any }) {
    return (
        <Card p="md" withBorder shadow="sm" radius="md">
            <Group justify="space-between" gap="md">
                <Stack align="start" justify="center" gap="sm">
                    <Group>
                        <Title order={4}>{material.name}</Title>
                    </Group>
                </Stack>

                <MaterialDropdown material={material} />
            </Group>
        </Card>
    );
}
