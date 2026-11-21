import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";

export const cancelBooking = async (id: string) => {
    return protectedMutation(`${BASE_URL}/api/bookings/${id}/cancel`, "PATCH");
};

export const respondToBooking = async (
    id: string,
    status: "accepted" | "rejected",
) => {
    return protectedMutation(
        `${BASE_URL}/api/bookings/${id}/${status === "accepted" ? "accept" : "reject"}`,
        "PATCH",
    );
};
