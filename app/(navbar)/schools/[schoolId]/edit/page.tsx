import { fetchUsers, fetchSchool, fetchAdmins } from "@/app/lib/data";
import SchoolForm from "@/app/components/schools/SchoolForm";
import { Container } from "@mantine/core";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const schoolId = params.schoolId;
    const [school, users, admins] = await Promise.all([
        fetchSchool(schoolId),
        fetchUsers(),
        fetchAdmins(schoolId),
    ]);

    return (
        <Container p={"md"}>
            {/* <Breadcrumbs underline="none" radius="full" variant="solid">
                <BreadcrumbItem href="/schools">All Schools</BreadcrumbItem>
                <BreadcrumbItem href={`/schools/${schoolId}/edit`}>
                    Edit {school?.name}
                </BreadcrumbItem>
            </Breadcrumbs> */}
            <SchoolForm users={users} school={school} admins={admins} />
        </Container>
    );
}
