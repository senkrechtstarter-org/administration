import Link from "next/link";
import { fetchUsers } from "../../lib/data";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import UserCard from "@/app/components/members/UserCard";

export default async function Page() {
    const users = await fetchUsers();

    return (
        <Container p="md" mt="lg">
            <Group justify="space-between">
                <Title order={2}>Mitgliederübersicht</Title>
                <Link href="/members/create">
                    <Button>Neues Mitglied Hinzufügen</Button>
                </Link>
            </Group>
            <Stack gap="md" mt="md">
                {users.length === 0 && <Text>No users found</Text>}
                {users.sort().map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </Stack>
        </Container>
    );
}
