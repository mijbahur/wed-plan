import { getUser } from "@/lib/api/user";
import ManageUsersTable from "@/components/dashboard/ManageUsersTable";
import { getSession } from "@/lib/core/server";
import type { AdminUser } from "@/lib/types";

export const instant = false;

const AdminDashboardPage = async () => {
    const result = await getUser();
    const session = await getSession();
    const normalizedResult = result as unknown as
        | { users?: AdminUser[] }
        | AdminUser[];
    const users = (
        (Array.isArray(normalizedResult)
            ? normalizedResult
            : normalizedResult.users) ?? []
    ).map((user) => ({
        ...user,
        id: String(user.id),
        name: user.name ?? "",
        email: user.email ?? "",
        userRole: user.userRole ?? "customer",
        isBlocked: Boolean(user.isBlocked),
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : "",
    }));

    return (
        <div className="mx-auto max-w-7xl">
            <header>
                <h1 className="font-heading text-4xl font-medium">
                    Manage users
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Keep your community safe, welcoming, and well managed.
                </p>
            </header>

            <ManageUsersTable users={users} currentUserId={session?.user.id} />
        </div>
    );
};

export default AdminDashboardPage;
