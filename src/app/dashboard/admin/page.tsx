import { getUser } from "@/lib/api/user";

export const instant = false;

const AdminDashboardPage = async () => {
    const users = await getUser();
    console.log("Users :", users);
    return (
        <div>
            <h1>Admin Page</h1>
        </div>
    );
};

export default AdminDashboardPage;