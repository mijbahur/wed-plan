import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cacheLife } from "next/cache";
import { getServices } from "@/lib/api/service";
import type { Service } from "@/lib/types";
import ServiceCard from "@/components/services/service-card";
import Reveal from "../ui/reveal";

async function getFeaturedServices() {
    "use cache";

    cacheLife("minutes");

    const data = await getServices(
        "isActive=true&status=approved&limit=6&sort=-createdAt",
    );

    return data;
}

export default async function FeaturedServices() {
    const services: Service[] = await getFeaturedServices();

    return (
        <section className="bg-background px-4 py-16 sm:px-8 md:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-end justify-between gap-4">
                    <Reveal>
                        <div>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-plum">
                                Handpicked for your happily ever after
                            </p>

                            <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
                                A little inspiration. A perfect beginning.
                            </h2>
                        </div>
                    </Reveal>

                    <Link
                        href="/services"
                        className="hidden items-center gap-1 text-xs font-medium text-plum hover:text-plum-dark sm:flex"
                    >
                        Explore all services
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                {services.length > 0 ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <Reveal key={service._id} delay={index * 0.1}>
                                <ServiceCard service={service} />
                            </Reveal>
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 rounded-lg border border-border bg-card px-6 py-12 text-center">
                        <h3 className="font-heading text-xl">
                            Something beautiful is coming.
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            We&apos;re preparing wonderful services for you.
                        </p>
                    </div>
                )}

                <Link
                    href="/services"
                    className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-plum sm:hidden"
                >
                    Explore all services
                    <ArrowUpRight size={16} />
                </Link>
            </div>
        </section>
    );
}
