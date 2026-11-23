import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeCTA() {
    return (
        <section className="bg-plum px-4 py-14 sm:px-8 md:py-16">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                    <h2 className="font-heading text-3xl text-white sm:text-4xl">
                        Your next chapter starts here.
                    </h2>

                    <p className="mt-3 text-sm text-white/80">
                        Let&apos;s make something unforgettable, together.
                    </p>
                </div>

                <Button
                    variant="secondary"
                    className="h-11 bg-cream px-5 text-xs font-medium text-plum hover:bg-white"
                >
                    <Link href="/services" className="flex items-center gap-2 text-plum hover:text-plum-dark">
                        Explore wedding services
                        <ArrowUpRight size={14} />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
