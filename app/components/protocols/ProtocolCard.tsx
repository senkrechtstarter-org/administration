import { Avatar, Badge, Card, Chip, Group, Stack, Title } from "@mantine/core";
// import protocolCardDropdown from "../protocolCardDropdown";
import { fetchParticipants } from "@/app/lib/data";
import ProtocolCardDropdown from "./ProtocolCardDropdown";

export default async function ProtocolCard({ protocol }: { protocol: any }) {
    const date = protocol.date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;

    const participants = await fetchParticipants(protocol.id);

    console.log("Participants: ", participants);
    return (
        <Card p="lg">
            <Group justify="space-between">
                <Title order={4}>{formattedDate}</Title>

                <ProtocolCardDropdown protocolId={protocol.id} />
            </Group>

            <Stack gap="sm" justify="space-between">
                <div
                    dangerouslySetInnerHTML={{
                        __html: protocol.content,
                    }}></div>
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
