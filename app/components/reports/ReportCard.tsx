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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { deleteReport } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function ReportCard({
    report,
    schoolId,
}: {
    report: any;
    schoolId: string;
}) {
    const date = report.date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const router = useRouter();
    return (
        <Card className="p-4">
            <CardHeader>
                <div className="w-full flex flex-row justify-between">
                    <h1 className="font-bold text-lg">{formattedDate}</h1>

                    <Dropdown showArrow>
                        <DropdownTrigger>
                            <Button isIconOnly variant="light">
                                <EllipsisVerticalIcon className="w-6" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(key) => {
                                if (key === "edit") {
                                    router.push(
                                        `/schools/${schoolId}/reports/${report.id}/edit`,
                                    );
                                }
                            }}
                            aria-label="Static Actions">
                            <DropdownItem key="edit">Edit</DropdownItem>

                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onClick={() => deleteReport(report.id)}>
                                Delete
                                {/* <DeleteSchoolButton id={school.id} /> */}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardHeader>
            <CardBody className="py-2">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-gray-500">{report.content}</p>
                </div>
            </CardBody>
            <CardFooter className="flex flew-row justify-end gap-3">
                <div className="flex gap-4">
                    {report.participants.map((participant: any) => (
                        <Chip
                            key={participant.id}
                            variant="flat"
                            avatar={
                                <Avatar name={participant.name.charAt(0)} />
                            }>
                            {participant.name}
                        </Chip>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
