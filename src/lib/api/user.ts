"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { BASE_URL } from "../config/api";

export const getUser = async () => {
    const users = await auth.api.listUsers({
        query: {
            // searchField: "name", // The field to search in, defaults to email. Can be `email` or `name`.
            sortBy: "name", // The field to sort by.
            sortDirection: "desc", // The direction to sort by.
            filterField: "userRole", // The field to filter by.
            // filterValue: "", // The value to filter by.
            // filterOperator: "eq", // The operator to use for the filter.
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
    return users;
};

export const getUserPremiumById = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/premium`, {
        cache: "no-store",
    });
    return res.json();
};
