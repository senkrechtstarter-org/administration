// app/schools/page.tsx
import React from "react";
import { fetchReports } from "@/app/lib/data";
import { Button, Link } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import SchoolCard from "@/app/components/schools/SchoolCard";
import ReportCard from "@/app/components/ReportCard";

export default async function Page(props: any) {
    const schoolId = props.params.schoolId;
    const reports = await fetchReports(schoolId);

    return (
        <div>
            <div className="flex justify-between">
                <h2 className={`mb-4 text-3xl`}>Reports</h2>
                <Link href={`/schools/${schoolId}/create`}>
                    <Button color="primary">Add a New Report</Button>
                </Link>
            </div>

            <div className="flex flex-col justify-between">
                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>
        </div>
    );
}
