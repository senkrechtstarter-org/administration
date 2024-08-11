import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { DeleteReportButton, UpdateReportButton } from "./buttons";

export default function ReportCard({ report }: { report: any }) {
    return (
        <Card className="p-4 max-w-80">
            <CardHeader>
                <h1 className="font-bold text-lg">{report.date}</h1>
            </CardHeader>
            <CardBody className="py-2">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-gray-500">Content: {report.content}</p>
                </div>
            </CardBody>
            <CardFooter className="flex flew-row justify-end gap-3">
                <UpdateReportButton id={report.id} />
                <DeleteReportButton id={report.id} />
            </CardFooter>
        </Card>
    );
}
