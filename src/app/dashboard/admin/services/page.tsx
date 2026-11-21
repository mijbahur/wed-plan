import { getServices } from "@/lib/api/service";
import AdminServicesView from "@/components/dashboard/AdminServicesView";
import type { Service } from "@/lib/types";
export const instant = false

const AdminManageSericesPage = async () => {
    const services = (await getServices()) as Service[];
    return <AdminServicesView services={services} />;
};

export default AdminManageSericesPage;