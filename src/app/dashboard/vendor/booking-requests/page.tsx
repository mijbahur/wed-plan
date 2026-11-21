export const instant = false
import VendorBookingRequestsView from "@/components/dashboard/VendorBookingRequestsView";
import { getSession } from "@/lib/core/server";

const MyBookingPage = async () => {
    const session = await getSession();
    const user = session?.user;

    return (
        <VendorBookingRequestsView vendorId={user?.id ?? ""} />
    );
};

export default MyBookingPage;
