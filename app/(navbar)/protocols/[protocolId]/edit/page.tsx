import {
    fetchParticipants,
    fetchProtocol,
    fetchProtocolParticipants,
    fetchUsers,
} from "@/app/lib/data";
import ProtocolForm from "@/app/components/protocols/ProtocolForm";
import { Container } from "@mantine/core";

export default async function Page({
    params,
}: {
    params: { schoolId: string; protocolId: string };
}) {
    const [protocol, users, participants] = await Promise.all([
        fetchProtocol(params.protocolId),
        fetchUsers(),
        fetchProtocolParticipants(params.protocolId),
    ]);

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
