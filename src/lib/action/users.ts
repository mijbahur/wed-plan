"use server";

import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";
import { Role } from "../types";

export const updateUser = async (id: string, role: Role) => {
    return protectedMutation(`${BASE_URL}/api/users/${id}/role`, "PATCH", { role });
};

export const updateUserRole = updateUser;

export const updateUserStatus = async (id: string, isBlocked: boolean) => {
    return protectedMutation(
        `${BASE_URL}/api/users/${id}/block`,
        "PATCH",
        { isBlocked },
    );
};