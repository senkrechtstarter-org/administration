import React from "react";
import { fetchReports, fetchSchool } from "@/app/lib/data";
import { Button, Link } from "@nextui-org/react";
import ReportCard from "@/app/components/reports/ReportCard";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const schoolId = params.schoolId;
    const school = await fetchSchool(params.schoolId);
    const reports = await fetchReports(schoolId);

    return (
        <div className="p-6">
            <div className="flex justify-between mb-2">
                <h2 className={`mb-4 text-3xl`}>Reports for {school?.name}</h2>
                <Link href={`/schools/${schoolId}/reports/create`}>
                    <Button color="primary">Add a New Report</Button>
                </Link>
            </div>

            <div className="flex flex-col justify-between gap-4">
                {reports.length === 0 && (
                    <div className="text-gray-500">No reports found</div>
                )}
                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>
        </div>
    );
}
