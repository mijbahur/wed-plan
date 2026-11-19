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
  images: string;
  status: ServiceStatus;
  isActive: boolean;
  createdAt: string;
  vendor?: Vendor;
}

export interface CreateServiceInput {
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
}