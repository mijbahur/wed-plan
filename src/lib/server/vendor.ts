import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getActiveServiceCount } from "@/lib/api/service";

export async function getCurrentVendorActiveServiceCount() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user.id) return 0;

    return getActiveServiceCount(session.user.id);
}
