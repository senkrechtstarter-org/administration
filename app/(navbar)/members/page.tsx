import Link from "next/link";
import { fetchUsers } from "../../lib/data";
import { Button } from "@nextui-org/react";
import UserCard from "@/app/components/members/UserCard";

export default async function Page() {
    const users = await fetchUsers();

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h2 className={`mb-4 mt-1 text-2xl`}>Mitgliederübersicht</h2>
                <Link href="/members/create">
                    <Button color="primary">Neues Mitglied Hinzufügen</Button>
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                {users.length === 0 && (
                    <div className="text-gray-500">No users found</div>
                )}
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}
