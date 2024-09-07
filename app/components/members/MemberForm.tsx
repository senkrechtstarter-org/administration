import Link from "next/link";
import {
    UserCircleIcon,
    AtSymbolIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    Container,
    Group,
    rem,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { createUser, editUser } from "@/app/lib/actions";

export default function MemberForm({ member }: { member?: any }) {
    const iconStyle = { width: rem(16), height: rem(16) };

    return (
        <form action={!!member ? editUser.bind(null, member.id) : createUser}>
            <Container p="xl">
                <Title order={3}>Neues Mitglied Einladen</Title>

                <Stack gap="md" mt="md">
                    <TextInput
                        label="Name"
                        required
                        id="name"
                        name="name"
                        type="string"
                        step="0.01"
                        placeholder="Konrad Adenauer"
                        defaultValue={member?.name}
                        leftSection={<UserCircleIcon style={iconStyle} />}
                    />

                    <TextInput
                        label="E-Mail"
                        required
                        id="email"
                        name="email"
                        type="string"
                        step="0.01"
                        placeholder="konrad.adenauer@gmail.com"
                        defaultValue={member?.email}
                        leftSection={<AtSymbolIcon style={iconStyle} />}
                    />

                    <Group justify="end">
                        <Link href="/members">
                            <Button variant="subtle">Abbrechen</Button>
                        </Link>
                        <Button type="submit">
                            {!!member ? "Speichern" : "Erstellen"}
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </form>
    );
}
