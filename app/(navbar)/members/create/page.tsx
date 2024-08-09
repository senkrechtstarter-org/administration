import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import MemberForm from "@/app/components/members/member-form";

export default async function Page() {
    return (
        <div>
            <Breadcrumbs>
                <BreadcrumbItem href="/docs/components/button">
                    Button
                </BreadcrumbItem>
                <BreadcrumbItem href="/docs/components/breadcrumbs">
                    Breadcrumbs
                </BreadcrumbItem>
                <BreadcrumbItem href="/docs/components/card">
                    Card
                </BreadcrumbItem>
                <BreadcrumbItem href="/docs/components/checkbox">
                    Checkbox
                </BreadcrumbItem>
                <BreadcrumbItem href="/docs/components/code">
                    Code
                </BreadcrumbItem>
            </Breadcrumbs>
            <MemberForm />
        </div>
    );
}
