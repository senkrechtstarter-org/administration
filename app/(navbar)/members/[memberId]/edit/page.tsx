import { fetchUser } from "@/app/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import MemberForm from "@/app/components/members/member-form";

export default async function Page({
    params,
}: {
    params: { memberId: string };
}) {
    const userId = params.memberId;
    const user = await fetchUser(userId);
    return (
        <div>
            <Breadcrumbs underline="none" variant="solid">
                <BreadcrumbItem href="/members">Mitglieder</BreadcrumbItem>
                <BreadcrumbItem href={`/members/${userId}/edit`}>
                    {user?.name}
                </BreadcrumbItem>
            </Breadcrumbs>

            <MemberForm member={user} />
        </div>
    );
}
