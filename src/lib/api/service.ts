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
    const res = await protectedMutation(api, "POST", data)
    return res.json()
}

export const deleteService = async (id: string) => {
    const api = `${BASE_URL}/api/services/${id}`;
    const res = await protectedMutation(api, "DELETE");
    return res.json();
}