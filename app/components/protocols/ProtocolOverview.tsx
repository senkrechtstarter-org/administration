import React from "react";
import { fetchProtocols } from "@/app/lib/data";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import ReportCard from "@/app/components/reports/ReportCard";
import ProtocolCard from "./ProtocolCard";

export default async function ProtocolOverview() {
    const protocols = await fetchProtocols();

    return (
        <Container p="md" mt="lg">
            <Group justify={"space-between"} align={"center"}>
                <Title order={2}>Protokollübersicht</Title>
                <Link href={`/protocols/create`}>
                    <Button>Neues Protokoll Hinzufügen</Button>
                </Link>
            </Group>

            <Stack justify="space-between" gap={"md"} mt="md">
                {protocols.length === 0 && (
                    <Text>Keine Protokolle vorhanden!</Text>
                )}
                {protocols
                    .sort(
                        (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime(),
                    )
                    .map((protocol) => (
                        <ProtocolCard key={protocol.id} protocol={protocol} />
                    ))}
            </Stack>
        </Container>
    );
}
