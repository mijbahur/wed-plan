import { protectedMutation } from "../core/server";
import { CreateServiceInput } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getServices = async (query: string = '') => {
    const res = await fetch(`${BASE_URL}/api/services?${query}`);
    if (!res.ok) {
        throw new Error("Failed to fetch services");
    }
    return res.json();
}  

export const getServiceCount = async ( query: string = '' ) => {
    const res = await fetch(`${BASE_URL}/api/services/count?${query}`);
    if (!res.ok) {
        throw new Error("Failed to fetch service count");
    }
    return res.json();
};

export const getActiveServiceCount = async (vendorId: string) => {
    const result = await getServiceCount(
        `vendorId=${vendorId}&isActive=true`,
    );
    return result.data.count;
};

export const getServiceById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/services/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error("Failed to fetch service");
    }

    const result = await res.json();
    return result.data ?? result;
};

export const createService = async (data: CreateServiceInput) => {
    const api = `${BASE_URL}/api/services`;
    return protectedMutation(api, "POST", data);
}

export const deleteService = async (id: string) => {
    const api = `${BASE_URL}/api/services/${id}`;
    return protectedMutation(api, "DELETE");
}