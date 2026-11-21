"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FilterBar, { type FilterControl } from "@/components/dashboard/FilterBar";
import type { Service, ServiceStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { respondToServiceRequest } from "@/lib/action/service";
import { toast } from "sonner";

type StatusFilter = "all" | ServiceStatus;

const statusClass: Record<ServiceStatus, string> = {
    pending: "bg-warning/10 text-warning",
    approved: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
};

export default function AdminServicesView({
    services,
    onDelete,
}: {
    services: Service[];
    onDelete?: (service: Service) => void;
}) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState<StatusFilter>("all");
    const [displayServices, setDisplayServices] = useState(services);
    const [selectedId, setSelectedId] = useState<string | null>(
        services[0]?._id ?? null,
    );
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const categories = useMemo(
        () =>
            Array.from(
                new Set(
                    displayServices
                        .map((service) => service.category)
                        .filter(Boolean),
                ),
            ),
        [displayServices],
    );

    const visible = useMemo(() => {
        const normalized = search.trim().toLowerCase();
        return displayServices.filter((service) => {
            const matchesSearch =
                !normalized ||
                service.serviceName.toLowerCase().includes(normalized) ||
                service.location?.toLowerCase().includes(normalized);
            const matchesCategory =
                category === "all" || service.category === category;
            const matchesStatus = status === "all" || service.status === status;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [category, displayServices, search, status]);

    const selected =
        visible.find((service) => service._id === selectedId) ?? visible[0];

    const updateStatus = async (
        service: Service,
        nextStatus: "approved" | "rejected",
    ) => {
        setUpdatingId(service._id);
        try {
            await respondToServiceRequest(service._id, nextStatus);
            setDisplayServices((current) =>
                current.map((item) =>
                    item._id === service._id
                        ? { ...item, status: nextStatus }
                        : item,
                ),
            );
            toast.success(`Service ${nextStatus}`);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : `Could not ${nextStatus} service`,
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const filters: FilterControl[] = [
        {
            key: "category",
            label: "Filter by category",
            value: category,
            onChange: setCategory,
            options: [
                { value: "all", label: "All categories" },
                ...categories.map((value) => ({ value, label: value })),
            ],
        },
        {
            key: "status",
            label: "Filter by review status",
            value: status,
            onChange: (value) => setStatus(value as StatusFilter),
            options: [
                { value: "all", label: "All statuses" },
                { value: "pending", label: "Pending review" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
            ],
        },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <header>
                <h1 className="font-heading text-4xl font-medium">Manage services</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Thoughtful standards for every service on WedPlan.
                </p>
            </header>

            <div className="mt-8">
                <FilterBar
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search services or vendors"
                    filters={filters}
                />
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
                {visible.length} service{visible.length === 1 ? "" : "s"} awaiting a thoughtful review.
            </p>

            {visible.length === 0 ? (
                <div className="mt-4 rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">
                    No services match these filters.
                </div>
            ) : (
                <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,.95fr)]">
                    <div className="max-h-150 overflow-y-auto rounded-xl border border-border bg-card">
                        {visible.map((service) => (
                            <button
                                key={service._id}
                                type="button"
                                onClick={() => setSelectedId(service._id)}
                                className={cn(
                                    "grid w-full grid-cols-[minmax(0,1fr)_110px_90px] gap-4 border-b border-border px-5 py-5 text-left transition-colors last:border-b-0",
                                    selected?._id === service._id
                                        ? "bg-primary/4"
                                        : "hover:bg-muted/30",
                                )}
                            >
                                <div>
                                    <p className="text-[9px] uppercase text-muted-foreground">Service</p>
                                    <p className="mt-3 text-sm font-medium">{service.serviceName}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {service.vendor?.businessName || service.vendor?.name || service.vendorId}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase text-muted-foreground">Submitted</p>
                                    <p className="mt-3 text-xs text-muted-foreground">
                                        {service.createdAt
                                            ? new Date(service.createdAt).toLocaleDateString("en-US", {
                                                  month: "short",
                                                  day: "numeric",
                                                  year: "numeric",
                                              })
                                            : "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase text-muted-foreground">Status</p>
                                    <Badge className={cn("mt-3 capitalize", statusClass[service.status])}>
                                        {service.status}
                                    </Badge>
                                </div>
                            </button>
                        ))}
                    </div>

                    {selected && (
                        <aside className="h-fit overflow-hidden rounded-xl border border-border bg-card">
                            {selected.images?.[0] && (
                                <div className="relative h-52">
                                    <Image
                                        src={selected.images[0]}
                                        alt={selected.serviceName}
                                        fill
                                        sizes="(min-width: 1024px) 36vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <p className="text-[9px] uppercase text-muted-foreground">
                                    {selected.category}
                                </p>
                                <h2 className="mt-2 font-heading text-2xl">{selected.serviceName}</h2>
                                <p className="mt-2 text-sm font-medium">
                                    ${selected.price} / event
                                </p>
                                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                                    {selected.description}
                                </p>
                                <p className="mt-4 text-xs text-muted-foreground">
                                    {selected.location}
                                </p>

                                {selected.status === "pending" ? (
                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <Button
                                            type="button"
                                            onClick={() => updateStatus(selected, "approved")}
                                            disabled={updatingId === selected._id}
                                        >
                                            Approve service
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => updateStatus(selected, "rejected")}
                                            disabled={updatingId === selected._id}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                ) : (
                                    <Badge className={cn("mt-6 capitalize", statusClass[selected.status])}>
                                        {selected.status}
                                    </Badge>
                                )}

                                {onDelete && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="mt-3 h-8 px-0 text-xs text-destructive"
                                        onClick={() => onDelete(selected)}
                                    >
                                        Delete service
                                    </Button>
                                )}
                            </div>
                        </aside>
                    )}
                </div>
            )}

            <div className="mt-5 flex justify-end gap-2">
                <Button type="button" variant="outline" disabled>Previous</Button>
                <Button type="button" variant="outline" disabled>Next</Button>
            </div>
        </div>
    );
}
