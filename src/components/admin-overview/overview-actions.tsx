import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function OverviewActions() {
    return (
        <section className="rounded-lg bg-plum-tint p-5">
            <h2 className="font-(--font-heading) text-2xl">
                Manage the platform
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
                <Link
                    href="/dashboard/admin/users"
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-plum px-4 text-xs font-medium text-white hover:bg-plum-dark"
                >
                    Manage users <ArrowUpRight size={13} />
                </Link>
                <Link
                    href="/dashboard/admin/services"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-(--wp-line) bg-white px-4 text-xs font-medium hover:bg-cream"
                >
                    Review services <ArrowUpRight size={13} />
                </Link>
            </div>
        </section>
    );
}
