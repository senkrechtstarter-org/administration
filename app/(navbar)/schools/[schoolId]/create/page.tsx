import SchoolForm from "@/app/components/schools/school-form";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { fetchUsers } from "@/app/lib/data";
import ReportForm from "@/app/components/ReportForm";

export default async function Page() {
    const users = await fetchUsers();
    return (
        <div>
            {/* <Breadcrumbs underline="none" radius="full" variant="solid">
                <BreadcrumbItem href="/schools">All Schools</BreadcrumbItem>
                <BreadcrumbItem href="/schools/create">
                    Add a School
                </BreadcrumbItem>
            </Breadcrumbs> */}
            <ReportForm users={users} />
        </div>
    );
}
