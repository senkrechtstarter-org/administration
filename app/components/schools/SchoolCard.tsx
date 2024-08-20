"use client";

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
import { useRouter } from "next/navigation";
import React from "react";
import { deleteSchool } from "@/app/lib/actions";

export default function SchoolCard({ school }: { school: any }) {
    const router = useRouter();
    console.log("School: ", school);
    return (
        <Card className="w-full p-4">
            <CardHeader className="flex justify-between" title={school.name}>
                <h1 className="font-bold text-lg">{school.name}</h1>
                <div className="flex gap-4 items-center">
                    <div className="flex gap-4">
                        {school.users.map((admin: any) => (
                            <Chip
                                key={admin.id}
                                variant="flat"
                                avatar={<Avatar name={admin.name[0]} />}>
                                {admin.name}
                            </Chip>
                        ))}
                    </div>
                    <Dropdown showArrow>
                        <DropdownTrigger>
                            <Button isIconOnly variant="light">
                                <EllipsisVerticalIcon className="w-6" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(key) => {
                                if (key === "reports") {
                                    router.push(
                                        `/schools/${school.id}/reports`,
                                    );
                                } else if (key === "edit") {
                                    router.push(`/schools/${school.id}/edit`);
                                }
                            }}
                            aria-label="Static Actions">
                            <DropdownItem key="reports">
                                Berichte Ansehen
                            </DropdownItem>

                            <DropdownItem key="edit">Bearbeiten</DropdownItem>

                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onClick={() => deleteSchool(school.id)}>
                                Löschen
                                {/* <DeleteSchoolButton id={school.id} /> */}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
