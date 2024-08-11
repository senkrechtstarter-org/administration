import Link from "next/link";
import {
    IdentificationIcon,
    CheckIcon,
    ScaleIcon,
    HomeIcon,
    UserCircleIcon,
    XMarkIcon,
    AtSymbolIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Chip,
    DatePicker,
    Radio,
    RadioGroup,
    Textarea,
} from "@nextui-org/react";
import { createReport, editReport } from "@/app/lib/actions";
import { Input } from "@nextui-org/react";

export default function ReportForm({
    users,
    report,
}: {
    users?: any;
    report?: any;
}) {
    return (
        <form
            action={!!report ? editReport.bind(null, school.id) : createReport}>
            <Card className="flex flex-col rounded-xl p-4 md:p-6 ">
                <CardBody className="gap-3">
                    <DatePicker isRequired label="Date of Visit / Contact" />
                    <Textarea
                        isRequired
                        label="Description"
                        placeholder="Enter your description"
                    />
                </CardBody>
                <CardFooter className="flex justify-end gap-4">
                    <Link href={"/schools"}>
                        <Button>Cancel</Button>
                    </Link>
                    <Button color="primary" type="submit">
                        {!!report ? "Edit Report" : "Create Report"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
