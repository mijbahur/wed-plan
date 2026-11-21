import { BASE_URL } from "../config/api";


export const getAllTransactions = async () => {
    const res = await fetch(`${BASE_URL}/api/transactions`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to load all transactions");
    }
    const result = await res.json();
    return result.data ?? result;
};