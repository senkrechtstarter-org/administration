import { fetchUser } from "@/app/lib/data";

import MemberForm from "@/app/components/members/MemberForm";

export default async function Page({
    params,
}: {
    params: { memberId: string };
}) {
    const userId = params.memberId;
    const user = await fetchUser(userId);
    return (
        <div>
            <MemberForm member={user} />
        </div>
    );
}
