"use client";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingBlock } from "@/components/states";
import { useRequireAuth } from "@/hooks/use-require-auth";

export default function PaymentCancelPage() {
    const { session, isPending } = useRequireAuth();
    if (isPending || !session) return <LoadingBlock />;

    return (
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
            <XCircle className="mx-auto size-14 text-destructive" />
            <h1 className="mt-6 text-5xl">Payment cancelled</h1>
            <p className="mt-2 text-muted-foreground">
                No worries, you have not been charged. You can upgrade whenever
                you are ready.
            </p>
            <Button className="mt-8">
                <Link href="/dashboard/vendor/subscription">Back to Subscription</Link>
            </Button>
        </div>
    );
}
