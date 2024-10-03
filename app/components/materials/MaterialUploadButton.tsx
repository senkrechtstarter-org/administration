"use client";

import { Button, FileButton } from "@mantine/core";
import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { createMaterial } from "@/app/lib/actions";

export default function MaterialUploadButton() {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <FileButton
            multiple
            onChange={async (files) => {
                for (const file of files) {
                    // Upload files to vercel blob
                    const blob = await upload(file.name, file, {
                        access: "public",
                        handleUploadUrl: "/api/materials/upload",
                    });
                    // Create database entry
                    await createMaterial({
                        name: blob.pathname,
                        url: blob.url,
                    });
                }
            }}>
            {(props) => <Button {...props}>Datei hochladen</Button>}
        </FileButton>
    );
}
