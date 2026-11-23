import AdminDashboard from "@/components/admin-overview/admin-dashboard";

export const instant = false;
const AdminDashboardPage = () => {
    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <AdminDashboard />
        </main>
    );
};
export default AdminDashboardPage;
