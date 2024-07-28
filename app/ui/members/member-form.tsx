import Link from "next/link";
import {
    UserCircleIcon,
    AtSymbolIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createMember } from "@/app/lib/actions";
import { User } from "@/app/lib/types";
import { userAgent } from "next/server";

export default function MemberForm({ member }: { member?: User }) {
    return (
        <form action={createMember}>
            <div className="rounded-xl border-2 bg-gray-50 p-4 md:p-6">
                {/* First Name */}
                <div className="mb-4">
                    <label
                        htmlFor="first_name"
                        className="mb-2 block text-sm font-medium">
                        First Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                aria-required
                                id="first_name"
                                name="first_name"
                                type="string"
                                step="0.01"
                                placeholder="Enter first name"
                                defaultValue={member?.first_name}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10  text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label
                        htmlFor="last_name"
                        className="mb-2 block text-sm font-medium">
                        Last Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                aria-required
                                id="last_name"
                                name="last_name"
                                type="string"
                                step="0.01"
                                placeholder="Enter last name"
                                defaultValue={member?.last_name}
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

                {/* Password */}
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium">
                        Password
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                aria-required
                                id="password"
                                name="password"
                                type="password"
                                minLength={8}
                                required
                                step="0.01"
                                placeholder="Enter password"
                                defaultValue={member?.password}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10  text-sm outline-2 placeholder:text-gray-500"
                            />
                            <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
