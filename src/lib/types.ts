export type Role = "admin" | "vendor" | "customer";

export type AdminUser = {
    id: string;
    name: string;
    email: string;
    userRole: Role;
    isBlocked: boolean;
    createdAt?: string | Date;
};

export type User = {
    id: string;
    name: string;
    email: string;
    userRole: Role;
    isPremium?: boolean;
    isBlocked: boolean;
    createdAt?: string | Date;
};

export type ServiceStatus = "pending" | "approved" | "rejected";

export interface Vendor {
    id: string;
    name: string;
    businessName: string;
    image: string;
    isPremium: boolean;
}

export interface Service {
    _id: string;
    vendorId: string;
    serviceName: string;
    category: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    status: ServiceStatus;
    isActive: boolean;
    createdAt: string;
    vendor?: Vendor;
}

export type VendorService = {
    _id: string;
    serviceName: string;
    category: string;
    location: string;
    price: string;
    status: ServiceStatus;
    images: string[];
    isActive: boolean;
};

export interface CreateServiceInput {
    serviceName: string;
    category: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    // Temporary until the JWT middleware sets the vendor from the token
    vendorId?: string;
}

// Booking related types
export type BookingStatus = "pending" | "accepted" | "rejected" | "cancelled";

export type Transaction = {
    _id: string;
    sessionId?: string;
    status?: string;
    payment_status?: string;
    customer_email?: string;
    userId?: string;
    payment_date?: string | Date;
    payment_intent?: string;
};

export interface Booking {
    _id: string;
    serviceId: string;
    serviceName: string;
    serviceImage?: string;
    vendorId?: string;
    customerId: string;
    customerName: string;
    email?: string;
    userName?: string;
    eventDate: string;
    eventLocation: string;
    message?: string;
    status: BookingStatus;
    createdAt: string;
}
export type CreateBookingInput = {
    serviceId: string;
    serviceName: string;
    serviceImage?: string;
    eventDate: string;
    eventLocation: string;
    message?: string;
    customerId?: string;
    email?: string;
    customerName: string;
    vendorId: string;
};
