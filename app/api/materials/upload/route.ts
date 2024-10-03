import { createMaterial } from "@/app/lib/actions";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;
    console.log("POST body", body);

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (
                pathname,
                /* clientPayload */
            ) => {
                // Generate a client token for the browser to upload the file
                // ⚠️ Authenticate and authorize users before generating the token.
                // Otherwise, you're allowing anonymous uploads.

                return {
                    tokenPayload: JSON.stringify({
                        name:
                            "pathname" in body.payload
                                ? body.payload.pathname
                                : "",
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Get notified of client upload completion
                // ⚠️ This will not work on `localhost` websites,
                // Use ngrok or similar to get the full upload flow

                console.log("blob upload completed", blob, tokenPayload);

                try {
                    // Run any logic after the file upload completed

                    const { name } = JSON.parse(tokenPayload || "{}");
                    console.log("Name in tokenpayload: ", name);
                    console.log("Blob url: ", blob.url);
                    await createMaterial({
                        name: name,
                        url: blob.url,
                    });
                } catch (error) {
                    throw new Error("Could not create new material entity");
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The webhook will retry 5 times waiting for a 200
        );
    }
}
