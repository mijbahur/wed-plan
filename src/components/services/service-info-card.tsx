"use client";
import { MapPin, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/use-require-auth";

interface ServiceDetailsCardProps {
    service: Service;
}

export default function ServiceInfoCard({ service }: ServiceDetailsCardProps) {
    const router = useRouter();
    const { session } = useRequireAuth();
    const user = session?.user;

    const handelRequest = () => {
        if (!user) {
            router.push(`/signin?redirectTo=/services/${service._id}/book`);
            return;
        }
        if (user.role === "customer") {
            router.push(`/services/${service._id}/book`);
            return;
        }
    };
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {service.category}
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl">{service.serviceName}</h1>

            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                {service.location}
            </p>

            {/* Price and Booking Card */}
            <div className="mt-8 rounded-xl border bg-card p-6">
                <p className="text-sm text-muted-foreground">Starting from</p>

                <p className="mt-1 text-3xl font-semibold">
                    ${service.price.toLocaleString()}
                </p>

                {user?.role === "customer" ? (
                    <Button
                        className="mt-6 w-full"
                        onClick={handelRequest}
                    >
                        Request booking
                    </Button>
                ) : (    <Button
        className="mt-6 w-full cursor-not-allowed"
        variant="outline"
    >
        <ShieldCheck className="mr-2 size-4" />
        only customers can request bookings
    </Button>)}

                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="size-4 text-success" />
                    Secure booking through WedPlan
                </p>
            </div>

            {/* Description */}
            <div className="mt-8 border-t pt-6">
                <h2 className="text-2xl">About this service</h2>

                <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">
                    {service.description}
                </p>
            </div>

            {/* Vendor Information */}
            {service.vendor && (
                <div className="mt-8 border-t pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Offered by
                    </p>

                    <h2 className="mt-2 text-2xl">
                        {service.vendor.businessName || service.vendor.name}
                    </h2>
                </div>
            )}
        </div>
    );
}
