// app/schools/page.tsx
import React from "react";
import { fetchSchools } from "../../lib/data";
import { Button, Link } from "@nextui-org/react";
import SchoolCard from "@/app/components/schools/SchoolCard";

export default async function Page() {
    const schools = await fetchSchools();
    console.log("Schools: ", schools);
    return (
        <div className="p-6">
            <div className="flex justify-between mb-2">
                <h2 className={`mb-4 text-3xl`}>All Schools</h2>
                <Link href="/schools/create">
                    <Button color="primary">Add a New School</Button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4">
                {schools.length === 0 && (
                    <div className="text-gray-500">No schools found</div>
                )}
                {schools.map((school) => (
                    <SchoolCard key={school.id} school={school} />
                ))}
            </div>
        </div>
    );
}
