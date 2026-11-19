import {
    LayoutDashboard, CalendarCheck, UserCog, Briefcase, PlusCircle, Inbox, Crown,
    Users, Receipt, ClipboardCheck, type LucideIcon,
} from "lucide-react";

import type { Role } from "./types";

interface MenuItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

// Sidebar menu for each role. The dashboard layout also uses this list
// to block users from opening another role's pages.
export const dashboardMenus: Record<Role, MenuItem[]> = {
    customer: [
        { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
        { label: "My Bookings", href: "/dashboard/my-bookings", icon: CalendarCheck },
        { label: "Profile Settings", href: "/dashboard/profile", icon: UserCog },
    ],
    vendor: [
        { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
        { label: "My Services", href: "/dashboard/my-services", icon: Briefcase },
        { label: "Add Service", href: "/dashboard/add-service", icon: PlusCircle },
        { label: "Booking Requests", href: "/dashboard/booking-requests", icon: Inbox },
        { label: "Subscription", href: "/dashboard/subscription", icon: Crown },
        { label: "Profile Settings", href: "/dashboard/profile", icon: UserCog },
    ],
    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Manage Users", href: "/dashboard/users", icon: Users },
        { label: "Manage Services", href: "/dashboard/services", icon: ClipboardCheck },
        { label: "Transactions", href: "/dashboard/transactions", icon: Receipt },
        { label: "Profile Settings", href: "/dashboard/profile", icon: UserCog },
    ],
};
