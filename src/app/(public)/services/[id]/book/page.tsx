import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import BookingForm from "@/components/services/booking-form";
import { getServiceById } from "@/lib/api/service";
import type { Service } from "@/lib/types";

export const instant = false;
export default async function BookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const service = (await getServiceById(id)) as Service | null;

    if (!service) notFound();

    const image = service.images?.[0] || "";

    return (
        <div className="bg-cream">
            <div className="wp-container py-8 md:py-12">
                <Link
                    href={`/services/${service._id}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="size-4" /> Back to service
                </Link>
                <div className="mt-10">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                        Request a booking
                    </p>
                    <h1 className="mt-3 text-4xl sm:text-5xl">Let&apos;s make it a date.</h1>
                    <p className="mt-3 text-muted-foreground">
                        Tell {service.serviceName} a little about your celebration.
                    </p>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
                    <BookingForm service={service} />
                    <aside className="h-fit overflow-hidden rounded-xl border bg-card">
                        <div className="relative h-56">
                            <Image
                                src={image}
                                alt={service.serviceName}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 30vw, 100vw"
                            />
                        </div>
                        <div className="p-5">
                            <p className="text-[10px] font-semibold uppercase text-primary">
                                {service.category}
                            </p>
                            <h2 className="mt-2 text-2xl">{service.serviceName}</h2>
                            <p className="mt-1 text-xs text-muted-foreground">{service.location}</p>
                            <p className="mt-6">
                                From <span className="font-semibold">${service.price.toLocaleString()}</span> / event
                            </p>
                            <p className="mt-5 text-xs text-muted-foreground">
                                No payment is collected by WedPlan.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}