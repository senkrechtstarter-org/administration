"use client";

import Link from "next/link";
import SchoolCardDropdown from "./SchoolCardDropdown";
import {
    Accordion,
    Badge,
    Button,
    Center,
    Container,
    Group,
    MultiSelect,
    Radio,
    rem,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import {
    AtSymbolIcon,
    HomeIcon,
    IdentificationIcon,
    PhoneIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function SchoolOverview({ schools }: { schools: any }) {
    const iconStyle = { width: rem(16), height: rem(16) };

    return (
        <Container p="md" mt="lg">
            <Group justify="space-between">
                <Title order={2}>Schulübersicht</Title>
                <Link href="/schools/create">
                    <Button>Neue Schule Hinzufügen</Button>
                </Link>
            </Group>

            <Stack gap="md" mt="md">
                {schools.length === 0 && <Text>Keine Schule gefunden!</Text>}
                <Accordion chevronPosition="left" variant="contained">
                    {schools.map((school: any) => (
                        <Accordion.Item key={school.id} value={school.id}>
                            <Center>
                                <Accordion.Control>
                                    <Group gap="md">
                                        <Text>{school.name}</Text>
                                        <Badge
                                            variant="dot"
                                            color={
                                                school.email_sent
                                                    ? "green"
                                                    : "yellow"
                                            }>
                                            {school.email_sent
                                                ? "Email: Versendet"
                                                : "Email: Nicht versendet"}
                                        </Badge>
                                    </Group>
                                </Accordion.Control>
                                <SchoolCardDropdown school={school} />
                            </Center>

                            <Accordion.Panel>
                                <Stack gap="sm" justify="space-between" p="lg">
                                    <TextInput
                                        label="Name der Schule"
                                        disabled
                                        value={school?.name}
                                        leftSection={
                                            <IdentificationIcon
                                                style={iconStyle}
                                            />
                                        }
                                        type="string"
                                    />

                                    {/* Address */}
                                    <TextInput
                                        disabled
                                        label="Adresse"
                                        value={school?.address}
                                        leftSection={
                                            <HomeIcon style={iconStyle} />
                                        }
                                        type="string"
                                    />

                                    {/* Contact Person */}
                                    <TextInput
                                        disabled
                                        label="Kontaktperson"
                                        value={school?.contact_person}
                                        leftSection={
                                            <UserCircleIcon style={iconStyle} />
                                        }
                                        type="string"
                                    />

                                    {/* Email */}
                                    <TextInput
                                        disabled
                                        label="E-Mail"
                                        value={school?.email}
                                        leftSection={
                                            <AtSymbolIcon style={iconStyle} />
                                        }
                                        type="email"
                                    />

                                    {/* Phone Number */}
                                    <TextInput
                                        disabled
                                        label="Telefonnummer"
                                        value={school?.phone}
                                        leftSection={
                                            <PhoneIcon style={iconStyle} />
                                        }
                                        type="tel"
                                    />

                                    <MultiSelect
                                        label="Zuständige"
                                        disabled
                                        value={school.admins.map(
                                            (admin: any) => admin.name,
                                        )}
                                    />
                                    {/* {users.map((user: any) => (
                                        <SelectItem key={user.id}>{user.name}</SelectItem>
                                    ))}
                                </MultiSelect> */}

                                    {/* School Relation */}
                                    <Radio.Group
                                        label="Verhältnis"
                                        value={school?.relation}
                                        name="relation">
                                        <Group>
                                            <Radio
                                                disabled
                                                value="GOOD"
                                                label="Gut"
                                                color="green"
                                            />
                                            <Radio
                                                disabled
                                                value="MIDDLE"
                                                label="Mittel"
                                                color="yellow"
                                            />
                                            <Radio
                                                disabled
                                                value="BAD"
                                                label="Schlecht"
                                                color="red"
                                            />
                                        </Group>
                                    </Radio.Group>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Stack>
        </Container>
    );
}
