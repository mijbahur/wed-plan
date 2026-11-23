
export interface UploadImageResponse {
    success: boolean;
    data?: {
        url?: string;
    };
    error?: {
        message?: string;
    };
}

function validateImage(file: File) {
    if (file.size === 0) throw new Error("Please choose a valid image.");
    if (file.size > 5 * 1024 * 1024) {
        throw new Error("The image must be 5 MB or smaller.");
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Only JPG, PNG, and WebP images are allowed.");
    }
}

export async function uploadImage(file: File): Promise<string> {
    validateImage(file);

    const uploadData = new FormData();
    uploadData.append("image", file);

    const response = await fetch("/api/uploads/public", {
        method: "POST",
        body: uploadData,
    });

    const result = (await response.json()) as UploadImageResponse;

    if (!response.ok || !result.success || !result.data?.url) {
        throw new Error(
            result.error?.message ?? "Could not upload the image.",
        );
    }

    return result.data.url;
}

export async function uploadProfileImage(file: File): Promise<string> {
    validateImage(file);

    const uploadData = new FormData();
    uploadData.append("image", file);
    const response = await fetch("/api/profile/image", {
        method: "POST",
        body: uploadData,
    });
    const result = (await response.json()) as UploadImageResponse;

    if (!response.ok || !result.success || !result.data?.url) {
        throw new Error(result.error?.message ?? "Could not upload your profile image.");
    }
    return result.data.url;
}
