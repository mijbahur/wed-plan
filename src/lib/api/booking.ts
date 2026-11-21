import { BASE_URL } from "../config/api";
import { protectedMutation } from "../core/server";
import { Booking, CreateBookingInput } from "../types";

export const createBooking = async (data: CreateBookingInput) => {
    return protectedMutation(
        `${BASE_URL}/api/bookings`,
        "POST",
        data,
    );
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
    return protectedMutation(
        `${BASE_URL}/api/bookings/${id}/cancel`,
        "PATCH",
    );
};

export const getVendorBookings = async (vendorId: string): Promise<Booking[]> => {
    if (!vendorId) return [];

    const res = await fetch(
        `${BASE_URL}/api/bookings?vendorId=${encodeURIComponent(vendorId)}`,
        { cache: "no-store" },
    );
    if (!res.ok) {
        throw new Error("Failed to load booking requests");
    }
    const result = await res.json();
    return result.data ?? result;
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