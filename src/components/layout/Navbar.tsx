"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    GemIcon,
    LayoutDashboard,
    MenuIcon,
    UserCog,
    LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { toast } from "sonner";

const publicNavigation = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    // { label: "About Us", href: "/about" },
    // { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const userRole = session?.user.userRole;
    const dashboardHref =
        userRole === "vendor"
            ? "/dashboard/vendor"
            : userRole === "customer"
              ? "/dashboard/customer"
              : "/dashboard/admin";

    const navigation = session
        ? [
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Dashboard", href: dashboardHref },
          ]
        : publicNavigation;

    async function logout() {
        try {
            const { error } = await signOut();
            if (error) {
                toast.error(error.message ?? "Could not sign you out.");
                return;
            }

            toast.success("You have been signed out");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("Could not sign you out.");
        }
    }

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

                {isPending ? (
                    <div
                        aria-label="Loading account"
                        className="hidden h-9 w-24 animate-pulse rounded-md bg-beige md:block"
                    />
                ) : session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                            <UserAvatar
                                name={session.user.name}
                                image={session.user.image}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="flex items-center gap-3">
                                    <UserAvatar
                                        name={session.user.name}
                                        image={session.user.image}
                                    />
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm">
                                            {session.user.name}
                                        </span>
                                        <span className="block truncate text-xs font-normal capitalize text-muted-foreground">
                                            {session.user.userRole}
                                        </span>
                                    </span>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                render={<Link href={dashboardHref} />}
                            >
                                <LayoutDashboard /> Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                render={<Link href="/settings" />}
                            >
                                <UserCog /> Profile Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>
                                <LogOut /> Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
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
                )}

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
                                            nativeButton={false}
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

                            {isPending ? null : session ? (
                                <div className="mt-auto grid gap-2 border-t border-border pt-5">
                                    <SheetClose
                                        render={<Link href={dashboardHref} />}
                                        nativeButton={false}
                                        className="inline-flex h-11 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-plum"
                                    >
                                        Dashboard
                                    </SheetClose>
                                    <SheetClose
                                        render={<Link href="/settings" />}
                                        nativeButton={false}
                                        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                                    >
                                        Profile Settings
                                    </SheetClose>
                                    <SheetClose
                                        type="button"
                                        onClick={logout}
                                        className="inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium text-destructive cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        Logout
                                    </SheetClose>
                                </div>
                            ) : (
                                <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-5">
                                    <SheetClose
                                        render={<Link href="/signin" />}
                                        nativeButton={false}
                                        className="inline-flex h-11 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-plum"
                                    >
                                        Sign In
                                    </SheetClose>
                                    <SheetClose
                                        render={<Link href="/signup" />}
                                        nativeButton={false}
                                        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                                    >
                                        Get Started
                                    </SheetClose>
                                </div>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
