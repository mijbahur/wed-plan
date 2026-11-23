import DashboardBottom from "@/components/vendor-overview/dashboard-bottom";
import NewestConnections from "@/components/vendor-overview/newest-connections";
import OverviewHeader from "@/components/vendor-overview/overview-header";
import OverviewStats from "@/components/vendor-overview/overview-stats";
import SubscriptionNotice from "@/components/vendor-overview/subscription-notice";
import Reveal from "@/components/ui/reveal";
import { getVendorBookings } from "@/lib/api/booking";
import { getServices } from "@/lib/api/service";
import { getSession } from "@/lib/core/server";
import type { Booking, VendorService } from "@/lib/types";

export const instant = false;
const VendorDashboardPage = async () => {
    const data = await getSession();
    const vendorId = data?.user?.id ?? "";

    let services: VendorService[] = [];
    let bookings: Booking[] = [];
    let errorMessage = "";

    try {
        services = await getServices(`vendorId=${data?.user?.id}`);
    } catch (error) {
        errorMessage =
            error instanceof Error ? error.message : "Failed to load services.";
    }
    try {
        bookings = await getVendorBookings(vendorId);
    } catch (error) {
        errorMessage =
            error instanceof Error ? error.message : "Failed to load bookings.";
    }

    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <Reveal>
                    <OverviewHeader name={data?.user?.name ?? "Vendor"} />
                </Reveal>
                <Reveal delay={0.08}>
                    <OverviewStats services={services} bookings={bookings} />
                </Reveal>
                <Reveal delay={0.16}>
                    <SubscriptionNotice serviceCount={services.length} />
                </Reveal>
                {errorMessage && (
                    <Reveal>
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{errorMessage}</span>
                        </div>
                    </Reveal>
                )}
                <Reveal delay={0.24}>
                    <NewestConnections bookings={bookings} />
                </Reveal>
                <Reveal delay={0.32}>
                    <DashboardBottom bookings={bookings} services={services} />
                </Reveal>
            </div>
        </main>
    );
};

export default VendorDashboardPage;
