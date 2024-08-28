import SchoolForm from "@/app/components/schools/school-form";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { fetchSchool, fetchUsers } from "@/app/lib/data";
import ReportForm from "@/app/components/reports/ReportForm";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const school = await fetchSchool(params.schoolId);
    const users = await fetchUsers();
    return (
        <div className="p-6">
            {/* <Breadcrumbs underline="none" radius="full" variant="solid">
                <BreadcrumbItem href="/schools">All Schools</BreadcrumbItem>
                <BreadcrumbItem href="/schools/create">
                    Add a School
                </BreadcrumbItem>
            </Breadcrumbs> */}
            <ReportForm users={users} school={school} />
        </div>
    );
}
