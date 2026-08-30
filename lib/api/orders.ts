import { ApiError, type ApiErrorPayload } from "@/lib/api/client";

export type AdminOrderStatus = "Pending" | "Confirmed" | "Processing" | "Delivered" | "Cancelled";
export type AdminPaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";
export type AdminDeliveryStatus = "Not Scheduled" | "Scheduled" | "Preparing" | "Out for Delivery" | "Delivered" | "Delivery Failed" | "Rescheduled" | "Cancelled";
export type AdminOrder = {
  id: string; customerId: string; orderNumber: string; customerName: string; email: string; phone: string;
  itemCount: number; subtotal: number; deliveryFee: number; total: number;
  paymentStatus: AdminPaymentStatus; paymentMethod: string; orderStatus: AdminOrderStatus; deliveryStatus: AdminDeliveryStatus;
  placedAt: string; transactionReference: string; paidAt: string;
  deliveryAddress: { emirate: string; area: string; address: string; building: string; phone: string };
  items: Array<{ id: string; name: string; type: "Jewellery"; sku: string; quantity: number; unitPrice: number }>;
  customerNotes: string; adminNotes: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  const data = await response.json().catch(() => null) as T | ApiErrorPayload | null;
  if (!response.ok) { const payload = data && typeof data === "object" ? data as ApiErrorPayload : undefined; throw new ApiError(payload?.message ?? "Request failed.", response.status, payload); }
  return data as T;
}
export const getOrders = () => request<AdminOrder[]>("/admin/orders/api");
export const getOrder = (id: string) => request<AdminOrder>(`/admin/orders/api/${id}`);
export const updateOrder = (id: string, payload: { orderStatus?: AdminOrderStatus; deliveryStatus?: AdminDeliveryStatus; cancellationReason?: string; cancellationNotes?: string }) => request<AdminOrder>(`/admin/orders/api/${id}`, { method: "PATCH", body: JSON.stringify(payload) });

