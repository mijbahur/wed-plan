import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Booking } from "@/lib/types";
import { CalendarDays } from "lucide-react";
import { cancelBooking } from "@/lib/action/booking";

export default function CancelBookingDialog({
    booking,
    onChanged,
}: {
    booking: Booking;
    onChanged: () => void;
}) {
    const [open, setOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    async function handleCancel() {
        setCancelling(true);
        try {
            const response = await cancelBooking(booking._id);
            if (!response.success) {
                toast.error(response.message ?? "Could not cancel the request");
                return;
            }

            toast.success("Booking request cancelled");
            setOpen(false);
            onChanged();
        } catch {
            toast.error("Could not cancel the request");
        } finally {
            setCancelling(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        className="h-auto p-0 text-xs font-normal text-[#B94E43] hover:bg-transparent hover:text-[#8f3a31]"
                    />
                }
            >
                Cancel request
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                        <CalendarDays />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                        Cancel this booking request?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Your request to {booking.serviceName} will be cancelled.
                        You can always send a new request later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Keep request
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={cancelling}
                        onClick={handleCancel}
                    >
                        {cancelling ? "Cancelling..." : "Cancel request"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
