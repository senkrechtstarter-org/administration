// app/schools/page.tsx
import React from "react";
import { fetchSchools } from "../../lib/data";

import SchoolOverview from "@/app/components/schools/SchoolOverview";

export default async function Page() {
    const schools = await fetchSchools();
    console.log("Schools from page: ", schools);
    return <SchoolOverview schools={schools} />;
}
