export const instant = false
import { getAllBookings } from "@/lib/api/booking";
import AdminBookingsView from "@/components/dashboard/AdminBookingsView";
import type { Booking } from "@/lib/types";

const AdminManageBookingPage = async () => {

    const bookings = await getAllBookings();
    return <AdminBookingsView bookings={bookings as Booking[]} />;
};

export default AdminManageBookingPage;