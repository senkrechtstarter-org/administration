import {
    fetchParticipants,
    fetchReport,
    fetchReports,
    fetchSchool,
    fetchUsers,
} from "@/app/lib/data";
import ReportForm from "@/app/components/reports/ReportForm";
import { Container } from "@mantine/core";

export default async function Page({
    params,
}: {
    params: { schoolId: string; reportId: string };
}) {
    console.log("Report id: ", params.reportId);

    const [report, school, users, participants] = await Promise.all([
        fetchReport(params.reportId),
        fetchSchool(params.schoolId),
        fetchUsers(),
        fetchParticipants(params.reportId),
    ]);

    console.log("Participants: ", participants);
    console.log("Users: ", users);

    return (
        <Container p={"md"}>
            {/* <Breadcrumbs underline="none" radius="full" variant="solid">
                <BreadcrumbItem href="/schools">All Schools</BreadcrumbItem>
                <BreadcrumbItem href="/schools/create">
                    Add a School
                </BreadcrumbItem>
            </Breadcrumbs> */}
            <ReportForm
                report={report!}
                users={users}
                school={school!}
                participants={participants}
            />
        </Container>
    );
}
