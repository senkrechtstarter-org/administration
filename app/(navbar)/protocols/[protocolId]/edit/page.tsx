import { fetchParticipants, fetchProtocol, fetchUsers } from "@/app/lib/data";
import ProtocolForm from "@/app/components/protocols/ProtocolForm";
import { Container } from "@mantine/core";

export default async function Page({
    params,
}: {
    params: { schoolId: string; protocolId: string };
}) {
    console.log("protocol id: ", params.protocolId);

    const [protocol, users, participants] = await Promise.all([
        fetchProtocol(params.protocolId),
        fetchUsers(),
        fetchParticipants(params.protocolId),
    ]);

    console.log("Participants: ", participants);
    console.log("Users: ", users);

    return (
        <Container p={"md"}>
            <ProtocolForm
                protocol={protocol}
                users={users}
                participants={participants}
            />
        </Container>
    );
}
