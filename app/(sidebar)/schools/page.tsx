// app/schools/page.tsx
import React from "react";
import { fetchSchools } from "../../lib/data";
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import { LatestInvoice } from "../../lib/definitions";

// Define the School type
export type School = {
  id: number;
  name: string;
  address: string;
  contact_person: string;
  email: string;
  phone_number: string;
  relation: string;
};

export default async function Page() {
  const schools = await fetchSchools();

  return <LatestInvoices schools={schools as School[]} />;
}
