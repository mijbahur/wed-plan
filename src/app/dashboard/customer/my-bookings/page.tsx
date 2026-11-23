import CustomerBookingsView from "@/components/dashboard/CustomerBookingsView";
import Reveal from "@/components/ui/reveal";

// Bookings belong to the signed in customer, so the data is loaded in the browser
export const instant = false;
export default function MyBookingsPage() {
    return (
        <Reveal>
            <CustomerBookingsView />
        </Reveal>
    );
}
