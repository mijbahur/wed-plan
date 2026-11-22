"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, LogOut } from "lucide-react";
import { toast } from "sonner";
import { authClient, useSession } from "@/lib/auth-client";
import { dashboardMenus } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// The sidebar content (used on desktop and inside the mobile drawer)
export function SidebarContent() {
    const { data: session } = useSession();
    const role = session?.user.userRole as Role;
    const pathname = usePathname();
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    async function logout() {
        if (isSigningOut) return;

        setIsSigningOut(true);
        try {
            const { error } = await authClient.signOut();
            if (error) {
                toast.error(error.message ?? "Could not sign you out.");
                return;
            }

            toast.success("You have been signed out");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("Could not sign you out.");
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <div className="flex h-full flex-col p-5">
            <Link href="/" className="font-serif text-3xl text-primary">
                WedPlan
            </Link>
            <p className="mb-3 mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {role} workspace
            </p>

            <nav className="flex-1 space-y-1">
                {dashboardMenus[role].map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                                active
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground/80 hover:bg-muted",
                            )}
                        >
                            <item.icon className="size-4" /> {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="space-y-1 border-t pt-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                >
                    <Globe className="size-4" /> Back to website
                </Link>
                <Button
                    type="button"
                    variant="ghost"
                    disabled={isSigningOut}
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                >
                    <LogOut className="size-4" />
                    {isSigningOut ? "Signing out" : "Sign out"}
                </Button>
            </div>
        </div>
    );
}
