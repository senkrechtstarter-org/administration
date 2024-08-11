import Link from "next/link";
import {
    UserCircleIcon,
    AtSymbolIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Button, CardHeader, Input } from "@nextui-org/react";
import { createUser, editUser } from "@/app/lib/actions";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

export default function MemberForm({ member }: { member?: any }) {
    return (
        <form action={!!member ? editUser.bind(null, member.id) : createUser}>
            <Card>
                <CardHeader className="px-4">
                    <h3 className="font-bold text-large">
                        Invite a New Member
                    </h3>
                </CardHeader>
                <CardBody className="flex flex-column gap-4">
                    <Input
                        label="Name"
                        labelPlacement="inside"
                        aria-required
                        id="name"
                        name="name"
                        type="string"
                        step="0.01"
                        placeholder="Enter full name"
                        defaultValue={member?.name}
                        startContent={
                            <UserCircleIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                        }
                    />

                    <Input
                        label="Email"
                        labelPlacement="inside"
                        aria-required
                        id="email"
                        name="email"
                        type="string"
                        step="0.01"
                        placeholder="Enter email"
                        defaultValue={member?.email}
                        startContent={
                            <AtSymbolIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                        }
                    />
                </CardBody>
                <CardFooter className="flex justify-end gap-2 items-center">
                    <Link href="/members">
                        <Button>Cancel</Button>
                    </Link>
                    <Button color="primary" type="submit">
                        {!!member ? "Edit Member" : "Create Member"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
