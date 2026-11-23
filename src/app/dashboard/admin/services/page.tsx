import { getServices } from "@/lib/api/service";
import AdminServicesView from "@/components/dashboard/AdminServicesView";
import type { Service } from "@/lib/types";
import Reveal from "@/components/ui/reveal";
export const instant = false;

const AdminManageSericesPage = async () => {
    const services = (await getServices()) as Service[];
    return (
        <Reveal>
            <AdminServicesView services={services} />
        </Reveal>
    );
};

export default AdminManageSericesPage;
