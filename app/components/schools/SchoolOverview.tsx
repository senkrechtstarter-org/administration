"use client";

import {
    Accordion,
    AccordionItem,
    Avatar,
    Button,
    Chip,
    Link,
} from "@nextui-org/react";
import SchoolCardDropdown from "../SchoolCardDropdown";

export default function SchoolOverview({ schools }: { schools: any }) {
    return (
        <div className="p-6 mt-2">
            <div className="flex justify-between mb-2">
                <h2 className={`mb-4 text-2xl`}>Schulenübersicht</h2>
                <Link href="/schools/create">
                    <Button color="primary">Neue Schule Hinzufügen</Button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
                {schools.length === 0 && (
                    <div className="text-gray-500">Keine Schule gefunden!</div>
                )}
                <Accordion selectionMode="multiple" variant="shadow">
                    {schools.map((school: any) => (
                        <AccordionItem
                            key={school.id}
                            title={
                                <div className="flex justify-between">
                                    <div className="flex gap-4">
                                        <div>{school.name}</div>
                                        <Chip
                                            color={
                                                school.email_sent
                                                    ? "success"
                                                    : "danger"
                                            }>
                                            {school.email_sent
                                                ? "Versendet"
                                                : "Unversendet"}
                                        </Chip>
                                    </div>

                                    <div>
                                        {school.admins.map((admin: any) => (
                                            <Chip
                                                key={admin.id}
                                                variant="flat"
                                                avatar={
                                                    <Avatar
                                                        name={admin.name[0]}
                                                    />
                                                }>
                                                {admin.name}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            }
                            startContent={
                                <SchoolCardDropdown school={school} />
                            }>
                            <div className="flex flex-col justify-between gap-3 p-4">
                                <div>E-Mail: {school.email}</div>
                                <div>Addresse: {school.address}</div>
                                <div>
                                    Kontaktperson: {school.contact_person}
                                </div>
                                <div>Telefon: {school.phone}</div>
                                <div>
                                    Verhältnis:{" "}
                                    {school.relation == "MIDDLE"
                                        ? "Mittel"
                                        : school.relation == "BAD"
                                        ? "Schlecht"
                                        : "Gut"}
                                </div>
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
