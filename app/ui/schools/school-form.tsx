import { User } from "@/app/lib/types";
import Link from "next/link";
import {
    IdentificationIcon,
    CheckIcon,
    ScaleIcon,
    HomeIcon,
    UserCircleIcon,
    XMarkIcon,
    AtSymbolIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createSchool, editSchool } from "@/app/lib/actions";
import { School } from "@/app/lib/types";

export default function SchoolForm({
    users,
    school,
}: {
    users: User[];
    school?: School;
}) {
    return (
        <form
            action={!!school ? editSchool.bind(null, school.id) : createSchool}>
            <div className="rounded-xl border-2 bg-gray-50 p-4 md:p-6">
                {/* School Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium">
                        School Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="string"
                                step="0.01"
                                defaultValue={school?.name}
                                placeholder="Enter school name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10  text-sm outline-2 placeholder:text-gray-500"
                            />
                            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label
                        htmlFor="address"
                        className="mb-2 block text-sm font-medium">
                        Address
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="address"
                                name="address"
                                type="string"
                                step="0.01"
                                defaultValue={school?.address}
                                placeholder="Enter address"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10  text-sm outline-2 placeholder:text-gray-500"
                            />
                            <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Contact Person */}
                <div className="mb-4">
                    <label
                        htmlFor="contact_person"
                        className="mb-2 block text-sm font-medium">
                        Contact Person
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="contact_person"
                                name="contact_person"
                                type="string"
                                step="0.01"
                                defaultValue={school?.contact_person}
                                placeholder="Enter contact person"
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
                                id="email"
                                name="email"
                                type="string"
                                step="0.01"
                                defaultValue={school?.email}
                                placeholder="Enter email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10  text-sm outline-2 placeholder:text-gray-500"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label
                        htmlFor="phone_number"
                        className="mb-2 block text-sm font-medium">
                        Phone Number
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="phone_number"
                                name="phone_number"
                                type="string"
                                step="0.01"
                                defaultValue={school?.phone_number}
                                placeholder="Enter phone number"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset className="mb-4">
                    <legend className="mb-2 block text-sm font-medium">
                        Set the school relation
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="good"
                                    name="relation"
                                    type="radio"
                                    value="Good"
                                    defaultChecked={school?.relation === "Good"}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="good"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
                                    Good <CheckIcon className="h-4 w-4" />
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="middle"
                                    name="relation"
                                    type="radio"
                                    value="Middle"
                                    defaultChecked={
                                        school?.relation === "Middle"
                                    }
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="middle"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                    Middle <ScaleIcon className="h-4 w-4" />
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="bad"
                                    name="relation"
                                    type="radio"
                                    value="Bad"
                                    defaultChecked={school?.relation === "Bad"}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="bad"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white">
                                    Bad <XMarkIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href={"/schools"}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <Button type="submit">
                    {!!school ? "Edit School" : "Create School"}
                </Button>
            </div>
        </form>
    );
}
