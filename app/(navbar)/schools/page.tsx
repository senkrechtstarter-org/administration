// app/schools/page.tsx
import React from "react";
import { fetchSchools } from "../../lib/data";
import Link from "next/link";
import { Button } from "@/app/components/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
    DeleteSchoolButton,
    UpdateSchoolButton,
} from "@/app/components/buttons";

export default async function Page() {
    const schools = await fetchSchools();

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex justify-between mb-1">
                <h2 className={`mb-4 text-xl md:text-3xl`}>All Schools</h2>
                <Link href="/schools/create">
                    <Button>Add a New School</Button>
                </Link>
            </div>

            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 border-2">
                {schools.map((school, i) => (
                    <div
                        key={school.id}
                        className="flex flex-row items-center justify-between p-4 border-b-2">
                        <div className="flex items-center">
                            <div className="min-w-0">
                                <p className="font-semibold text-base">
                                    {school.name}
                                </p>
                                <p className=" text-sm text-gray-500 ">
                                    {school.email}
                                </p>
                                <p className=" text-sm text-gray-500 ">
                                    {school.address}
                                </p>
                                <p className=" text-sm text-gray-500 ">
                                    {school.contact_person}
                                </p>
                                <p className=" text-sm text-gray-500 ">
                                    {school.phone_number}
                                </p>
                                <p className=" text-sm text-gray-500 ">
                                    {school.relation}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <UpdateSchoolButton id={school.id} />
                            <DeleteSchoolButton id={school.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
