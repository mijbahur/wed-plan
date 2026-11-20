import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";
import { CreateBookingInput } from "../types";

export const createBooking = async (data: CreateBookingInput) => {
    const res = await protectedMutation(
        `${BASE_URL}/api/bookings`,
        "POST",
        data,
    );
    return res.json();
};
