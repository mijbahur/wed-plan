import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service }: { service: Service }) {
    return (
        <article className="overflow-hidden rounded-lg border bg-card">
            <div className="relative h-40">
                <Image
                    src={service.images?.[0]}
                    alt={service.serviceName}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    loading="eager"
                />
            </div>
            <div className="p-3">
                <p className="text-[10px] font-semibold uppercase text-primary">
                    {service.category}
                </p>
                <h2 className="mt-2 text-xl">{service.serviceName}</h2>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                    {service.location}
                </p>
                <div className="mt-5 flex items-center justify-between">
                    <p className="font-semibold">${service.price.toLocaleString()}</p>
                    <Link
                        href={`/services/${service._id}`}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                        View details <ArrowRight className="size-3" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
