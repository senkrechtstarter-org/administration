// app/schools/page.tsx
import React from "react";
import { fetchSchools } from "../../lib/data";
import { Button, Link } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
    DeleteSchoolButton,
    UpdateSchoolButton,
} from "@/app/components/buttons";
import SchoolCard from "@/app/components/schools/SchoolCard";

export default async function Page() {
    const schools = await fetchSchools();

    return (
        <div>
            <div className="flex justify-between">
                <h2 className={`mb-4 text-3xl`}>All Schools</h2>
                <Link href="/schools/create">
                    <Button color="primary">Add a New School</Button>
                </Link>
            </div>

            <div className="flex flex-col justify-between">
                {schools.map((school) => (
                    <Link href={`/schools/${school.id}`}>
                        <SchoolCard key={school.id} school={school} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
