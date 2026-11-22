import Link from "next/link";

import { Button } from "@/components/ui/button";
import VendorServicesSummary from "@/components/dashboard/VendorServicesSummary";
import VendorServicesTable from "@/components/dashboard/VendorServicesTable";
import { getServices } from "@/lib/api/service";
import { VendorService } from "@/lib/types";
import { getSession } from "@/lib/core/server";

export const instant = false;
export default async function ManageServicesPage() {
    const session = await getSession();
    const user = session?.user;

    const services: VendorService[] = await getServices(`vendorId=${user?.id}`);

    return (
        <div className="mx-auto max-w-7xl">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="font-heading text-3xl font-medium text-ink">
                        My services
                    </h1>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Beautiful offerings, thoughtfully managed.
                    </p>
                </div>
                <Button
                    nativeButton={false}
                    render={
                        <Link href="/dashboard/vendor/add-service">
                            + Add service
                        </Link>
                    }
                    className="h-9 px-4"
                />
            </header>

            <VendorServicesSummary
                services={services}
            />

            <VendorServicesTable
                key={services[0]?._id || "default"}
                services={services}
            />

            <section className="mt-6 rounded-xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-medium text-ink">
                    Great things take a little care.
                </h2>
                <p className="mt-3 max-w-2xl text-[11px] leading-5 text-muted-foreground">
                    New services are reviewed before they appear in search.
                    Approved services only appear when availability is active.
                    Editing a service may require a new review. You can manage
                    your availability at any time.
                </p>
            </section>
        </div>
    );
}
