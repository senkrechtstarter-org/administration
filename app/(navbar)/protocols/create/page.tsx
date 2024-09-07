import { fetchUsers } from "@/app/lib/data";
import ProtocolForm from "@/app/components/protocols/ProtocolForm";
import { Container } from "@mantine/core";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const users = await fetchUsers();
    return (
        <Container p={"md"}>
            <ProtocolForm users={users} />
        </Container>
    );
}
