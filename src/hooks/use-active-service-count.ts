"use client";

import { useEffect, useState } from "react";
import { getServiceCount } from "@/lib/api/service";
import { authClient } from "@/lib/auth-client";

export function useActiveServiceCount() {
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const [count, setCount] = useState(0);
    const [error, setError] = useState<Error | null>(null);
    const userId = session?.user.id;

    useEffect(() => {
        if (isSessionPending || !userId) return;

        getServiceCount(`vendorId=${userId}&isActive=true`)
            .then((result) => setCount(result.data.count))
            .catch((requestError: Error) => setError(requestError));
    }, [isSessionPending, userId]);

    return {
        count: userId ? count : 0,
        isLoading: isSessionPending,
        error,
    };
}
