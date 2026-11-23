import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionNotice({ serviceCount }: { serviceCount: number }) {
    return (
        <div className="flex flex-col justify-between gap-4 rounded-lg bg-plum-tint p-5 sm:flex-row sm:items-center">
            <div>
                <h2 className="font-heading text-xl text-foreground">
                    A little room to grow.
                </h2>

                <p className="mt-2 text-xs text-muted-foreground">
                    You currently have {serviceCount} services. Visit your
                    subscription page to review your plan.
                </p>
            </div>

            <Button className="h-10 shrink-0 px-3 flex">
                <Link href="/dashboard/vendor/subscription" className="inline-flex items-center gap-1.5">
                    Explore Premium <ArrowUpRight size={14} />
                </Link>
            </Button>
        </div>
    );
}
