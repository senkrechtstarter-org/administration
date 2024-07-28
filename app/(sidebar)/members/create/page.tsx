import Breadcrumbs from "@/app/ui/breadcrumbs";
import MemberForm from "@/app/ui/members/member-form";

export default async function Page() {
    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "All Members", href: "/members" },
                    {
                        label: "Add a Member",
                        href: "/members/create",
                        active: true,
                    },
                ]}
            />
            <MemberForm />
        </div>
    );
}
