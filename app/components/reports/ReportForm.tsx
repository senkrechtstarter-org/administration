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

export default function ReportForm({
    users,
    school,
    report,
}: {
    users?: any;
    school?: any;
    report?: any;
}) {
    console.log("Users: ", users);
    const [participants, setParticipants] = useState(
        new Set(report?.participants || []),
    );

    console.log("particiapnts: ", participants);
    return (
        <form
            action={
                !!report
                    ? editReport.bind(null, report.id, school.id, participants)
                    : createReport.bind(null, school.id, participants)
            }>
            <Card>
                <CardHeader className="px-4">
                    <h3 className="font-bold text-large">
                        {!!report
                            ? `Edit Report for ${school.name}`
                            : `Create a New Report for ${school.name}`}
                    </h3>
                </CardHeader>
                <CardBody className="gap-3">
                    <DatePicker
                        isRequired
                        name="date"
                        label="Date of Visit / Contact"
                    />
                    <Textarea
                        name="content"
                        isRequired
                        label="Description"
                        placeholder="Enter your description"
                    />
                    <Select
                        label="Participants"
                        selectedKeys={participants as any}
                        onSelectionChange={setParticipants as any}
                        placeholder="Konrad Adenauer"
                        selectionMode="multiple">
                        {users.map((user: any) => (
                            <SelectItem key={user.id}>{user.name}</SelectItem>
                        ))}
                    </Select>
                </CardBody>
                <CardFooter className="flex justify-end gap-4">
                    <Link href={"/schools"}>
                        <Button>Cancel</Button>
                    </Link>
                    <Button color="primary" type="submit">
                        {!!report ? "Edit Report" : "Create Report"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
