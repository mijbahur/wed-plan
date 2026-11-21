import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";

export const updateService = async (id: string, data: {status: string}) => {
    return protectedMutation(`${BASE_URL}/api/services/${id}`, "PATCH", data);
};

export const updateServiceDetails = async (
    id: string,
    data: {
        serviceName: string;
        category: string;
        price: number;
        location: string;
        description: string;
        images: string[];
    },
) => {
    return protectedMutation(`${BASE_URL}/api/services/${id}`, "PATCH", data);
};

export const respondToServiceRequest = async (
    id: string,
    status: "approved" | "rejected",
) => {
    return protectedMutation(
        `${BASE_URL}/api/services/${id}/${status === "approved" ? "accept" : "reject"}`,
        "PATCH",
    );
};
