import { fetchUsers, fetchSchool } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import SchoolForm from "@/app/ui/schools/school-form";

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
            <Breadcrumbs
                breadcrumbs={[
                    { label: "All Schools", href: "/schools" },
                    {
                        label: `Edit ${school.name}`,
                        href: `/schools/${schoolId}/edit`,
                        active: true,
                    },
                ]}
            />
            <SchoolForm users={users} school={school} />
        </div>
    );
}
