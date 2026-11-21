"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FilterBar, { type FilterControl } from "@/components/dashboard/FilterBar";
import type { Booking, BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { respondToBooking } from "@/lib/action/booking";
import { toast } from "sonner";

type StatusFilter = "all" | BookingStatus;

const statusClass: Record<BookingStatus, string> = {
    pending: "bg-warning/10 text-warning",
    accepted: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
    cancelled: "bg-muted text-muted-foreground",
};

function formatDate(value?: string) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function AdminBookingsView({
    bookings,
}: {
    bookings: Booking[];
}) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<StatusFilter>("all");
    const [displayBookings, setDisplayBookings] = useState(bookings);
    const [selectedId, setSelectedId] = useState<string | null>(
        bookings[0]?._id ?? null,
    );
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const visible = useMemo(() => {
        const normalized = search.trim().toLowerCase();
        return displayBookings.filter((booking) => {
            const matchesSearch =
                !normalized ||
                booking.serviceName?.toLowerCase().includes(normalized) ||
                booking.customerName?.toLowerCase().includes(normalized) ||
                booking.email?.toLowerCase().includes(normalized) ||
                booking.eventLocation?.toLowerCase().includes(normalized);
            return matchesSearch && (status === "all" || booking.status === status);
        });
    }, [displayBookings, search, status]);

    const selected =
        visible.find((booking) => booking._id === selectedId) ?? visible[0];

    const filters: FilterControl[] = [
        {
            key: "status",
            label: "Filter by booking status",
            value: status,
            onChange: (value) => setStatus(value as StatusFilter),
            options: [
                { value: "all", label: "All statuses" },
                { value: "pending", label: "Pending" },
                { value: "accepted", label: "Accepted" },
                { value: "rejected", label: "Rejected" },
                { value: "cancelled", label: "Cancelled" },
            ],
        },
    ];

    const updateStatus = async (
        booking: Booking,
        status: "accepted" | "rejected",
    ) => {
        setUpdatingId(booking._id);
        try {
            await respondToBooking(booking._id, status);
            setDisplayBookings((current) =>
                current.map((item) =>
                    item._id === booking._id ? { ...item, status } : item,
                ),
            );
            toast.success(`Request ${status}`);
        } catch (e) {
            toast.error(e instanceof Error ? e.message : `Could not ${status} request`);
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="mx-auto max-w-7xl">
            <header>
                <h1 className="font-heading text-4xl font-medium">Manage bookings</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Every request, from first connection to celebration.
                </p>
            </header>

            <div className="mt-8">
                <FilterBar
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search customer or service"
                    filters={filters}
                />
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
                {visible.length} booking{visible.length === 1 ? "" : "s"}.
            </p>

            {visible.length === 0 ? (
                <div className="mt-4 rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">
                    No bookings match these filters.
                </div>
            ) : (
                <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,.95fr)]">
                    <div className="max-h-150 overflow-y-auto rounded-xl border border-border bg-card">
                        {visible.map((booking) => (
                            <button
                                key={booking._id}
                                type="button"
                                onClick={() => setSelectedId(booking._id)}
                                className={cn(
                                    "grid w-full grid-cols-[minmax(0,1fr)_120px_90px] gap-4 border-b border-border px-5 py-5 text-left transition-colors last:border-b-0",
                                    selected?._id === booking._id
                                        ? "bg-primary/4"
                                        : "hover:bg-muted/30",
                                )}
                            >
                                <div>
                                    <p className="text-[9px] uppercase text-muted-foreground">
                                        Customer &amp; service
                                    </p>
                                    <p className="mt-3 text-sm font-medium">
                                        {booking.customerName || booking.userName || booking.email || "Customer"}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {booking.serviceName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase text-muted-foreground">Event date</p>
                                    <p className="mt-3 text-sm">{formatDate(booking.eventDate)}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase text-muted-foreground">Status</p>
                                    <Badge className={cn("mt-3 capitalize", statusClass[booking.status])}>
                                        {booking.status}
                                    </Badge>
                                </div>
                            </button>
                        ))}
                    </div>

                    {selected && (
                        <aside className="h-fit rounded-xl border border-border bg-card p-6">
                            <p className="text-[9px] uppercase text-muted-foreground">
                                Booking #{selected._id.slice(-6)}
                            </p>
                            <h2 className="mt-3 font-heading text-2xl">Booking details</h2>
                            <dl className="mt-7 space-y-5 text-sm">
                                <div>
                                    <dt className="text-[9px] uppercase text-muted-foreground">Customer</dt>
                                    <dd className="mt-2 font-medium">
                                        {selected.customerName || selected.userName || selected.email || "Customer"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-[9px] uppercase text-muted-foreground">Service</dt>
                                    <dd className="mt-2">{selected.serviceName}</dd>
                                </div>
                                <div>
                                    <dt className="text-[9px] uppercase text-muted-foreground">Event date</dt>
                                    <dd className="mt-2">{formatDate(selected.eventDate)}</dd>
                                </div>
                                <div>
                                    <dt className="text-[9px] uppercase text-muted-foreground">Event location</dt>
                                    <dd className="mt-2">{selected.eventLocation}</dd>
                                </div>
                            </dl>
                            {selected.message && (
                                <blockquote className="mt-6 rounded-lg bg-muted/50 px-5 py-4 text-sm leading-6 text-muted-foreground">
                                    “{selected.message}”
                                </blockquote>
                            )}
                            {selected.status === "pending" ? (
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Button
                                        type="button"
                                        onClick={() => updateStatus(selected, "accepted")}
                                        disabled={updatingId === selected._id}
                                    >
                                        Accept request
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
