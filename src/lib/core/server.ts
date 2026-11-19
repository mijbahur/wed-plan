import { redirect } from "next/navigation"

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