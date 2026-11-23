export const instant = false;
import { getAllBookings } from "@/lib/api/booking";
import AdminBookingsView from "@/components/dashboard/AdminBookingsView";
import type { Booking } from "@/lib/types";
import Reveal from "@/components/ui/reveal";

const AdminManageBookingPage = async () => {
    const bookings = await getAllBookings();
    return (
        <Reveal>
            <AdminBookingsView bookings={bookings as Booking[]} />
        </Reveal>
    );
};

export default AdminManageBookingPage;
