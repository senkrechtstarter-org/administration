import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
} from "@nextui-org/react";
import { DeleteReportButton, UpdateReportButton } from "../buttons";

export default function ReportCard({ report }: { report: any }) {
    const date = report.date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return (
        <Card className="p-4">
            <CardHeader>
                <div className="w-full flex flex-row justify-between">
                    <h1 className="font-bold text-lg">{formattedDate}</h1>
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
                </div>
            </CardHeader>
            <CardBody className="py-2">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-gray-500">{report.content}</p>
                </div>
            </CardBody>
            <CardFooter className="flex flew-row justify-end gap-3">
                <UpdateReportButton schoolId={report.schoolId} id={report.id} />
                <DeleteReportButton id={report.id} />
            </CardFooter>
        </Card>
    );
}
