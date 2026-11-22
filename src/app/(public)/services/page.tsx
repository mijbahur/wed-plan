import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceFilters from "@/components/services/service-filters";
import ServiceResults from "@/components/services/service-results";
import { getServices } from "@/lib/api/service";
import type { Service } from "@/lib/types";

export const instant = false;
export default async function ServicesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const query = new URLSearchParams();

    for (const key of ["search", "category", "location", "minPrice", "maxPrice"]) {
        const value = params[key];
        if (typeof value === "string" && value) query.set(key, value);
    }

    const result = await getServices(query.toString());
    const services: Service[] = Array.isArray(result)
        ? result
        : result?.data ?? [];

    return (
        <div className="bg-cream">
            <section className="bg-beige">
                <div className="wp-container py-12 md:py-16">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                        Find your wedding people
                    </p>
                    <h1 className="mt-3 text-4xl sm:text-5xl">
                        Good people. Beautiful possibilities.
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Explore thoughtfully selected services for your one-of-a-kind celebration.
                    </p>
                </div>
            </section>

            <div className="wp-container py-8 md:py-10">
                <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
                    <ServiceFilters
                        category={typeof params.category === "string" ? params.category : undefined}
                        location={typeof params.location === "string" ? params.location : undefined}
                        minPrice={typeof params.minPrice === "string" ? params.minPrice : undefined}
                        maxPrice={typeof params.maxPrice === "string" ? params.maxPrice : undefined}
                        search={typeof params.search === "string" ? params.search : undefined}
                    />

                    <main>
                        <form className="flex gap-2" method="get">
                            <Input
                                name="search"
                                defaultValue={typeof params.search === "string" ? params.search : ""}
                                placeholder="Search by service or vendor name"
                                className="h-10"
                            />
                            <Button type="submit" className="h-10 px-6">
                                Search
                            </Button>
                        </form>

                        <ServiceResults services={services} />
                    </main>
                </div>
            </div>
        </div>
    );
}
