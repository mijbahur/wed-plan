"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Booking, BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import CancelBookingDialog from "./CancelBookingDialog";

const statusStyles: Record<BookingStatus, string> = {
    pending: "bg-warning/10 text-warning",
    accepted: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
    cancelled: "bg-muted text-muted-foreground",
};

function formatDate(value?: string) {
    if (!value) return "—";
    const [year, month, day] = value.slice(0, 10).split("-").map(Number);
    if (!year || !month || !day) return "—";

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function CustomerBookingsTable({
    bookings,
    onChanged,
}: {
    bookings: Booking[];
    onChanged: () => void;
}) {
    return (
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[36%] pl-5 text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                            Service &amp; vendor
                        </TableHead>
                        <TableHead className="hidden text-[10px] font-medium tracking-wider uppercase text-muted-foreground sm:table-cell">
                            Event date
                        </TableHead>
                        <TableHead className="hidden text-[10px] font-medium tracking-wider uppercase text-muted-foreground md:table-cell">
                            Location
                        </TableHead>
                        <TableHead className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                            Status
                        </TableHead>
                        <TableHead className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking._id} className="h-20">
                            <TableCell className="pl-5">
                                <div className="flex items-center gap-3">
                                    {booking.serviceImage ? (
                                        <Image
                                            src={booking.serviceImage}
                                            alt=""
                                            width={44}
                                            height={44}
                                            className="size-11 shrink-0 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                                            <CalendarDays className="size-5 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {booking.serviceName}
                                        </p>
                                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                                            Requested{" "}
                                            {formatDate(booking.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden text-xs sm:table-cell">
                                {formatDate(booking.eventDate)}
                            </TableCell>
                            <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                                {booking.eventLocation}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    className={cn(
                                        "capitalize",
                                        statusStyles[booking.status],
                                    )}
                                >
                                    {booking.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col items-start gap-1.5">
                                    <Link
                                        href={`/services/${booking.serviceId}`}
                                        className="inline-flex items-center gap-1 text-xs hover:text-primary"
                                    >
                                        View details
                                        <ArrowUpRight className="size-3" />
                                    </Link>
                                    {booking.status === "pending" && (
                                        <CancelBookingDialog
                                            booking={booking}
                                            onChanged={onChanged}
                                        />
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
