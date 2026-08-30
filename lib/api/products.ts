import { ApiError, type ApiErrorPayload } from "@/lib/api/client";
import type { ProductFormValues } from "@/lib/validations/product";

export type AdminProduct = ProductFormValues & {
  id: string;
  category: { id: string; name: string; slug: string; parent: { id: string; name: string } | null };
  createdAt: string;
  updatedAt: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  const data = await response.json().catch(() => null) as T | ApiErrorPayload | null;
  if (!response.ok) {
    const payload = data && typeof data === "object" ? data as ApiErrorPayload : undefined;
    throw new ApiError(payload?.message ?? "Request failed.", response.status, payload);
  }
  return data as T;
}

export const getProducts = () => request<AdminProduct[]>("/admin/products/api");
export const getProduct = (id: string) => request<AdminProduct>(`/admin/products/api/${id}`);
export const createProduct = (payload: ProductFormValues) => request<AdminProduct>("/admin/products/api", { method: "POST", body: JSON.stringify(payload) });
export const updateProduct = (id: string, payload: ProductFormValues) => request<AdminProduct>(`/admin/products/api/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deleteProduct = (id: string) => request<{ message: string }>(`/admin/products/api/${id}`, { method: "DELETE" });
