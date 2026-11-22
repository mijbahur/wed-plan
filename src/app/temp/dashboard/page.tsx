"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoadingBlock } from "@/components/states";
import { useRequireAuth } from "@/hooks/use-require-auth";

export default function DashboardPage() {
    const { session, isPending } = useRequireAuth();
    const router = useRouter();

    useEffect(() => {
        if (isPending || !session) return;

        const role = session.user.userRole;
        if (role === "vendor") {
            router.replace("/dashboard/vendor");
        } else if (role === "customer") {
            router.replace("/dashboard/customer");
        } else if (role === "admin") {
            router.replace("/dashboard/admin");
        }
    }, [isPending, session, router]);

    return <LoadingBlock text="Opening your workspace..." />;
}
