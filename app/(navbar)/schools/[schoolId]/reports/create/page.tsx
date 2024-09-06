import { fetchSchool, fetchUsers } from "@/app/lib/data";
import ReportForm from "@/app/components/reports/ReportForm";
import { Container } from "@mantine/core";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const school = await fetchSchool(params.schoolId);
    const users = await fetchUsers();
    return (
        <Container p={"md"}>
            {/* <Breadcrumbs underline="none" radius="full" variant="solid">
                <BreadcrumbItem href="/schools">All Schools</BreadcrumbItem>
                <BreadcrumbItem href="/schools/create">
                    Add a School
                </BreadcrumbItem>
            </Breadcrumbs> */}
            <ReportForm users={users} school={school} />
        </Container>
    );
}
