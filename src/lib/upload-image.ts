
export interface UploadImageResponse {
    success: boolean;
    data?: {
        url?: string;
    };
    error?: {
        message?: string;
    };
}

export async function uploadImage(file: File): Promise<string> {
    if (file.size === 0) {
        throw new Error("Please choose a valid image.");
    }

    if (file.size > 5 * 1024 * 1024) {
        throw new Error("The image must be 5 MB or smaller.");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG, and WebP images are allowed.");
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    const response = await fetch("/api/uploads/public", {
        method: "POST",
        body: uploadData,
    });
    console.log("Upload image response:", response);

    const result = (await response.json()) as UploadImageResponse;

    if (!response.ok || !result.success || !result.data?.url) {
        throw new Error(
            result.error?.message ?? "Could not upload the image.",
        );
    }

    return result.data.url;
}
