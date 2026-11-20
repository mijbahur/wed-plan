import { getServices } from "@/lib/api/service";

const ServicesPage = async ({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();
    const services = await getServices(query);
    console.log("services", services);
    return (
        <h1>Services</h1>
    );
};

export default ServicesPage;