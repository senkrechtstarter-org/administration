import { deleteSchool, deleteMember } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function UpdateSchoolButton({ id }: { id: string }) {
    return (
        <Link
            href={`/schools/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function UpdateMemberbutton({ id }: { id: string }) {
    return (
        <Link
            href={`/members/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteSchoolButton({ id }: { id: string }) {
    const deleteSchoolWithId = deleteSchool.bind(null, id);
    return (
        <form action={deleteSchoolWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}

export function DeleteMemberButton({ id }: { id: string }) {
    const deleteMemberWithId = deleteMember.bind(null, id);
    return (
        <form action={deleteMemberWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
