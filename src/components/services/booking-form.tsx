"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { createBooking } from "@/lib/api/booking";
import type { CreateBookingInput, Service } from "@/lib/types";

export default function BookingForm({ service }: { service: Service }) {
    const router = useRouter();
    const { session, isPending } = useRequireAuth();
    const [submitting, setSubmitting] = useState(false);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setSubmitting(true);
        try {
            const booking = await createBooking({
                serviceId: service._id,
                serviceName: service.serviceName,
                customerName: session?.user.name || "",
                serviceImage: service.images?.[0],
                eventDate: String(form.get("eventDate")),
                eventLocation: String(form.get("eventLocation")),
                message: String(form.get("message") || ""),
                customerId: session?.user.id,
                email: session?.user.email,
            } as CreateBookingInput);
            console.log("booking", booking);
            if (booking.success === true) {
                toast.success("Booking request sent");
                router.push("/dashboard/customer");
            }
        } catch {
            toast.error("Unable to send booking request");
        } finally {
            setSubmitting(false);
        }
    }

    if (isPending || !session) return null;

    return (
        <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 md:p-8">
            <h2 className="text-2xl">Your event details</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm">
                    Event date <span className="text-destructive">*</span>
                    <Input name="eventDate" type="date" required className="mt-2 h-11" />
                </label>
                <label className="text-sm">
                    Event location <span className="text-destructive">*</span>
                    <Input
                        name="eventLocation"
                        required
                        placeholder="Charleston, South Carolina"
                        className="mt-2 h-11"
                    />
                </label>
            </div>
            <label className="mt-5 block text-sm">
                Additional message
                <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell the vendor about your celebration..."
                    className="mt-2 w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
            </label>
            <p className="mt-6 text-xs text-muted-foreground">
                Requesting as {session.user.name} · {session.user.email}
            </p>
            <Button type="submit" disabled={submitting} className="mt-6 h-11 w-full">
                {submitting ? "Sending request..." : "Send booking request"}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
                Your request will be pending until the vendor responds.
            </p>
        </form>
    );
}
