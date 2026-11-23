import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Booking } from "@/lib/types";

function formatDate(value: string) {
    const date = new Date(`${value.slice(0, 10)}T00:00:00`);
    return Number.isNaN(date.getTime())
        ? "Date not set"
        : date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          });
}

export default function NextEvent({ booking }: { booking: Booking }) {
    return (
        <section className="flex flex-col justify-between gap-4 rounded-lg bg-plum-tint p-5 sm:flex-row sm:items-center sm:px-6">
            <div>
                <h2 className="font-(--font-heading) text-2xl">
                    Your next event
                </h2>
                <p className="mt-2 text-xs text-(--wp-ink-soft)">
                    {formatDate(booking.eventDate)}
                </p>
            </div>
            <Button
                nativeButton={false}
                render={<Link href="/dashboard/customer/my-bookings" />}
                className="h-9 gap-2 px-5"
            >
                View bookings <ArrowUpRight size={13} />
            </Button>
        </section>
    );
}
