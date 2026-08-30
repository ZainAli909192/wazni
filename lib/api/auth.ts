import { ApiError, apiRequest, type ApiErrorPayload } from "@/lib/api/client";

async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const data = (await response.json().catch(() => null)) as ApiErrorPayload | T | null;

  if (!response.ok) {
    const payload = data && typeof data === "object" ? data as ApiErrorPayload : undefined;
    throw new ApiError(payload?.message ?? "Request failed.", response.status, payload);
  }

  return data as T;
}

export type AdminLoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string | number;
    name?: string;
    email: string;
    role?: string;
  };
};

export async function adminLogin(payload: AdminLoginPayload) {
  return apiRequest<AuthResponse>("/admin/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify(payload),
  });
}

export async function adminChangePassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  return authRequest<{ message: string }>("/admin/auth/change-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type AdminProfileResponse = {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
};

export function getAdminProfile() {
  return authRequest<AdminProfileResponse>("/admin/auth/profile");
}

export function updateAdminProfile(payload: Omit<AdminProfileResponse, "role">) {
  return authRequest<{ message: string; profile: AdminProfileResponse }>("/admin/auth/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminForgotPassword(email: string) {
  return authRequest<{ message: string }>("/admin/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function adminResetPassword(payload: {
  token: string;
  password: string;
  passwordConfirmation: string;
}) {
  return authRequest<{ message: string }>("/admin/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminLogout() {
  return apiRequest<{ message: string }>("/admin/auth/logout", {
    method: "POST",
  });
}
