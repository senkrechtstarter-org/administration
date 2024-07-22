import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchUsers } from "@/app/lib/data";
import { CustomerField } from "@/app/lib/definitions";

export default async function Page() {
  const users = (await fetchUsers()) as CustomerField[];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/schools" },
          {
            label: "Add a School",
            href: "/schools/create",
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}
