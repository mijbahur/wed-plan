import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    CalendarCheck,
    CheckCircle2,
    Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/states";
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

export default function LatestBookings({ bookings }: { bookings: Booking[] }) {
    return (
        <section className="rounded-lg border border-(--wp-line) bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-(--font-heading) text-xl">
                    Your latest bookings
                </h2>
                <Link
                    href="/dashboard/customer/my-bookings"
                    className="inline-flex items-center gap-1 text-[11px] text-plum hover:underline"
                >
                    View all <ArrowUpRight size={12} />
                </Link>
            </div>

            {bookings.length === 0 ? (
                <EmptyState
                    title="No bookings yet"
                    text="When you request a service, your booking and its status will appear here."
                    action={
                        <Button
                            nativeButton={false}
                            render={<Link href="/services" />}
                        >
                            Explore services
                        </Button>
                    }
                />
            ) : (
                <div className="divide-y divide-(--wp-line)">
                    {bookings.slice(0, 4).map((booking) => (
                        <div
                            key={booking._id}
                            className="flex items-center gap-3 py-3"
                        >
                            {booking.serviceImage ? (
                                <Image
                                    src={booking.serviceImage}
                                    alt=""
                                    width={48}
                                    height={48}
                                    unoptimized
                                    className="size-12 rounded-md object-cover"
                                />
                            ) : (
                                <div className="flex size-12 items-center justify-center rounded-md bg-beige">
                                    <CalendarCheck size={18} />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-medium">
                                    {booking.serviceName}
                                </p>
                                <p className="mt-1 text-[10px] text-(--wp-ink-soft)">
                                    Event date: {formatDate(booking.eventDate)}
                                </p>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-beige px-3 py-1 text-[10px] capitalize">
                                {booking.status === "accepted" ? (
                                    <CheckCircle2 size={11} />
                                ) : (
                                    <Clock3 size={11} />
                                )}
                                {booking.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
