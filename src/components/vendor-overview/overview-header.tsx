import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OverviewHeader({ name }: { name: string }) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
                    Welcome, {name}.
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Here&apos;s what&apos;s happening with your wedding
                    business.
                </p>
            </div>

            <Button className="h-10">
                <Link href="/dashboard/vendor/services/new" className="inline-flex items-center gap-1.5">
                    <Plus size={15} />
                    Add service
                </Link>
            </Button>
        </div>
    );
}
