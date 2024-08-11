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
    CardFooter,
    Chip,
    Radio,
    RadioGroup,
} from "@nextui-org/react";
import { createSchool, editSchool } from "@/app/lib/actions";
import { Input } from "@nextui-org/react";

export default function SchoolForm({
    users,
    school,
}: {
    users?: any;
    school?: any;
}) {
    return (
        <form
            action={!!school ? editSchool.bind(null, school.id) : createSchool}>
            <Card className="flex flex-col gap-3 rounded-xl p-4 md:p-6 ">
                {/* School Name */}
                <Input
                    label="School Name"
                    labelPlacement="inside"
                    name="name"
                    placeholder="Enter school name"
                    startContent={
                        <IdentificationIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                    }
                    type="string"
                />

                {/* Address */}
                <Input
                    label="Address"
                    labelPlacement="inside"
                    name="address"
                    placeholder="Enter address"
                    startContent={
                        <HomeIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                    }
                    type="string"
                />

                {/* Contact Person */}
                <Input
                    label="Contact Person"
                    labelPlacement="inside"
                    name="contact_person"
                    placeholder="Enter contact person"
                    startContent={
                        <UserCircleIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                    }
                    type="string"
                />

                {/* Email */}
                <Input
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    startContent={
                        <AtSymbolIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                    }
                    type="email"
                />

                {/* Phone Number */}
                <Input
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter phone number"
                    startContent={
                        <PhoneIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                    }
                    type="tel"
                />

                {/* School Relation */}
                <RadioGroup
                    label="School relation"
                    orientation="horizontal"
                    name="relation">
                    <Radio
                        defaultChecked={school?.relation === "GOOD"}
                        value="GOOD">
                        <Chip
                            color="success"
                            endContent={<CheckIcon className="w-4 mr-1" />}>
                            Good
                        </Chip>
                    </Radio>
                    <Radio
                        value="MIDDLE"
                        defaultChecked={school?.relation === "MIDDLE"}>
                        <Chip endContent={<ScaleIcon className="w-4 mr-1" />}>
                            Middle
                        </Chip>
                    </Radio>
                    <Radio
                        defaultChecked={school?.relation === "BAD"}
                        value="BAD">
                        <Chip
                            color="danger"
                            endContent={<XMarkIcon className="w-4 mr-1" />}>
                            Bad
                        </Chip>
                    </Radio>
                </RadioGroup>
                <CardFooter className="flex justify-end gap-4">
                    <Link href={"/schools"}>
                        <Button>Cancel</Button>
                    </Link>
                    <Button color="primary" type="submit">
                        {!!school ? "Edit School" : "Create School"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
