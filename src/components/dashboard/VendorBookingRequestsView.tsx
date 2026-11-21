"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/states";
import { getVendorBookings, respondToBooking } from "@/lib/api/booking";
import type { Booking, BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Tab = "all" | BookingStatus;
type SortOption = "newest" | "oldest" | "event-soonest";

const tabs: { value: Tab; label: string }[] = [
    { value: "all", label: "All requests" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
];

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

const statusClass: Record<BookingStatus, string> = {
    pending: "bg-warning/10 text-warning",
    accepted: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
    cancelled: "bg-muted text-muted-foreground",
};

export default function VendorBookingRequestsView({
    vendorId,
}: {
    vendorId: string;
}) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [tab, setTab] = useState<Tab>("all");
    const [sort, setSort] = useState<SortOption>("newest");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let active = true;

        getVendorBookings(vendorId)
            .then((data) => {
                if (!active) return;
                setBookings(data);
                setError(null);
                setSelectedId((current) =>
                    current && data.some((item) => item._id === current)
                        ? current
                        : data[0]?._id ?? null,
                );
            })
            .catch((e) => {
                if (!active) return;
                setError(e instanceof Error ? e.message : "Failed to load requests");
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [vendorId, reloadKey]);

    const counts = useMemo(() => {
        const result: Record<Tab, number> = {
            all: bookings.length,
            pending: 0,
            accepted: 0,
            rejected: 0,
            cancelled: 0,
        };
        bookings.forEach((booking) => {
            result[booking.status] += 1;
        });
        return result;
    }, [bookings]);

    const visible = useMemo(() => {
        const filtered =
            tab === "all" ? bookings : bookings.filter((item) => item.status === tab);

        return [...filtered].sort((a, b) => {
            if (sort === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            if (sort === "event-soonest") {
                return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [bookings, sort, tab]);

    const selected =
        visible.find((booking) => booking._id === selectedId) ?? visible[0];

    const updateStatus = async (
        booking: Booking,
        status: "accepted" | "rejected",
    ) => {
        setUpdatingId(booking._id);
        try {
            await respondToBooking(booking._id, status);
            setBookings((current) =>
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

    if (loading) return <LoadingBlock text="Loading booking requests..." />;
    if (error) {
        return (
            <ErrorState
                message={error}
                onRetry={() => {
                    setLoading(true);
                    setReloadKey((key) => key + 1);
                }}
            />
        );
    }

    return (
        <div className="mx-auto max-w-7xl">
            <header>
                <h1 className="font-heading text-4xl font-medium">Booking requests</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Turn new connections into unforgettable celebrations.
                </p>
            </header>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-b border-border">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {tabs.map((item) => {
                        const active = tab === item.value;
                        return (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setTab(item.value)}
                                aria-pressed={active}
                                className={cn(
                                    "relative -mb-px pb-3 text-sm transition-colors",
                                    active
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                {item.label} <span className="ml-1">{counts[item.value]}</span>
                                {active && (
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
                    <SelectTrigger className="mb-2 h-9 min-w-40" aria-label="Sort requests">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest request</SelectItem>
                        <SelectItem value="oldest">Oldest request</SelectItem>
                        <SelectItem value="event-soonest">Event date soonest</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {visible.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title={`No ${tab === "all" ? "" : `${tab} `}booking requests`}
                        text="New requests for your services will appear here."
                    />
                </div>
            ) : (
                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,.95fr)]">
                    <div className="overflow-hidden rounded-xl border border-border bg-card">
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
                                    <p className="text-xs text-muted-foreground uppercase">Customer &amp; service</p>
                                    <p className="mt-3 text-sm font-medium">
                                        {booking.customerName || "Customer"}
                                    </p>
                                    <p className="mt-3 text-sm font-medium">
                                        {booking.userName || booking.email || "Customer"}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {booking.serviceName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase">Event date</p>
                                    <p className="mt-3 text-sm">{formatDate(booking.eventDate)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase">Status</p>
                                    <p className={cn("mt-3 inline-flex rounded-full px-3 py-1 text-xs capitalize", statusClass[booking.status])}>
                                        {booking.status}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {selected && (
                        <aside className="h-fit rounded-xl border border-border bg-card p-6">
                            <p className="text-xs text-muted-foreground uppercase">
                                Request #{selected._id.slice(-6)}
                            </p>
                            <h2 className="mt-3 font-heading text-2xl">A new connection</h2>

                            <dl className="mt-7 space-y-5 text-sm">
                                <div>
                                    <dt className="text-xs text-muted-foreground uppercase">Customer</dt>
                                    <dd className="mt-2 font-medium">
                                        {selected.userName || selected.email || "Customer"}
                                    </dd>
                                    {selected.email && (
                                        <dd className="mt-1 text-xs text-muted-foreground">{selected.email}</dd>
                                    )}
                                </div>
                                <div>
                                    <dt className="text-xs text-muted-foreground uppercase">Service</dt>
                                    <dd className="mt-2">{selected.serviceName}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-muted-foreground uppercase">Event date</dt>
                                    <dd className="mt-2">{formatDate(selected.eventDate)}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-muted-foreground uppercase">Event location</dt>
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
                                        onClick={() => updateStatus(selected, "accepted")}
                                        disabled={updatingId === selected._id}
                                    >
                                        Accept request
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => updateStatus(selected, "rejected")}
                                        disabled={updatingId === selected._id}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            ) : (
                                <p className={cn("mt-6 inline-flex rounded-full px-3 py-1 text-xs capitalize", statusClass[selected.status])}>
                                    {selected.status}
                                </p>
                            )}
                        </aside>
                    )}
                </div>
            )}
        </div>
    );
}
