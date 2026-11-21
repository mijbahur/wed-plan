import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { VendorService } from "@/lib/types";
import { Button } from "../ui/button";

export default function VendorServicesSummary({
    services,
}: {
    services: VendorService[];
}) {
    const activeCount = services.filter(
        (service) => service.isActive && service.status === "approved",
    ).length;
    const pendingCount = services.filter(
        (service) => service.status === "pending",
    ).length;
    const uniqueCategories = [
        ...new Set(services.map((service) => service.category)),
    ];
    return (
        <>
            <section className="mt-8 rounded-xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-medium text-ink">
                    Your collection, at a glance
                </h2>
                <p className="mt-1 text-[11px] text-muted-foreground">
                    Free plan · {activeCount} of 3 active services used. Pending
                    services are not visible to customers.
                </p>
            </section>
            <div className="mt-4 flex justify-between items-center sm:grid-cols-3">
                <div className="mt-6 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                        <Button
                            nativeButton={false}
                            variant="link"
                            render={
                                <span className="flex items-center gap-1" />
                            }
                        >
                            <strong className="font-medium text-ink">
                                All services
                            </strong>
                            <span className="ml-1 text-muted-foreground">
                                {services.length}
                            </span>
                        </Button>
                        <Button
                            nativeButton={false}
                            variant="link"
                            render={
                                <span className="inline-flex items-center gap-1 hover:underline" />
                            }
                        >
                            <span className="text-muted-foreground">
                                Active
                            </span>
                            <strong className="font-medium text-ink">
                                {activeCount}
                            </strong>
                        </Button>

                        <Button
                            nativeButton={false}
                            variant="link"
                            render={
                                <span className="flex items-center gap-1" />
                            }
                        >
                            <span className="text-muted-foreground">
                                Pending review
                            </span>
                            <strong className="ml-1 font-medium text-ink">
                                {pendingCount}
                            </strong>
                        </Button>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <Select defaultValue="all">
                        <SelectTrigger
                            className="h-9 min-w-36"
                            aria-label="Filter services"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key="all" value="all">
                                All Categories
                            </SelectItem>
                            {uniqueCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
}
