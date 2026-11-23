import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Booking } from "@/lib/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function formatDate(value: string) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "Date not set"
        : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function NewestConnections({ bookings }: { bookings: Booking[] }) {
    const newestBookings = [...bookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    return (
        <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="font-heading text-xl text-foreground">
                    Your newest connections
                </h2>

                <Link
                    href="/dashboard/vendor/booking-requests"
                    className="flex items-center gap-1 text-[11px] text-plum hover:underline"
                >
                    View all requests
                    <ArrowUpRight size={12} />
                </Link>
            </div>

            {newestBookings.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">No booking requests yet.</p>
            ) : (
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Event date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {newestBookings.map((booking) => {
                            const href = `/dashboard/vendor/booking-requests?bookingId=${encodeURIComponent(booking._id)}`;
                            return (
                                <TableRow key={booking._id} className="hover:bg-muted/40">
                                    <TableCell className="font-medium">
                                        <Link href={href} className="block">
                                            {booking.customerName || booking.userName || "Customer"}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={href} className="block">
                                            {booking.serviceName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={href} className="block">
                                            {formatDate(booking.eventDate)}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={href} className="block">
                                            {booking.eventLocation}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={href} className="inline-flex items-center gap-1 text-sm font-medium text-plum hover:underline">
                                            Review <ArrowUpRight size={12} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            )}
        </section>
    );
}
