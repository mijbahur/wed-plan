"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
};

export const protectedMutation = async (
    api: string,
    method: string,
    data?: unknown,
) => {
    const res = await fetch(api, {
        method: method,
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${await getToken()}`,
        },
        body: data ? JSON.stringify(data) : null,
    });

    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized");
    }

    const result = await res.json();
    if (!res.ok) {
        throw new Error(
            result?.error?.message || result?.message || "Request failed",
        );
    }

    return result;
};

export const authFetch = async (api: string, options?: RequestInit) => {
    const token = await getToken();
    const res = await fetch(api, {
        ...options,
        headers: {
            ...options?.headers,
            "authorization": `Bearer ${token}`,
        },
    });
    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized");
    }
    return res;
};

export const getToken = async () => {
    const session = await getSession();
    if (!session || !session.session?.token) {
        redirect("/unauthorized");
    }
    return session?.session?.token;
};

export const requireRole = async (userRole: string) => {
    const session = await getSession();
    if (!session || session?.user.userRole !== userRole) {
        redirect("/unauthorized");
    }
    return session;
};
