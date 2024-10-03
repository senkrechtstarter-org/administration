"use client";

import { Button, FileButton } from "@mantine/core";
import { useState } from "react";
import { upload } from "@vercel/blob/client";

export default function MaterialUploadButton() {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <FileButton
            multiple
            onChange={async (files) => {
                for (const file of files) {
                    await upload(file.name, file, {
                        access: "public",
                        handleUploadUrl: "/api/materials/upload",
                    });
                }

                // Upload files to vercel blob
            }}>
            {(props) => <Button {...props}>Datei hochladen</Button>}
        </FileButton>
    );
}
