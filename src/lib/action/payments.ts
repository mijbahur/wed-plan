import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";

export const checkoutVerify = async (sessionId: string) => {
    const response = await protectedMutation(
        `${BASE_URL}/api/transactions/checkout-verify`,
        "POST",
        { sessionId },
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};
