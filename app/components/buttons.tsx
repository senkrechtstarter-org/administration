import { deleteSchool, deleteUser } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export function UpdateSchoolButton({ id }: { id: string }) {
    return (
        <Link href={`/schools/${id}/edit`}>
            <Button isIconOnly>
                <PencilIcon className="w-5" />
            </Button>
        </Link>
    );
}

export function UpdateMemberbutton({ id }: { id: string }) {
    return (
        <Link href={`/members/${id}/edit`}>
            <Button isIconOnly>
                <PencilIcon className="w-5" />
            </Button>
        </Link>
    );
}

export function DeleteSchoolButton({ id }: { id: string }) {
    const deleteSchoolWithId = deleteSchool.bind(null, id);
    return (
        <form action={deleteSchoolWithId}>
            <Button color="danger" isIconOnly>
                <TrashIcon className="w-5" />
            </Button>
        </form>
    );
}

export function DeleteUserButton({ id }: { id: string }) {
    const deleteUserWithId = deleteUser.bind(null, id);
    return (
        <form action={deleteUserWithId}>
            <Button color="danger" isIconOnly>
                <TrashIcon className="w-5" />
            </Button>
        </form>
    );
}

export function UpdateReportButton({ id }: { id: string }) {
    return (
        <Link href={`/schools/${id}/edit`}>
            <Button isIconOnly>
                <PencilIcon className="w-5" />
            </Button>
        </Link>
    );
}

export function DeleteReportButton({ id }: { id: string }) {
    const deleteReportWithId = deleteSchool.bind(null, id);
    return (
        <form action={deleteReportWithId}>
            <Button color="danger" isIconOnly>
                <TrashIcon className="w-5" />
            </Button>
        </form>
    );
}
