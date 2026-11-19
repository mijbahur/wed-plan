"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarContent } from "@/components/dashboard-sidebar";
import { UserAvatar } from "@/components/user-avatar";
import { LoadingBlock } from "@/components/states";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { dashboardMenus } from "@/lib/constants";
import type { Role } from "@/lib/types";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { session, isPending } = useRequireAuth(); // not signed in -> /signin
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const role = session?.user.role as Role | undefined;

    const roleHome =
        role === "admin"
            ? "/dashboard/admin"
            : role === "vendor"
              ? "/dashboard/vendor"
              : "/dashboard/customer";

    const allowed = role
        ? pathname === "/dashboard" ||
          pathname === roleHome ||
          dashboardMenus[role].some((item) => pathname.startsWith(item.href))
        : false;

    useEffect(() => {
        if (session && !allowed) {
            toast.error("You do not have access to that page");
            router.replace(
                role === "vendor"
                    ? "/dashboard/vendor"
                    : role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard/customer",
            );
        }
    }, [session, allowed, role, router]);

    if (isPending || !session || !role) {
        return <LoadingBlock text="Loading your workspace..." />;
    }

    if (!allowed) return <LoadingBlock />;

    return (
        <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
            {/* desktop sidebar */}
            <aside className="sticky top-0 hidden h-screen border-r bg-card lg:block">
                <SidebarContent role={role} />
            </aside>

            <div className="min-w-0">
                {/* top bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur sm:px-8">
                    <div className="flex items-center gap-3">
                        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                            <SheetTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="lg:hidden"
                                        aria-label="Open menu"
                                    />
                                }
                            >
                                <Menu aria-hidden="true" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                <SheetTitle className="sr-only">
                                    Menu
                                </SheetTitle>
                                <SidebarContent
                                    role={role}
                                    onNavigate={() => setMenuOpen(false)}
                                />
                            </SheetContent>
                        </Sheet>
                        <span className="text-sm capitalize text-muted-foreground">
                            {role} workspace
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm sm:block">
                            {session.user.name}
                        </span>
                        <UserAvatar
                            name={session.user.name}
                            image={session.user.image}
                        />
                    </div>
                </header>

                <main className="p-4 sm:p-8">{children}</main>
            </div>
        </div>
    );
}
