"use client";

import Link from "next/link";
import {
    IdentificationIcon,
    HomeIcon,
    UserCircleIcon,
    AtSymbolIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { createSchool, editSchool } from "@/app/lib/actions";
import { useState } from "react";
import {
    Button,
    Card,
    Container,
    Group,
    MultiSelect,
    Radio,
    rem,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";

export default function SchoolForm({
    users,
    school,
    admins: adminsData,
}: {
    users?: any;
    school?: any;
    admins?: any;
}) {
    const [admins, setAdmins] = useState<any>([]);

    const iconStyle = { width: rem(16), height: rem(16) };

    return (
        <form
            action={(formData) =>
                !!school
                    ? editSchool(school.id, admins, formData)
                    : createSchool(admins, formData)
            }>
            <Container p="xl">
                <Stack gap="md">
                    <Title order={3}>
                        {!!school
                            ? `Bearbeite ${school.name}`
                            : "Neue Schule Erstellen"}
                    </Title>
                    {/* School Name */}
                    <TextInput
                        required
                        label="Name der Schule"
                        name="name"
                        placeholder="Enter school name"
                        defaultValue={school?.name}
                        leftSection={<IdentificationIcon style={iconStyle} />}
                        type="string"
                    />

                    {/* Address */}
                    <TextInput
                        required
                        label="Adresse"
                        name="address"
                        placeholder="Enter address"
                        defaultValue={school?.address}
                        leftSection={<HomeIcon style={iconStyle} />}
                        type="string"
                    />

                    {/* Contact Person */}
                    <TextInput
                        required
                        label="Kontaktperson"
                        name="contact_person"
                        placeholder="Enter contact person"
                        defaultValue={school?.contact_person}
                        leftSection={<UserCircleIcon style={iconStyle} />}
                        type="string"
                    />

                    {/* Email */}
                    <TextInput
                        required
                        label="E-Mail"
                        name="email"
                        placeholder="Enter email"
                        defaultValue={school?.email}
                        leftSection={<AtSymbolIcon style={iconStyle} />}
                        type="email"
                    />

                    {/* Phone Number */}
                    <TextInput
                        required
                        label="Telefonnummer"
                        name="phone"
                        placeholder="Enter phone number"
                        defaultValue={school?.phone}
                        leftSection={<PhoneIcon style={iconStyle} />}
                        type="tel"
                    />

                    <MultiSelect
                        label="Zuständige"
                        data={users.map((user: any) => user.name)}
                        value={admins}
                        onChange={setAdmins}
                        placeholder="Konrad Adenauer"
                    />
                    {/* {users.map((user: any) => (
                            <SelectItem key={user.id}>{user.name}</SelectItem>
                        ))}
                    </MultiSelect> */}

                    {/* School Relation */}
                    <Radio.Group
                        label="Verhältnis"
                        defaultValue={school?.relation}
                        name="relation">
                        <Group>
                            <Radio value="GOOD" label="Gut" color="green" />
                            <Radio
                                value="MIDDLE"
                                label="Mittel"
                                color="yellow"
                            />
                            <Radio value="BAD" label="Schlecht" color="red" />
                        </Group>
                    </Radio.Group>
                </Stack>

                <Group justify="end" gap="sm">
                    <Link href={"/schools"}>
                        <Button variant="subtle">Abbrechen</Button>
                    </Link>
                    <Button type="submit">
                        {!!school ? "Speichern" : "Erstellen"}
                    </Button>
                </Group>
            </Container>
        </form>
    );
}
