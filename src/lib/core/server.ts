"use server";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getSession = async () => {
    // "use server";
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session;
}

export const protectedMutation = async (api: string, method: string, data?: unknown) => {
const res = await fetch(api, {
        method: method,
        headers: {
            'content-type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null
    })
    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized");
    }
    return res;
}