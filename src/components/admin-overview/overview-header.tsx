import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function OverviewHeader() {
    return (
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
                <h1 className="font-(--font-heading) text-3xl sm:text-4xl">
                    Platform overview
                </h1>
                <p className="mt-2 text-sm text-(--wp-ink-soft)">
                    A clear view of the WedPlan community.
                </p>
            </div>
            <Link
                href="/dashboard/admin/transactions"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-plum px-5 text-xs font-medium text-white hover:bg-plum-dark"
            >
                View transactions <ArrowUpRight size={14} />
            </Link>
        </header>
    );
}
