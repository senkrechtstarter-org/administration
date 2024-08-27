import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { PencilIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import React from "react";
import { deleteSchool } from "@/app/lib/actions";
import { fetchAdmins } from "@/app/lib/data";
import SchoolCardDropdown from "../SchoolCardDropdown";

export default async function SchoolCard({ school }: { school: any }) {
    const admins = await fetchAdmins(school.id);

    return (
        <Card className="w-full p-4">
            <CardHeader className="flex justify-between" title={school.name}>
                <h1 className="font-bold text-lg">{school.name}</h1>
                <div className="flex gap-4 items-center">
                    <div className="flex gap-4">
                        {admins.map((admin: any) => (
                            <Chip
                                key={admin.id}
                                variant="flat"
                                avatar={<Avatar name={admin.name[0]} />}>
                                {admin.name}
                            </Chip>
                        ))}
                    </div>
                    <SchoolCardDropdown school={school} />
                </div>
            </CardHeader>
            <CardBody className="py-2">
                <div className="flex flex-col justify-between gap-3">
                    <div className="text-gray-500">E-Mail: {school.email}</div>
                    <div className="text-gray-500">
                        Addresse: {school.address}
                    </div>
                    <div className="text-gray-500">
                        Kontaktperson: {school.contact_person}
                    </div>
                    <div className="text-gray-500">Telefon: {school.phone}</div>
                    <div className="text-gray-500">
                        Verhältnis: {school.relation}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
