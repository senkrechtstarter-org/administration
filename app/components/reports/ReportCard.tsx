import { Avatar, Badge, Card, Chip, Group, Stack, Title } from "@mantine/core";
import ReportCardDropdown from "./ReportCardDropdown";
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

    const formattedDate = `${day}/${month}/${year}`;

    const participants = await fetchParticipants(report.id);

    return (
        <Card p="lg" shadow="sm" radius="md" withBorder>
            <Group justify="space-between">
                <Title order={4}>{formattedDate}</Title>

                <ReportCardDropdown reportId={report.id} schoolId={schoolId} />
            </Group>

            <Stack gap="sm" justify="space-between">
                <div dangerouslySetInnerHTML={{ __html: report.content }}></div>
            </Stack>

            <Group gap="sm">
                {participants.map((participant: any) => (
                    <Badge key={participant.member_id}>
                        {participant.name}
                    </Badge>
                ))}
            </Group>
        </Card>
    );
}
