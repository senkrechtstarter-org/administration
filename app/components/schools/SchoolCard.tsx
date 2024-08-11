import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Link,
} from "@nextui-org/react";
import { DeleteSchoolButton, UpdateSchoolButton } from "../buttons";

export default function SchoolCard({ school }: { school: any }) {
    return (
        <Card className="p-4 max-w-80">
            <CardHeader>
                <h1 className="font-bold text-lg">{school.name}</h1>
            </CardHeader>
            <CardBody className="py-2">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-gray-500">Email: {school.email}</p>
                    <p className="text-gray-500">Address: {school.address}</p>
                    <p className="text-gray-500">
                        Contact Person: {school.contact_person}
                    </p>
                    <p className="text-gray-500">Phone: {school.phone}</p>
                    <p className="text-gray-500">Relation: {school.relation}</p>
                </div>
            </CardBody>
            <CardFooter className="flex flew-row justify-end gap-3">
                <UpdateSchoolButton id={school.id} />
                <DeleteSchoolButton id={school.id} />
            </CardFooter>
        </Card>
    );
}
