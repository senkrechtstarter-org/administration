import React from "react";
import { fetchProtocols, fetchReports, fetchSchool } from "@/app/lib/data";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import ReportCard from "@/app/components/reports/ReportCard";

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
                    <Text>Keine Berichte vorhanden!</Text>
                )}
                {protocols.map((protocol) => (
                    <ProtocolCard key={protocol.id} protocol={protocol} />
                ))}
            </Stack>
        </Container>
    );
}
