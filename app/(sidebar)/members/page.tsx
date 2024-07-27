import Link from "next/link";
import { fetchUsers } from "../../lib/data";
import { Button } from "../../ui/button";
import { DeleteMemberButton, UpdateMemberbutton } from "@/app/ui/buttons";

export default async function Page() {
    const users = await fetchUsers();

    return (
        <>
            <div className="flex justify-between">
                <h2 className={`mb-4 mt-1 text-3xl `}>All Members</h2>
                <Link href="/members/create">
                    <Button>Add a New Member</Button>
                </Link>
            </div>

            <div className="rounded-xl bg-gray-50 border-2">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex flex-row items-center justify-between p-4 border-b-2">
                        <div className="rounded p-4">
                            <h1>{user.first_name + " " + user.last_name}</h1>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <UpdateMemberbutton id={user.id} />
                            <DeleteMemberButton id={user.id} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
