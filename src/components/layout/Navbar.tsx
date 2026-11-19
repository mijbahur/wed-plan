"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GemIcon, MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur-md">
            <nav
                aria-label="Primary navigation"
                className="wp-container flex h-20 items-center justify-between font-sans"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
                >
                    <span className="flex size-9 items-center justify-center rounded-full bg-plum-tint text-plum">
                        <GemIcon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-heading text-[1.65rem] leading-none font-semibold text-plum-dark">
                        WedPlan
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navigation.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`relative py-2 text-[0.95rem] font-medium transition-colors ${
                                    isActive
                                        ? "text-plum"
                                        : "text-ink-soft hover:text-plum"
                                }`}
                            >
                                {item.label}
                                {isActive && (
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-plum" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Button
                        variant="ghost"
                        nativeButton={false}
                        className="h-10 px-4 text-plum hover:text-plum-dark"
                        render={<Link href="/signin">Sign In</Link>}
                    />
                    <Button
                        nativeButton={false}
                        className="h-10 rounded-md px-5 shadow-sm"
                        render={<Link href="/signup">Get Started</Link>}
                    />
                </div>

                <Sheet>
                    <SheetTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Open navigation menu"
                                className="md:hidden cursor-pointer"
                            />
                        }
                    >
                        <MenuIcon />
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[min(85vw,20rem)] font-sans"
                    >
                        <SheetHeader className="border-b border-border px-5 py-5">
                            <SheetTitle>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2.5"
                                >
                                    <span className="flex size-9 items-center justify-center rounded-full bg-plum-tint text-plum">
                                        <GemIcon
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </span>
                                    <span className="font-heading text-[1.65rem] leading-none font-semibold text-plum-dark">
                                        WedPlan
                                    </span>
                                </Link>
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-1 flex-col px-5 py-6">
                            <div className="flex flex-col">
                                {navigation.map((item) => {
                                    const isActive =
                                        item.href === "/"
                                            ? pathname === "/"
                                            : pathname.startsWith(item.href);

                                    return (
                                        <SheetClose
                                            key={item.href}
                                            render={<Link href={item.href} />}
                                            className={`rounded-md px-3 py-3 text-base font-medium  ${
                                                isActive
                                                    ? "bg-plum-tint text-plum"
                                                    : "text-ink hover:bg-muted hover:text-plum"
                                            }`}
                                        >
                                            {item.label}
                                        </SheetClose>
                                    );
                                })}
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-5">
                                <SheetClose
                                    render={<Link href="/signin" />}
                                    className="inline-flex h-11 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-plum"
                                >
                                    Sign In
                                </SheetClose>
                                <SheetClose
                                    render={<Link href="/signup" />}
                                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                                >
                                    Get Started
                                </SheetClose>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
