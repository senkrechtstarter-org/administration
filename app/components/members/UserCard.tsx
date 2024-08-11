import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
} from "@nextui-org/react";
import { DeleteUserButton, UpdateMemberbutton } from "../buttons";

export default function UserCard({ user }: { user: any }) {
    return (
        <Card className="p-4">
            <CardBody className="overflow-visible py-2">
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="font-bold text-large">{user.name}</h1>
                        <p className="text-default-500">{user.email}</p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <UpdateMemberbutton id={user.id} />
                        <DeleteUserButton id={user.id} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
