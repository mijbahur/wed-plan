// import Link from "next/link";
// import { MapPin, ShieldCheck } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import type { Service } from "@/lib/types";

// interface ServiceInfoCardProps {
//     service: Service;
// }

// export default function ServiceInfoCard({ service }: ServiceInfoCardProps) {
//     return (
//         <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
//                 {service.category}
//             </p>

//             <h1 className="mt-3 text-4xl sm:text-5xl">{service.serviceName}</h1>

//             <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
//                 <MapPin className="size-4 text-primary" />
//                 {service.location}
//             </p>

//             <div className="mt-8 rounded-xl border bg-card p-6">
//                 <p className="text-sm text-muted-foreground">Starting from</p>

//                 <p className="mt-1 text-3xl font-semibold">
//                     ${service.price.toLocaleString()}
//                 </p>

//                 <Button
//                     className="mt-6 w-full"
//                     nativeButton={false}
//                     render={
//                         <Link
//                             href={`/signin?redirect=/services/${service._id}`}
//                         >
//                             Request booking
//                         </Link>
//                     }
//                 />

//                 <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
//                     <ShieldCheck className="size-4 text-success" />
//                     Secure booking through WedPlan
//                 </p>
//             </div>
//         </div>
//     );
// }



import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/types";

interface ServiceDetailsCardProps {
    service: Service;
}

export default function ServiceInfoCard({
    service,
}: ServiceDetailsCardProps) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {service.category}
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl">
                {service.serviceName}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                {service.location}
            </p>

            {/* Price and Booking Card */}
            <div className="mt-8 rounded-xl border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                    Starting from
                </p>

                <p className="mt-1 text-3xl font-semibold">
                    ${service.price.toLocaleString()}
                </p>

                <Button
                    className="mt-6 w-full"
                    nativeButton={false}
                    render={
                        <Link href={`/signin?redirect=/services/${service._id}`}>
                            Request booking
                        </Link>
                    }
                />

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
                        {service.vendor.businessName ||
                            service.vendor.name}
                    </h2>
                </div>
            )}
        </div>
    );
}
