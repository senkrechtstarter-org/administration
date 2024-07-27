import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchUsers } from "@/app/lib/data";
import { CustomerField } from "@/app/lib/types";
import CreateMemberForm from "@/app/ui/members/create-member-form";

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
            <CreateMemberForm />
        </div>
    );
}
