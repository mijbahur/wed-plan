import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OverviewHeader() {
    return (
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
                <h1 className="font-(--font-heading) text-3xl sm:text-4xl">
                    Your plans, coming together.
                </h1>
                <p className="mt-2 text-sm text-(--wp-ink-soft)">
                    Here&apos;s the latest on your service requests.
                </p>
            </div>
            <Button
                nativeButton={false}
                render={<Link href="/services" />}
                className="h-10 gap-2 px-5"
            >
                Explore services <ArrowUpRight size={14} />
            </Button>
        </header>
    );
}
