import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import Reveal from "@/components/ui/reveal";

export default function CategorySection() {
    return (
        <section className="bg-background px-4 py-16 sm:px-8 md:py-10">
            <div className="mx-auto max-w-7xl">
                <Reveal>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-plum">
                        Every beautiful detail
                    </p>

                    <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
                        Your dream team starts here.
                    </h2>
                </Reveal>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {CATEGORIES.map((category, index) => (
                        <Reveal key={category} delay={index * 0.08}>
                            <Link
                                href={`/services?category=${encodeURIComponent(category)}`}
                                className="group flex min-h-30 flex-col justify-between rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-plum hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-heading text-[10px] italic text-plum">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <ArrowUpRight
                                        size={16}
                                        className="text-plum transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </div>

                                <h3 className="text-xs font-medium leading-relaxed text-foreground">
                                    {category}
                                </h3>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
