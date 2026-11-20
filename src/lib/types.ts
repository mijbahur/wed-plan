export type Role = "admin" | "vendor" | "customer";

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
}



// Booking related types
export type BookingStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface Booking {
  _id: string;
  serviceId: string;
  serviceName: string;
  serviceImage?: string;
  userId: string;
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
    userId?: string;
    email?: string;
};