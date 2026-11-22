import { BASE_URL } from "../config/api";
import { authFetch } from "../core/server";


export const getAllTransactions = async () => {
    const res = await authFetch(`${BASE_URL}/api/transactions`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to load all transactions");
    }
    const result = await res.json();
    return result.data ?? result;
};