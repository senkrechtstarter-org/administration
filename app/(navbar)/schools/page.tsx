// app/schools/page.tsx
import React from "react";
import { fetchSchools } from "../../lib/data";
import { Button, Link } from "@nextui-org/react";
import SchoolCard from "@/app/components/schools/SchoolCard";

export default async function Page() {
    const schools = await fetchSchools();

    return (
        <div className="p-6">
            <div className="flex justify-between mb-2">
                <h2 className={`mb-4 text-3xl`}>Schulenübersicht</h2>
                <Link href="/schools/create">
                    <Button color="primary">Neue Schule Hinzufügen</Button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4">
                {schools.length === 0 && (
                    <div className="text-gray-500">Keine Schule gefunden!</div>
                )}
                {schools.map((school) => (
                    <SchoolCard key={school.id} school={school} />
                ))}
            </div>
        </div>
    );
}
