import { ApiError, type ApiErrorPayload } from "@/lib/api/client";
import type { AdminOrderStatus, AdminPaymentStatus } from "@/lib/api/orders";

export type AdminCustomerSummary = { id: string; name: string; email: string; phone: string; totalOrders: number; totalSpent: number; lastOrder: string; memberSince: string; status: "Active" | "Inactive" };
export type AdminCustomer = AdminCustomerSummary & {
  lastLogin: string; deliveredOrders: number; cancelledOrders: number; totalReviews: number; adminNotes: string;
  addresses: Array<{ id: string; label: string; emirate: string; area: string; address: string; building: string; isDefault: boolean }>;
  orders: Array<{ id: string; orderNumber: string; date: string; total: number; paymentStatus: AdminPaymentStatus; orderStatus: AdminOrderStatus }>;
  reviews: Array<{ id: string; product: string; rating: number; status: "Pending" | "Approved" | "Rejected"; date: string }>;
  refunds: Array<{ id: string; refundNumber: string; orderId: string; orderNumber: string; amount: number; status: "Requested" | "Approved" | "Pending" | "Completed" | "Failed" | "Declined"; date: string }>;
};
async function request<T>(path: string, init?: RequestInit): Promise<T> { const response = await fetch(path, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } }); const data = await response.json().catch(() => null) as T | ApiErrorPayload | null; if (!response.ok) { const payload = data && typeof data === "object" ? data as ApiErrorPayload : undefined; throw new ApiError(payload?.message ?? "Request failed.", response.status, payload); } return data as T; }
export const getCustomers = () => request<AdminCustomerSummary[]>("/admin/customers/api");
export const getCustomer = (id: string) => request<AdminCustomer>(`/admin/customers/api/${id}`);
export const updateCustomer = (id: string, payload: { status?: "Active" | "Inactive"; adminNotes?: string }) => request<AdminCustomer>(`/admin/customers/api/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
