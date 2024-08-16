import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
} from "@nextui-org/react";
import { DeleteSchoolButton } from "../buttons";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function SchoolCard({ school }: { school: any }) {
    console.log("School: ", school);
    return (
        <Card className="p-4">
            <CardHeader>
                <h1 className="font-bold text-lg">{school.name}</h1>
            </CardHeader>
            <CardBody className="py-2">
                <div className="flex flex-col justify-between gap-3">
                    <div className="text-gray-500">Email: {school.email}</div>
                    <div className="text-gray-500">
                        Address: {school.address}
                    </div>
                    <div className="text-gray-500">
                        Contact Person: {school.contact_person}
                    </div>
                    <div className="text-gray-500">Phone: {school.phone}</div>
                    <div className="text-gray-500">
                        Relation: {school.relation}
                    </div>
                    <div className="flex gap-4">
                        {school.users.map((admin: any) => (
                            <Chip
                                key={admin.id}
                                variant="flat"
                                avatar={<Avatar name="JW" />}>
                                {admin.name}
                            </Chip>
                        ))}
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex flew-row justify-end gap-3">
                <Link key={school.id} href={`/schools/${school.id}`}>
                    <Button>View Reports</Button>
                </Link>
                <Link href={`/schools/${school.id}/edit`}>
                    <Button isIconOnly>
                        <PencilIcon className="w-5" />
                    </Button>
                </Link>
                <DeleteSchoolButton id={school.id} />
            </CardFooter>
        </Card>
    );
}
