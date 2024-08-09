import { fetchUsers, fetchSchool } from "@/app/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import SchoolForm from "@/app/components/schools/school-form";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const schoolId = params.schoolId;
    const [school, users] = await Promise.all([
        fetchSchool(schoolId),
        fetchUsers(),
    ]);
    return (
        <div>
            <Breadcrumbs underline="none" radius="full" variant="solid">
                <BreadcrumbItem href="/schools">All Schools</BreadcrumbItem>
                <BreadcrumbItem href={`/schools/${schoolId}/edit`}>
                    Edit {school?.name}
                </BreadcrumbItem>
            </Breadcrumbs>
            <SchoolForm users={users} school={school} />
        </div>
    );
}
