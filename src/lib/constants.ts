import {
    LayoutDashboard, CalendarCheck, UserCog, Briefcase, PlusCircle, Inbox, Crown,
    Users, Receipt, ClipboardCheck, type LucideIcon,
} from "lucide-react";

import type { Role } from "./types";

export const CATEGORIES = [
    "Photography & Videography",
    "Wedding Venues",
    "Decoration & Florist",
    "Catering Services",
    "Makeup & Styling",
    "Wedding Fashion",
];

export const FREE_PLAN_LIMIT = 3;
export const PREMIUM_PRICE = 29;

export const FREE_PLAN_FEATURES = [
    `Up to ${FREE_PLAN_LIMIT} active services`,
    "Basic vendor dashboard",
    "Booking request management",
];
export const PREMIUM_PLAN_FEATURES = [
    "Unlimited active services",
    "Priority support",
    "Access to premium features",
];

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
        { label: "My Bookings", href: "/dashboard/customer/my-bookings", icon: CalendarCheck },
        { label: "Profile Settings", href: "/dashboard/profile", icon: UserCog },
    ],
    vendor: [
        { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
        { label: "My Services", href: "/dashboard/vendor/services", icon: Briefcase },
        { label: "Add Service", href: "/dashboard/vendor/services/new", icon: PlusCircle },
        { label: "Booking Requests", href: "/dashboard/vendor/booking-requests", icon: Inbox },
        { label: "Subscription", href: "/dashboard/vendor/subscription", icon: Crown },
        { label: "Profile Settings", href: "/dashboard/profile", icon: UserCog },
    ],
    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
        { label: "Manage Services", href: "/dashboard/admin/services", icon: ClipboardCheck },
        { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
        { label: "Profile Settings", href: "/dashboard/profile", icon: UserCog },
    ],
};
