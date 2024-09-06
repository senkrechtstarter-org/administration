import { fetchUsers } from "@/app/lib/data";
import ProtocolForm from "@/app/components/protocols/ProtocolForm";
import { Container } from "@mantine/core";

export default async function Page({
    params,
}: {
    params: { schoolId: string };
}) {
    const users = await fetchUsers();
    return (
        <Container p={"md"}>
            {/* <Breadcrumbs underline="none" radius="full" variant="solid">
                <BreadcrumbItem href="/schools">All Schools</BreadcrumbItem>
                <BreadcrumbItem href="/schools/create">
                    Add a School
                </BreadcrumbItem>
            </Breadcrumbs> */}
            <ProtocolForm users={users} />
        </Container>
    );
}
