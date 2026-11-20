"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/services/service-card";
import type { Service } from "@/lib/types";

export default function ServiceResults({ services }: { services: Service[] }) {
    const [sort, setSort] = useState("recommended");
    const activeServices = services.filter(
        (service) => service.isActive && service.status === "approved",
    );
    const sortedServices = useMemo(() => {
        return [...activeServices].sort((a, b) => {
            if (sort === "price_asc") return a.price - b.price;
            if (sort === "price_desc") return b.price - a.price;
            if (sort === "newest") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            return 0;
        });
    }, [activeServices, sort]);

    return (
        <>
            <div className="mt-5 flex items-center justify-between">
                <p className="text-sm">{activeServices.length} beautiful possibilities</p>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    Sort by:
                    <select
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                        className="rounded-md border bg-card px-2 py-1 text-foreground cursor-pointer"
                    >
                        <option value="recommended">Recommended</option>
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price: low to high</option>
                        <option value="price_desc">Price: high to low</option>
                    </select>
                </label>
            </div>

            {sortedServices.length ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {sortedServices.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            ) : (
                <div className="mt-8 rounded-lg border bg-card p-10 text-center text-muted-foreground">
                    No services found. Try adjusting your search.
                </div>
            )}

            <div className="mt-10 flex items-center justify-end gap-2">
                <Button variant="outline" size="icon-sm" aria-label="Previous page">
                    <ChevronLeft />
                </Button>
                <Button size="icon-sm">1</Button>
                <Button variant="outline" size="icon-sm">2</Button>
                <Button variant="outline" size="icon-sm" aria-label="Next page">
                    <ChevronRight />
                </Button>
            </div>
        </>
    );
}
