"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { BASE_URL } from "../config/api";
import { authFetch } from "../core/server";

export const getUser = async () => {
    const users = await auth.api.listUsers({
        query: {
            sortBy: "name",
            sortDirection: "desc",
            filterField: "userRole",
        },
        headers: await headers(),
    });
    return users;
};

export const getUserPremiumById = async (userId: string) => {
    const res = await authFetch(`${BASE_URL}/api/users/${userId}/premium`, {
        cache: "no-store",
    });
    return res.json();
};
