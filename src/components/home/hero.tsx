"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");

    function onSearch(e: React.FormEvent) {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (location) params.set("location", location);
        router.push(`/services?${params.toString()}`);
    }

    return (
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
                        A little less stress. A lot more yes.
                    </p>
                    <h1 className="mt-4 text-6xl leading-[1.05] sm:text-7xl">
                        Your forever,{" "}
                        <span className="italic text-primary">beautifully</span>{" "}
                        planned.
                    </h1>
                    <p className="mt-10 max-w-lg text-lg text-muted-foreground">
                        Find the people and places that feel like you. Bring
                        your wedding vision to life, one perfect detail at a
                        time.
                    </p>
                    <Button
                        size="lg"
                        className="mt-10 rounded-sm bg-primary px-10 py-5 text-sm font-medium text-white hover:bg-primary/90"
                        nativeButton={false}
                        render={
                            <Link href="/services">
                                Explore Wedding Services{" "}
                            </Link>
                        }
                    />
                </motion.div>

                <motion.div
                    className="relative flex  items-center justify-center"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <Image
                        src="/images/couple-garden.jpg"
                        alt="Couple walking through a wedding garden"
                        width={1200}
                        height={920}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                        className="h-130 w-2/3 rounded-t-[200px] rounded-b-2xl object-cover"
                    />
                    <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 px-4 py-3 text-center font-serif text-xl backdrop-blur">
                        Made for your kind of love.
                    </p>
                </motion.div>
            </div>

            {/* search card */}
            <form
                onSubmit={onSearch}
                className="relative z-10 mx-auto mt-10 grid max-w-5xl gap-3 rounded-md border bg-card p-4 shadow-lg sm:grid-cols-[1fr_1fr_auto]"
            >
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Venues, photographers, and more"
                        className="h-11 pl-9"
                    />
                </div>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where is your celebration?"
                        className="h-11 pl-9"
                    />
                </div>
                <Button
                    type="submit"
                    size="lg"
                    className="rounded-sm bg-primary px-10 py-5 text-sm font-medium text-white hover:bg-primary/90"
                >
                    Find my perfect match
                </Button>
            </form>
            <div className="relative mt-10 left-1/2 w-screen -translate-x-1/2 border-t border-border bg-beige px-4 py-8 sm:px-8">
                <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3 sm:gap-8">
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            Thoughtfully vetted vendors
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Quality you can feel
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-foreground">
                            Every wedding, every style
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            A celebration that&apos;s truly yours
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-foreground">
                            One place. All your people.
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            From first idea to final &quot;I do&quot;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
