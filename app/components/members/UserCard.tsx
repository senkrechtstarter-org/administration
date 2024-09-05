"use client";

import {
    Button,
    Card,
    CardBody,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteUser, promoteUser, demoteUser } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

export default function UserCard({ user }: { user: any }) {
    const router = useRouter();
    const { data: session } = useSession();
    console.log("User session: ", session);
    console.log("User data: ", user);
    return (
        <Card className="p-4">
            <CardBody className="overflow-visible py-2">
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col items-start justify-center gap-2">
                        <div className="flex gap-4">
                            <h1 className="font-bold text-large">
                                {user.name}
                            </h1>
                            <Chip
                                color={
                                    user.is_speaker ? "secondary" : "default"
                                }>
                                {user.is_speaker ? "Speaker" : "Member"}
                            </Chip>
                        </div>

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
                            aria-label="Static Actions"
                            disabledKeys={
                                session?.user?.isSpeaker
                                    ? []
                                    : ["switch, delete"]
                            }>
                            <DropdownItem key="edit">Edit</DropdownItem>
                            <DropdownItem
                                key="switch"
                                color="warning"
                                onClick={() => {
                                    user.is_speaker
                                        ? demoteUser(user.id)
                                        : promoteUser(user.id);
                                }}>
                                {user.is_speaker
                                    ? "Demote User"
                                    : "Promote User"}
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onClick={() => deleteUser(user.id)}>
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardBody>
        </Card>
    );
}
