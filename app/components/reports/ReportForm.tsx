"use client";

import Link from "next/link";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    DatePicker,
    Dropdown,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";
import { createReport, editReport } from "@/app/lib/actions";
import { useState } from "react";
import { today, parseDate, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { AnyAaaaRecord } from "dns";

export default function ReportForm({
    users,
    school,
    report,
    participants: participantsData,
}: {
    users: any[];
    school: any;
    report?: any;
    participants?: any[];
}) {
    const [participants, setParticipants] = useState(
        new Set(
            participantsData?.map((participant: any) => participant.id) || [],
        ),
    );

    const [date, setDate] = useState(
        report?.date
            ? parseDate(report.date.toISOString().substring(0, 10))
            : today(getLocalTimeZone()),
    );

    return (
        <form
            action={
                !!report
                    ? editReport.bind(null, report.id, school.id, participants)
                    : createReport.bind(null, school.id, participants)
            }>
            <Card className="p-6">
                <CardHeader>
                    <h3 className="font-bold text-large">
                        {!!report
                            ? `Bearbeite deinen Bericht für ${school.name}`
                            : `Erstelle einen neuen Bericht für ${school.name}`}
                    </h3>
                </CardHeader>
                <CardBody className="gap-3">
                    <I18nProvider locale="de-DE-u-ca-german">
                        <DatePicker
                            showMonthAndYearPickers
                            value={date}
                            onChange={setDate}
                            isRequired
                            name="date"
                            label="Datum"
                        />
                    </I18nProvider>

                    <Textarea
                        name="content"
                        isRequired
                        label="Bericht"
                        defaultValue={report?.content}
                        placeholder="Enter your description"
                    />
                    <Select
                        label="Teilnehmner"
                        selectedKeys={participants as any}
                        onSelectionChange={setParticipants as any}
                        placeholder="Konrad Adenauer"
                        // defaultSelectedKeys={participants.map()}
                        selectionMode="multiple">
                        {users.map((user: any) => (
                            <SelectItem key={user.id}>{user.name}</SelectItem>
                        ))}
                    </Select>
                </CardBody>
                <CardFooter className="flex justify-end gap-4">
                    <Link href={`/schools/${school.id}/reports`}>
                        <Button>Abbrechen</Button>
                    </Link>
                    <Button color="primary" type="submit">
                        {!!report ? "Speichern" : "Erstellen"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
