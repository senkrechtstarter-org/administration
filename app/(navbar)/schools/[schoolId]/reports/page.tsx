import React from "react";
import { fetchReports, fetchSchool } from "@/app/lib/data";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import ReportCard from "@/app/components/reports/ReportCard";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const schoolId = params.schoolId;
    const school = await fetchSchool(params.schoolId);
    const reports = await fetchReports(schoolId);

    return (
        <Container p="md" mt="lg">
            <Group justify={"space-between"} align={"center"}>
                <Title order={3}>Berichte für {school?.name}</Title>
                <Link href={`/schools/${schoolId}/reports/create`}>
                    <Button>Neuen Bericht Hinzufügen</Button>
                </Link>
            </Group>

            <Stack justify="space-between" gap={"md"} mt="md">
                {reports.length === 0 && <Text>Keine Berichte vorhanden!</Text>}
                {reports.map((report) => (
                    <ReportCard
                        key={report.id}
                        report={report}
                        schoolId={schoolId}
                    />
                ))}
            </Stack>
        </Container>
    );
}
