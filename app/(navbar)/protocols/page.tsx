// app/schools/page.tsx

import { fetchProtocols } from "../../lib/data";

import ProtocolOverview from "@/app/components/protocols/ProtocolOverview";

export default async function Page() {
    const protocols = await fetchProtocols();
    return <ProtocolOverview protocols={protocols} />;
}
