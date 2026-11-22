import { getUser } from "@/lib/api/user";

// export const instant = false;
const AdminDashboardPage = async () => {
    const users = await getUser();
    return (
        <div>
            <h1>Admin Page</h1>
        </div>
    );
};

export default AdminDashboardPage;