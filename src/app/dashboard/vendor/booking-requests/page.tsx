export const instant = false
import VendorBookingRequestsView from "@/components/dashboard/VendorBookingRequestsView";
import { getSession } from "@/lib/core/server";

const MyBookingPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ bookingId?: string | string[] }>;
}) => {
    const session = await getSession();
    const user = session?.user;
    const { bookingId } = await searchParams;

    return (
        <VendorBookingRequestsView
            vendorId={user?.id ?? ""}
            initialSelectedId={typeof bookingId === "string" ? bookingId : undefined}
        />
    );
};

export default MyBookingPage;
