import { ApiError, type ApiErrorPayload } from "@/lib/api/client";
import type { InventoryUpdateValues } from "@/lib/validations/inventory";

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  type: "Jewellery";
  category: string;
  quantity: number;
  lowStockThreshold: number;
  updatedAt: string;
};

async function request<T>(init?: RequestInit): Promise<T> {
  const response = await fetch("/admin/inventory/api", { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  const data = await response.json().catch(() => null) as T | ApiErrorPayload | null;
  if (!response.ok) {
    const payload = data && typeof data === "object" ? data as ApiErrorPayload : undefined;
    throw new ApiError(payload?.message ?? "Request failed.", response.status, payload);
  }
  return data as T;
}

export const getInventory = () => request<InventoryItem[]>();
export const updateInventory = (payload: InventoryUpdateValues) => request<{ message: string; items: InventoryItem[] }>({ method: "PATCH", body: JSON.stringify(payload) });
