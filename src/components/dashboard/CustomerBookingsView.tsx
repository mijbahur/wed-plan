"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/states";
import CustomerBookingsTable from "@/components/dashboard/CustomerBookingsTable";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { getMyBookings } from "@/lib/api/booking";
import type { Booking, BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "all" | BookingStatus;

const tabs: { value: Tab; label: string }[] = [
    { value: "all", label: "All bookings" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "cancelled", label: "Cancelled" },
];

export default function CustomerBookingsView() {
    const { session, isPending } = useRequireAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tab, setTab] = useState<Tab>("all");
    const [reloadKey, setReloadKey] = useState(0);

    const customerId = session?.user.id;

    useEffect(() => {
        if (!customerId) return;
        let active = true;

        (async () => {
            try {
                const data = await getMyBookings(customerId);
                if (!active) return;
                setBookings(data);
                setError(null);
            } catch (e) {
                if (!active) return;
                setError(
                    e instanceof Error
                        ? e.message
                        : "Failed to load your bookings",
                );
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [customerId, reloadKey]);

    // Used by retry and after a request is cancelled
    const reload = () => {
        setLoading(true);
        setError(null);
        setReloadKey((key) => key + 1);
    };

    const counts = useMemo(() => {
        const result: Record<Tab, number> = {
            all: bookings.length,
            pending: 0,
            accepted: 0,
            rejected: 0,
            cancelled: 0,
        };

        for (const booking of bookings) {
            result[booking.status] += 1;
        }

        return result;
    }, [bookings]);

    const visible =
        tab === "all" ? bookings : bookings.filter((b) => b.status === tab);

    if (isPending || !session) {
        return <LoadingBlock text="Loading your bookings..." />;
    }

    return (
        <div className="mx-auto max-w-7xl">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-medium">
                        My bookings
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        All your wedding people, and every little update.
                    </p>
                </div>
                <Button
                    nativeButton={false}
                    render={<Link href="/services" />}
                    className="h-10 gap-2 px-5"
                >
                    Explore services
                    <ArrowUpRight className="size-4" />
                </Button>
            </header>

            {/* status filters */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-border">
                {tabs.map((item) => {
                    const active = tab === item.value;

                    return (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => setTab(item.value)}
                            aria-pressed={active}
                            className={cn(
                                "relative -mb-px flex items-center gap-2 pb-3 text-sm transition-colors",
                                active
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {item.label}
                            <span
                                className={cn(
                                    "text-xs",
                                    active
                                        ? "text-primary"
                                        : "text-muted-foreground",
                                )}
                            >
                                {counts[item.value]}
                            </span>
                            {active && (
                                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>

            {loading ? (
                <LoadingBlock text="Loading your bookings..." />
            ) : error ? (
                <div className="mt-6">
                    <ErrorState message={error} onRetry={reload} />
                </div>
            ) : visible.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title={
                            tab === "all"
                                ? "No bookings yet"
                                : `No ${tab} bookings`
                        }
                        text={
                            tab === "all"
                                ? "When you request a service, it will show up here so you can track every update."
                                : "Try another filter to see the rest of your requests."
                        }
                        action={
                            <Button
                                nativeButton={false}
                                render={<Link href="/services" />}
                                className="h-10 px-5"
                            >
                                Explore services
                            </Button>
                        }
                    />
                </div>
            ) : (
                <CustomerBookingsTable bookings={visible} onChanged={reload} />
            )}
        </div>
    );
}
