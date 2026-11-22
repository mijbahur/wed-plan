import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";

export const checkoutVerify = async (sessionId: string) => {
    return protectedMutation(
        `${BASE_URL}/api/transactions/checkout-verify`,
        "POST",
        { sessionId },
    );
};
