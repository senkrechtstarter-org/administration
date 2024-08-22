"use client";

import Link from "next/link";
import {
    IdentificationIcon,
    CheckIcon,
    ScaleIcon,
    HomeIcon,
    UserCircleIcon,
    XMarkIcon,
    AtSymbolIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { createSchool, editSchool } from "@/app/lib/actions";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { User } from "@prisma/client";

export default function SchoolForm({
    users,
    school,
}: {
    users?: any;
    school?: any;
}) {
    console.log("School: ", school);
    const [admins, setAdmins] = useState<any>(
        new Set(school?.users.map((user: User) => user.id) || []),
    );

    return (
        <form
            action={(formData) =>
                !!school
                    ? editSchool(school.id, admins, formData)
                    : createSchool(admins, formData)
            }>
            <Card>
                <CardHeader className="p-4">
                    <h3 className="font-bold text-large">
                        {!!school
                            ? `Bearbeite ${school.name}`
                            : "Neue Schule Erstellen"}
                    </h3>
                </CardHeader>
                <CardBody className="flex flex-col gap-4 rounded-xl p-4 md:p-6">
                    {/* School Name */}
                    <Input
                        isRequired
                        label="Name der Schule"
                        labelPlacement="inside"
                        name="name"
                        placeholder="Enter school name"
                        defaultValue={school?.name}
                        startContent={
                            <IdentificationIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                        }
                        type="string"
                    />

                    {/* Address */}
                    <Input
                        isRequired
                        label="Addresse"
                        labelPlacement="inside"
                        name="address"
                        placeholder="Enter address"
                        defaultValue={school?.address}
                        startContent={
                            <HomeIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                        }
                        type="string"
                    />

                    {/* Contact Person */}
                    <Input
                        isRequired
                        label="Kontaktperson"
                        labelPlacement="inside"
                        name="contact_person"
                        placeholder="Enter contact person"
                        defaultValue={school?.contact_person}
                        startContent={
                            <UserCircleIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                        }
                        type="string"
                    />

                    {/* Email */}
                    <Input
                        isRequired
                        label="E-Mail"
                        name="email"
                        placeholder="Enter email"
                        defaultValue={school?.email}
                        startContent={
                            <AtSymbolIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                        }
                        type="email"
                    />

                    {/* Phone Number */}
                    <Input
                        isRequired
                        label="Telefonnummer"
                        name="phone"
                        placeholder="Enter phone number"
                        defaultValue={school?.phone}
                        startContent={
                            <PhoneIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                        }
                        type="tel"
                    />

                    <Select
                        label="Zuständige"
                        selectedKeys={admins}
                        onChange={(e) =>
                            setAdmins(new Set(e.target.value.split(",")))
                        }
                        placeholder="Konrad Adenauer"
                        selectionMode="multiple">
                        {users.map((user: any) => (
                            <SelectItem key={user.id}>{user.name}</SelectItem>
                        ))}
                    </Select>

                    {/* School Relation */}
                    <RadioGroup
                        label="Verhältnis"
                        orientation="horizontal"
                        defaultValue={school?.relation}
                        name="relation">
                        <Radio value="GOOD">
                            <Chip
                                color="success"
                                endContent={<CheckIcon className="w-4 mr-1" />}>
                                Gut
                            </Chip>
                        </Radio>
                        <Radio value="MIDDLE">
                            <Chip
                                endContent={<ScaleIcon className="w-4 mr-1" />}>
                                Mittel
                            </Chip>
                        </Radio>
                        <Radio value="BAD">
                            <Chip
                                color="danger"
                                endContent={<XMarkIcon className="w-4 mr-1" />}>
                                Schlecht
                            </Chip>
                        </Radio>
                    </RadioGroup>
                </CardBody>

                <CardFooter className="flex justify-end gap-4">
                    <Link href={"/schools"}>
                        <Button>Abbrechen</Button>
                    </Link>
                    <Button color="primary" type="submit">
                        {!!school ? "Speichern" : "Erstellen"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
