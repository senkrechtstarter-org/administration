import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
} from "@nextui-org/react";
import ReportCardDropdown from "../ReportCardDropdown";
import { fetchParticipants } from "@/app/lib/data";

export default async function ReportCard({
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

    const participants = await fetchParticipants(report.id);
    return (
        <Card className="p-4">
            <CardHeader>
                <div className="w-full flex flex-row justify-between">
                    <h1 className="font-bold text-lg">{formattedDate}</h1>

                    <ReportCardDropdown
                        reportId={report.id}
                        schoolId={schoolId}
                    />
                </div>
            </CardHeader>
            <CardBody className="py-2">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-gray-500">{report.content}</p>
                </div>
            </CardBody>
            <CardFooter className="flex flew-row justify-end gap-3">
                <div className="flex gap-4">
                    {participants.map((participant: any) => (
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
