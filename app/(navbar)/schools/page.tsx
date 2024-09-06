// app/schools/page.tsx

import { fetchSchools } from "../../lib/data";

import SchoolOverview from "@/app/components/schools/SchoolOverview";

export default async function Page() {
    const schools = await fetchSchools();

    return <SchoolOverview schools={schools} />;
}
