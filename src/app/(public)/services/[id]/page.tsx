import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, } from "lucide-react";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/api/service";
import type { Service } from "@/lib/types";
import ServiceInfoCard from "@/components/services/service-info-card";

export const instant = false;

export default async function ServiceDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const service = (await getServiceById(id)) as Service | null;

    if (!service) notFound();

    const images = service.images?.length ? service.images : [""];

    return (
        <div className="bg-cream">
            <div className="wp-container py-8 md:py-12">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="size-4" /> Back to services
                </Link>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {images.slice(0, 4).map((image, index) => (
                            <div
                                key={`${image}-${index}`}
                                className={`relative h-64 overflow-hidden rounded-xl ${
                                    index === 0 ? "sm:col-span-2 sm:h-96" : ""
                                }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${service.serviceName} photo ${index + 1}`}
                                    fill
                                    sizes={
                                        index === 0
                                            ? "(min-width: 640px) 60vw, 100vw"
                                            : "30vw"
                                    }
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                    <ServiceInfoCard service={service} />
                </div>
            </div>
        </div>
    );
}
