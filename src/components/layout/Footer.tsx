import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
    {
        title: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Browse services", href: "/services" },
            { label: "How it works", href: "/#how-it-works" },
        ],
    },
    {
        title: "For professionals",
        links: [
            { label: "Become a vendor", href: "/become-vendor" },
            { label: "Vendor dashboard", href: "/vendor/dashboard" },
            { label: "Subscription plans", href: "/subscription" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-beige px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link
                            href="/"
                            className="font-heading text-2xl text-plum"
                        >
                            WedPlan
                        </Link>

                        <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
                            Thoughtful planning. Beautiful beginnings.
                            <br />
                            Your people, your places, your perfect day.
                        </p>
                    </div>

                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-xs font-semibold text-foreground">
                                {group.title}
                            </h3>

                            <ul className="mt-4 space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-xs text-muted-foreground transition-colors hover:text-plum"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-xs font-semibold text-foreground">
                            Let&apos;s connect
                        </h3>

                        <div className="mt-4 space-y-3 text-xs text-muted-foreground">
                            <a
                                href="mailto:hello@wedplan.com"
                                className="block hover:text-plum"
                            >
                                hello@wedplan.com
                            </a>

                            <a
                                href="tel:+18435550148"
                                className="block hover:text-plum"
                            >
                                +1 (843) 555-0148
                            </a>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 hover:text-plum"
                                >
                                    Instagram <ArrowUpRight size={11} />
                                </a>

                                <a
                                    href="https://www.pinterest.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 hover:text-plum"
                                >
                                    Pinterest <ArrowUpRight size={11} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col justify-between gap-4 border-t border-border pt-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center">
                    <p>© 2026 WedPlan. Made for your kind of love.</p>

                    <div className="flex gap-5">
                        <Link
                            href="/privacy-policy"
                            className="hover:text-plum"
                        >
                            Privacy policy
                        </Link>

                        <Link
                            href="/terms-of-service"
                            className="hover:text-plum"
                        >
                            Terms of service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
