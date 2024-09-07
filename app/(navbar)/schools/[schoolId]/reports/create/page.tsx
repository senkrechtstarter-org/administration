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
            <ReportForm users={users} school={school} />
        </Container>
    );
}
