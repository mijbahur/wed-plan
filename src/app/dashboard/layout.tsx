"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
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
import type { Role } from "@/lib/types";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { session, isPending } = useRequireAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const userRole = session?.user.userRole as Role | undefined;

    if (isPending || !session || !userRole) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
                <LoadingBlock text="Loading..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
            {/* desktop sidebar */}
            <aside className="sticky top-0 hidden h-screen border-r bg-card lg:block">
                <SidebarContent />
            </aside>

            <div className="min-w-0">
                {/* top bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 backdrop-blur sm:px-8">
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
                                <SidebarContent />
                            </SheetContent>
                        </Sheet>
                        <span className="text-sm capitalize text-muted-foreground">
                            {userRole} workspace
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
