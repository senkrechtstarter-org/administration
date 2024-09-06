"use client";

import Link from "next/link";
import SchoolCardDropdown from "../SchoolCardDropdown";
import {
    Accordion,
    Avatar,
    Button,
    Center,
    Chip,
    Container,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";

export default function SchoolOverview({ schools }: { schools: any }) {
    return (
        <Container p="md" mt="lg">
            <Group justify="space-between">
                <Title order={2}>Schulübersicht</Title>
                <Link href="/schools/create">
                    <Button>Neue Schule Hinzufügen</Button>
                </Link>
            </Group>

            <Stack gap="md" mt="md">
                {schools.length === 0 && <Text>Keine Schule gefunden!</Text>}
                <Accordion chevronPosition="left">
                    {schools.map((school: any) => (
                        <Accordion.Item key={school.id} value={school.id}>
                            <Center>
                                <Accordion.Control>
                                    <Group gap="md">
                                        <Text>{school.name}</Text>
                                        <Chip
                                            color={
                                                school.email_sent
                                                    ? "success"
                                                    : "danger"
                                            }>
                                            {school.email_sent
                                                ? "Versendet"
                                                : "Unversendet"}
                                        </Chip>
                                    </Group>
                                </Accordion.Control>
                                <SchoolCardDropdown school={school} />
                            </Center>

                            <Accordion.Panel>
                                <Stack gap="sm" justify="space-between" p="lg">
                                    <div>E-Mail: {school.email}</div>
                                    <div>Addresse: {school.address}</div>
                                    <div>
                                        Kontaktperson: {school.contact_person}
                                    </div>
                                    <div>Telefon: {school.phone}</div>
                                    <div>
                                        Verhältnis:{" "}
                                        {school.relation == "MIDDLE"
                                            ? "Mittel"
                                            : school.relation == "BAD"
                                            ? "Schlecht"
                                            : "Gut"}
                                    </div>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Stack>
        </Container>
    );
}
