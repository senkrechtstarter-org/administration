"use client";

import Link from "next/link";

import { createReport, editReport } from "@/app/lib/actions";
import { useState } from "react";
import {
    Button,
    Container,
    Group,
    MultiSelect,
    Stack,
    Textarea,
    Title,
    Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link as TipTapLink } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";

export default function ReportForm({
    users,
    school,
    report,
    participants: participantsData,
}: {
    users: any[];
    school: any;
    report?: any;
    participants?: any[];
}) {
    const [participants, setParticipants] = useState(
        participantsData?.map((participant) => participant.name) || [],
    );

    console.log("participant states: ", participants);

    const [date, setDate] = useState(report?.date || new Date());

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TipTapLink,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({
                placeholder: report.content || "Was ist passiert?",
            }),
        ],
        content: report?.content || "",
    });

    return (
        <form
            action={() => {
                const content = editor?.getHTML() || "";
                const participantIds =
                    users
                        ?.filter((user) => participants.includes(user.name))
                        .map((user) => user.id) || [];

                console.log("Content: ", content);
                console.log("Participant IDS: ", participantIds);
                console.log("Date: ", date);

                if (!!report) {
                    editReport(
                        report.id,
                        school.id,
                        participantIds,
                        date,
                        content,
                    );
                } else {
                    createReport(school.id, participantIds, date, content);
                }
            }}>
            <Container p="xl">
                <Stack gap="md">
                    <Title order={3}>
                        {!!report
                            ? `Bearbeite deinen Bericht für ${school.name}`
                            : `Erstelle einen neuen Bericht für ${school.name}`}
                    </Title>
                    <DatePickerInput
                        label="Datum"
                        placeholder="Wähle ein Datum aus"
                        value={date}
                        onChange={setDate}
                    />
                    <MultiSelect
                        label="Teilnehmer"
                        data={users.map((user) => user.name)}
                        value={participants}
                        onChange={setParticipants}
                        placeholder="Konrad Adenauer"
                    />
                    <Text size="sm">Bericht</Text>
                    {/* Rich Text Editor */}
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Undo />
                                <RichTextEditor.Redo />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content />
                    </RichTextEditor>
                    <Group justify="end">
                        <Link href={`/schools/${school.id}/reports`}>
                            <Button variant="subtle">Abbrechen</Button>
                        </Link>
                        <Button type="submit">
                            {!!report ? "Speichern" : "Erstellen"}
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </form>
    );
}
