"use server";

import { BASE_URL } from "@/lib/config/api";
import { authFetch, protectedMutation } from "@/lib/core/server";
import type { Profile, ProfileUpdateInput } from "@/lib/types";

type ProfileResponse = {
    success: boolean;
    data?: { profile: Profile };
    message?: string;
    error?: { message?: string };
};

export async function getMyProfile(): Promise<Profile> {
    const response = await authFetch(`${BASE_URL}/api/profile`, { cache: "no-store" });
    const result = (await response.json()) as ProfileResponse;
    if (!response.ok || !result.data?.profile) {
        throw new Error(result.message ?? "Could not load your profile.");
    }
    return result.data.profile;
}

export async function updateMyProfile(data: Partial<ProfileUpdateInput>): Promise<Profile> {
    const result = (await protectedMutation(
        `${BASE_URL}/api/profile`,
        "PATCH",
        data,
    )) as ProfileResponse;
    if (!result.data?.profile) {
        throw new Error(result.error?.message ?? result.message ?? "Could not update your profile.");
    }
    return result.data.profile;
}
