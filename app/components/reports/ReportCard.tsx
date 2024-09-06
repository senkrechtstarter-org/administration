import { Avatar, Card, Chip, Group, Stack, Title } from "@mantine/core";
import ReportCardDropdown from "../ReportCardDropdown";
import { fetchParticipants } from "@/app/lib/data";

export default async function ReportCard({
    report,
    schoolId,
}: {
    report: any;
    schoolId: string;
}) {
    const date = report.date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const participants = await fetchParticipants(report.id);
    return (
        <Card p="sm">
            <Card.Section>
                <Group justify="space-between">
                    <Title order={4}>{formattedDate}</Title>

                    <ReportCardDropdown
                        reportId={report.id}
                        schoolId={schoolId}
                    />
                </Group>
            </Card.Section>
            <Card.Section p="sm">
                <Stack gap="sm" justify="space-between">
                    <p>{report.content}</p>
                </Stack>
            </Card.Section>
            <Card.Section>
                <Group gap="sm">
                    {participants.map((participant: any) => (
                        <Chip
                            key={participant.id}
                            variant="flat"
                            icon={<Avatar name={participant.name.charAt(0)} />}>
                            {participant.name}
                        </Chip>
                    ))}
                </Group>
            </Card.Section>
        </Card>
    );
}
