import Link from "next/link";
import { fetchUsers } from "../../lib/data";
import { Button } from "@nextui-org/react";
import UserCard from "@/app/components/members/UserCard";

export default async function Page() {
    const users = await fetchUsers();

    return (
        <>
            <div className="flex justify-between">
                <h2 className={`mb-4 mt-1 text-3xl `}>All Members</h2>
                <Link href="/members/create">
                    <Button color="primary">Add a New Member</Button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    );
}
