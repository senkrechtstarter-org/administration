import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { LatestInvoice } from "@/app/lib/definitions";
import { School } from "@/app/(sidebar)/schools/page";
import { CreateSchool } from "../invoices/buttons";
export default async function LatestInvoices({
  schools,
}: {
  schools: School[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex justify-between">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Schools
        </h2>
        <CreateSchool />
      </div>

      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {schools.map((school, i) => {
            return (
              <div
                key={school.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {school.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {school.email}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {school.address}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {school.contact_person}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {school.phone_number}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {school.relation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
