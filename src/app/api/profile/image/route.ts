import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { BASE_URL } from "@/lib/config/api";

export async function POST(request: Request) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.session.token) {
        return NextResponse.json(
            { success: false, error: { message: "Sign in to update your profile image." } },
            { status: 401 },
        );
    }

    const formData = await request.formData();
    const image = formData.get("image");
    if (!(image instanceof File)) {
        return NextResponse.json(
            { success: false, error: { message: "Choose an image to upload." } },
            { status: 422 },
        );
    }

    const uploadData = new FormData();
    uploadData.append("image", image);
    try {
        const response = await fetch(`${BASE_URL}/api/uploads/image`, {
            method: "POST",
            headers: { authorization: `Bearer ${session.session.token}` },
            body: uploadData,
            cache: "no-store",
        });
        const result = await response.json();
        return NextResponse.json(result, { status: response.status });
    } catch {
        return NextResponse.json(
            { success: false, error: { message: "Image upload service is unavailable. Try again." } },
            { status: 502 },
        );
    }
}
