import { BASE_URL } from "../config/api";

export const getUserPremiumById = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/premium`, {
        cache: "no-store",
    });
    return res.json();
};