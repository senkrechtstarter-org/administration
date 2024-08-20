"use client";

import {
    Button,
    Card,
    CardBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/app/lib/actions";

export default function UserCard({ user }: { user: any }) {
    const router = useRouter();
    return (
        <Card className="p-4">
            <CardBody className="overflow-visible py-2">
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="font-bold text-large">{user.name}</h1>
                        <div className="text-default-500">{user.email}</div>
                    </div>
                    <Dropdown showArrow>
                        <DropdownTrigger>
                            <Button isIconOnly variant="light">
                                <EllipsisVerticalIcon className="w-6" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(key) => {
                                if (key === "edit") {
                                    router.push(`/members/${user.id}/edit`);
                                }
                            }}
                            aria-label="Static Actions">
                            <DropdownItem key="edit">Edit</DropdownItem>

                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onClick={() => deleteUser(user.id)}>
                                Delete
                                {/* <DeleteSchoolButton id={school.id} /> */}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardBody>
        </Card>
    );
}
