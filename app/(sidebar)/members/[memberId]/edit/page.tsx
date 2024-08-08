import { fetchUser } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import MemberForm from "@/app/ui/members/member-form";

export default async function Page({
    params,
}: {
    params: { memberId: string };
}) {
    const userId = params.memberId;
    const user = await fetchUser(userId);
    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "All Members", href: "/members" },
                    {
                        label: `Edit Member: ${user.name}`,
                        href: `/members/${userId}/edit`,
                        active: true,
                    },
                ]}
            />
            <MemberForm member={user} />
        </div>
    );
}
