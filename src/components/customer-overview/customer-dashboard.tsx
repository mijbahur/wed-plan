"use client";

import { useEffect, useMemo, useState } from "react";
import { ErrorState, LoadingBlock } from "@/components/states";
import Reveal from "@/components/ui/reveal";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { getMyBookings } from "@/lib/api/booking";
import type { Booking } from "@/lib/types";
import LatestBookings from "./latest-bookings";
import NextEvent from "./next-event";
import OverviewHeader from "./overview-header";
import OverviewStats from "./overview-stats";

export default function CustomerDashboard() {
    const { session, isPending } = useRequireAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);
    const customerId = session?.user.id;

    useEffect(() => {
        if (!customerId) return;

        let active = true;
        async function loadBookings() {
            try {
                const result = await getMyBookings(customerId as string);
                if (!active) return;
                setBookings(result);
                setError(null);
            } catch (cause) {
                if (!active) return;
                setError(
                    cause instanceof Error
                        ? cause.message
                        : "Failed to load your bookings.",
                );
            } finally {
                if (active) setLoading(false);
            }
        }

        void loadBookings();
        return () => {
            active = false;
        };
    }, [customerId, reloadKey]);

    const counts = useMemo(
        () => ({
            total: bookings.length,
            pending: bookings.filter((booking) => booking.status === "pending")
                .length,
            accepted: bookings.filter(
                (booking) => booking.status === "accepted",
            ).length,
            rejected: bookings.filter(
                (booking) => booking.status === "rejected",
            ).length,
        }),
        [bookings],
    );

    if (isPending || loading)
        return <LoadingBlock text="Loading your plans..." />;
    if (!session) return <LoadingBlock text="Taking you to sign in..." />;

    const nextBooking = [...bookings]
        .filter(
            (booking) =>
                booking.status === "pending" || booking.status === "accepted",
        )
        .sort((a, b) => a.eventDate.localeCompare(b.eventDate))[0];

    return (
        <main className="min-h-screen bg-cream px-4 py-8 text-(--wp-ink) sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-5">
                <Reveal>
                    <OverviewHeader />
                </Reveal>
                {error ? (
                    <Reveal delay={0.08}>
                        <ErrorState
                            message={error}
                            onRetry={() => setReloadKey((key) => key + 1)}
                        />
                    </Reveal>
                ) : (
                    <>
                        <Reveal delay={0.08}>
                            <OverviewStats counts={counts} />
                        </Reveal>
                        {nextBooking && (
                            <Reveal delay={0.16}>
                                <NextEvent booking={nextBooking} />
                            </Reveal>
                        )}
                        <Reveal delay={0.24}>
                            <LatestBookings bookings={bookings} />
                        </Reveal>
                    </>
                )}
            </div>
        </main>
    );
}
