"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateUserRole, updateUserStatus } from "@/lib/action/users";
import FilterBar, {
    type FilterControl,
} from "@/components/dashboard/FilterBar";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { AdminUser, Role } from "@/lib/types";
import UserTableRow from "./UserTableRow";

type StatusFilter = "all" | "active" | "blocked";
type RoleFilter = "all" | Role;

type ManageUsersTableProps = {
    users: AdminUser[];
    currentUserId?: string;
    onRoleChange?: (user: AdminUser, userRole: Role) => void | Promise<void>;
    onStatusChange?: (
        user: AdminUser,
        isBlocked: boolean,
    ) => void | Promise<void>;
};

export default function ManageUsersTable({
    users,
    currentUserId,
    onRoleChange,
    onStatusChange,
}: ManageUsersTableProps) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleRoleChange = async (user: AdminUser, userRole: Role) => {
        try {
            if (onRoleChange) {
                await onRoleChange(user, userRole);
            } else {
                await updateUserRole(user.id, userRole);
            }
            setDisplayUsers((current) =>
                current.map((item) =>
                    item.id === user.id ? { ...item, userRole } : item,
                ),
            );
            toast.success(`${user.name}'s userRole changed to ${userRole}.`);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not change the user userRole.",
            );
        }
    };

    const handleStatusChange = async (user: AdminUser, isBlocked: boolean) => {
        try {
            if (onStatusChange) {
                await onStatusChange(user, isBlocked);
            } else {
                await updateUserStatus(user.id, isBlocked);
            }
            setDisplayUsers((current) =>
                current.map((item) =>
                    item.id === user.id ? { ...item, isBlocked } : item,
                ),
            );
            toast.success(
                isBlocked
                    ? `${user.name} was blocked.`
                    : `${user.name} was unblocked.`,
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not change the user status.",
            );
        }
    };

    const filteredUsers = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        return displayUsers.filter((user) => {
            const matchesSearch =
                !normalizedSearch ||
                user.name.toLowerCase().includes(normalizedSearch) ||
                user.email.toLowerCase().includes(normalizedSearch);
            const matchesRole =
                roleFilter === "all" || user.userRole === roleFilter;
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "blocked"
                    ? Boolean(user.isBlocked)
                    : !user.isBlocked);
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [displayUsers, roleFilter, search, statusFilter]);

    const visibleUsers = filteredUsers;

    const filters: FilterControl[] = [
        {
            key: "userRole",
            label: "Filter by userRole",
            value: roleFilter,
            onChange: (value) => {
                setRoleFilter(value as RoleFilter);
            },
            options: [
                { value: "all", label: "All roles" },
                { value: "customer", label: "Customer" },
                { value: "vendor", label: "Vendor" },
                { value: "admin", label: "Admin" },
            ],
        },
        {
            key: "status",
            label: "Filter by status",
            value: statusFilter,
            onChange: (value) => {
                setStatusFilter(value as StatusFilter);
            },
            options: [
                { value: "all", label: "All statuses" },
                { value: "active", label: "Active" },
                { value: "blocked", label: "Blocked" },
            ],
        },
    ];

    return (
        <>
            <div className="mt-8">
                <FilterBar
                    search={search}
                    onSearchChange={(value) => {
                        setSearch(value);
                    }}
                    searchPlaceholder="Search by name or email address"
                    filters={filters}
                />
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
                {displayUsers.length}{" "}
                {displayUsers.length === 1 ? "person" : "people"}. One
                thoughtful community.
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[34%] pl-5 text-[9px] uppercase">
                                Name &amp; email
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Role
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Joined
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Status
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visibleUsers.map((user) => {
                            return (
                                <UserTableRow
                                    key={user.id}
                                    user={user}
                                    currentUserId={currentUserId}
                                    onRoleChange={handleRoleChange}
                                    onStatusChange={handleStatusChange}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {filteredUsers.length === 0 && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                    No users match these filters.
                </p>
            )}

            <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                    Showing {filteredUsers.length} of {displayUsers.length}{" "}
                    users
                </p>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" disabled>
                        Previous
                    </Button>
                    <Button type="button" variant="outline" disabled>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
