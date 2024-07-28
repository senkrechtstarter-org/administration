import { fetchMember } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import MemberForm from "@/app/ui/members/member-form";

export default async function Page({
    params,
}: {
    params: { memberId: string };
}) {
    const memberId = params.memberId;
    const member = await fetchMember(memberId);
    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "All Members", href: "/members" },
                    {
                        label: `Edit Member: ${member.first_name} ${member.last_name}`,
                        href: `/members/${memberId}/edit`,
                        active: true,
                    },
                ]}
            />
            <MemberForm member={member} />
        </div>
    );
}
