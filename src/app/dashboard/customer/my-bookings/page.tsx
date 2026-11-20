import CustomerBookingsView from "@/components/dashboard/CustomerBookingsView";

// Bookings belong to the signed in customer, so the data is loaded in the browser
export const instant = false;

export default function MyBookingsPage() {
    return <CustomerBookingsView />;
}
