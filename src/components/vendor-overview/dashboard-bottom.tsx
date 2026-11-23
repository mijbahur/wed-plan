import type { Booking, VendorService } from "@/lib/types";

export default function DashboardBottom({
    bookings,
    services,
}: {
    bookings: Booking[];
    services: VendorService[];
}) {
    const bookingStatuses = ["pending", "accepted", "rejected", "cancelled"] as const;

    return (
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <section className="rounded-lg border border-border bg-card p-5">
                <h2 className="font-heading text-xl text-foreground">Booking overview</h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {bookingStatuses.map((status) => (
                        <div key={status} className="rounded-md bg-muted/40 p-3">
                            <p className="text-xs capitalize text-muted-foreground">{status}</p>
                            <p className="mt-2 text-xl font-semibold text-foreground">
                                {bookings.filter((booking) => booking.status === status).length}
                            </p>
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">You have {services.length} services listed.</p>
            </section>

            <section className="rounded-lg bg-beige p-5">
                <h2 className="font-heading text-xl text-foreground">
                    A thoughtful little tip
                </h2>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    Keep the conversation going. Responding to pending requests
                    promptly helps couples plan with confidence.
                </p>
            </section>
        </div>
    );
}
