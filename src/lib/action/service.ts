import { protectedMutation } from "../core/server";
import { CreateServiceInput } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const createService = async (data: CreateServiceInput) => {
    const api = `${BASE_URL}/api/services`;
    const res = await protectedMutation(api, "POST", data)
    return res.json()
}