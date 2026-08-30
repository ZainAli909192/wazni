import { ApiError, type ApiErrorPayload } from "@/lib/api/client";
import type { CategoryFormValues } from "@/lib/validations/category";

export type AdminCategory = CategoryFormValues & {
  id: string;
  parent: { id: string; name: string; slug: string } | null;
  childrenCount: number;
  createdAt: string;
  updatedAt: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const data = await response.json().catch(() => null) as T | ApiErrorPayload | null;
  if (!response.ok) {
    const payload = data && typeof data === "object" ? data as ApiErrorPayload : undefined;
    throw new ApiError(payload?.message ?? "Request failed.", response.status, payload);
  }
  return data as T;
}

export const getCategories = () => request<AdminCategory[]>("/admin/categories/api");
export const getCategory = (id: string) => request<AdminCategory>(`/admin/categories/api/${id}`);
export const createCategory = (payload: CategoryFormValues) => request<AdminCategory>("/admin/categories/api", { method: "POST", body: JSON.stringify(payload) });
export const updateCategory = (id: string, payload: CategoryFormValues) => request<AdminCategory>(`/admin/categories/api/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deleteCategory = (id: string) => request<{ message: string }>(`/admin/categories/api/${id}`, { method: "DELETE" });
