import { fetchUsers } from "../../lib/data";
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import { LatestInvoice } from "../../lib/definitions";
import { lusitana } from "../../ui/fonts";
import { Button } from "../../ui/button";

// Define the School type
type School = {
  id: number;
  name: string;
};

export default async function Page() {
  const users = await fetchUsers();
  console.log(users);

  return (
    <>
      <div className="flex justify-between">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          All Members
        </h2>
        <Button>Add Member</Button>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
        {users.map((user) => (
          <div className="rounded bg-white p-4" key={user.id}>
            <h1>{user.first_name + " " + user.last_name}</h1>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}
