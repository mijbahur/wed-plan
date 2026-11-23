import type { Booking, VendorService } from "@/lib/types";

export default function OverviewStats({
    services,
    bookings,
}: {
    services: VendorService[];
    bookings: Booking[];
}) {
    const stats = [
        { label: "Total services", value: services.length, description: "Your complete collection" },
        { label: "Active services", value: services.filter((service) => service.isActive && service.status === "approved").length, description: "Approved and available" },
        { label: "Pending requests", value: bookings.filter((booking) => booking.status === "pending").length, description: "Ready for your response" },
        { label: "Accepted bookings", value: bookings.filter((booking) => booking.status === "accepted").length, description: "Confirmed bookings" },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-card p-4"
                >
                    <p className="text-xs text-muted-foreground">
                        {stat.label}
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-foreground">
                        {stat.value}
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                        {stat.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
