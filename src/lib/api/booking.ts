import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";
import { Booking, CreateBookingInput } from "../types";

export const createBooking = async (data: CreateBookingInput) => {
    const res = await protectedMutation(
        `${BASE_URL}/api/bookings`,
        "POST",
        data,
    );
    return res.json();
};

// Bookings belonging to the signed in customer
export const getMyBookings = async (customerId: string): Promise<Booking[]> => {
    const res = await fetch(
        `${BASE_URL}/api/bookings?customerId=${encodeURIComponent(customerId)}`,
        { cache: "no-store" },
    );

    if (!res.ok) {
        throw new Error("Failed to load your bookings");
    }

    const result = await res.json();
    return result.data ?? result;
};

export const cancelBooking = async (id: string) => {
    const res = await protectedMutation(
        `${BASE_URL}/api/bookings/${id}/cancel`,
        "PATCH",
    );
    return res.json();
};
