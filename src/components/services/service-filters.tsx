"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";

type ServiceFiltersProps = {
    category?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
};

export default function ServiceFilters({
    category,
    location,
    minPrice,
    maxPrice,
    search,
}: ServiceFiltersProps) {
    const router = useRouter();

    function updateFilters(form: HTMLFormElement, selectedCategory?: string) {
        const values = new FormData(form);
        const query = new URLSearchParams();
        const category = selectedCategory ?? String(values.get("category") ?? "");

        if (search) query.set("search", search);
        if (category) query.set("category", category);

        for (const key of ["location", "minPrice", "maxPrice"]) {
            const value = String(values.get(key) ?? "");
            if (value) query.set(key, value);
        }

        const queryString = query.toString();
        router.push(queryString ? `/services?${queryString}` : "/services");
    }

    return (
        <form
            key={`${category ?? ""}-${location ?? ""}-${minPrice ?? ""}-${maxPrice ?? ""}-${search ?? ""}`}
            onSubmit={(event) => {
                event.preventDefault();
                updateFilters(event.currentTarget);
            }}
            className="rounded-lg border bg-card p-4 lg:w-50"
        >
            <div className="flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                <Link href="/services" className="text-xs text-primary hover:underline">
                    Reset all
                </Link>
            </div>

            {search && <input type="hidden" name="search" value={search} />}

            <div className="mt-6">
                <p className="text-xs font-semibold">Service category</p>
                <div className="mt-3 space-y-3">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input
                            type="radio"
                            name="category"
                            value=""
                            defaultChecked={!category}
                            className="accent-primary"
                            onChange={(event) => updateFilters(event.currentTarget.form!, "")}
                        />
                        All categories
                    </label>
                    {CATEGORIES.map((item) => (
                        <label key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <input
                                type="radio"
                                name="category"
                                value={item}
                                defaultChecked={category === item}
                                className="accent-primary"
                                onChange={(event) => updateFilters(event.currentTarget.form!, item)}
                            />
                            {item}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-6 border-t pt-5">
                <p className="text-xs font-semibold">Location</p>
                <Input
                    name="location"
                    defaultValue={location}
                    placeholder="All locations"
                    className="mt-3 h-9 text-xs"
                    onChange={(event) => updateFilters(event.currentTarget.form!)}
                />
            </div>

            <div className="mt-6 border-t pt-5">
                <p className="text-xs font-semibold">Price range</p>
                <div className="mt-3 flex gap-2">
                    <Input name="minPrice" defaultValue={minPrice} placeholder="Min $" className="h-9 text-xs" />
                    <Input name="maxPrice" defaultValue={maxPrice} placeholder="Max $" className="h-9 text-xs" />
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                    Prices vary by package or number of guests.
                </p>
            </div>

            <Button type="submit" className="mt-5 w-full">
                Apply filters
            </Button>
        </form>
    );
}
