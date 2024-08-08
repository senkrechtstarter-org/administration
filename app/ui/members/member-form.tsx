import Link from "next/link";
import {
    UserCircleIcon,
    AtSymbolIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createUser, editUser } from "@/app/lib/actions";

export default function MemberForm({ member }: { member?: any }) {
    return (
        <form action={!!member ? editUser.bind(null, member.id) : createUser}>
            <div className="rounded-xl border-2 bg-gray-50 p-4 md:p-6">
                {/* Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                aria-required
                                id="name"
                                name="name"
                                type="string"
                                step="0.01"
                                placeholder="Enter last name"
                                defaultValue={member?.name}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10  text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                aria-required
                                id="email"
                                name="email"
                                type="string"
                                step="0.01"
                                placeholder="Enter email"
                                defaultValue={member?.email}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10  text-sm outline-2 placeholder:text-gray-500"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/members"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <Button type="submit">
                    {!!member ? "Edit Member" : "Create Member"}
                </Button>
            </div>
        </form>
    );
}
