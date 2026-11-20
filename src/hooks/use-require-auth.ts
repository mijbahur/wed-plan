"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Use this on private pages. If the user is not signed in,
// they are sent to /signin and come back here after login.
export function useRequireAuth() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace(`/signin?redirectTo=${encodeURIComponent(pathname)}`);
        }
    }, [isPending, session, router, pathname]);

    return { session, isPending };
}
