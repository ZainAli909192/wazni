import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";

export const CUSTOMER_SESSION_COOKIE = "wazni_customer_session";
export const CUSTOMER_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export function customerToClient(customer: {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Array<{ id: string; label: string; emirate: string; area: string; address: string; building: string; firstName: string | null; lastName: string | null; phone: string | null; landmark: string | null; isDefault: boolean }>;
}) {
  const [firstName = "", ...lastNameParts] = customer.name.trim().split(/\s+/);
  return {
    id: customer.id,
    firstName,
    lastName: lastNameParts.join(" "),
    email: customer.email,
    phone: customer.phone,
    addresses: customer.addresses.map((address) => ({
      id: address.id,
      label: address.label === "Office" ? "Office" as const : "Home" as const,
      firstName: address.firstName ?? firstName,
      lastName: address.lastName ?? lastNameParts.join(" "),
      phone: address.phone ?? customer.phone,
      country: "United Arab Emirates",
      emirate: address.emirate,
      area: address.area,
      street: address.address,
      unit: address.building,
      landmark: address.landmark ?? "",
      isDefault: address.isDefault,
    })),
  };
}

export async function createCustomerSession(customerId: string) {
  const token = randomBytes(32).toString("base64url");
  await prisma.customerSession.create({
    data: {
      customerId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + CUSTOMER_SESSION_MAX_AGE * 1000),
    },
  });
  return token;
}

export async function getCurrentCustomer() {
  const token = (await cookies()).get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.customerSession.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { customer: { include: { addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }] } } } },
  });
  if (!session || session.expiresAt <= new Date() || session.customer.status !== "ACTIVE") return null;
  return session.customer;
}

export async function deleteCurrentCustomerSession() {
  const token = (await cookies()).get(CUSTOMER_SESSION_COOKIE)?.value;
  if (token) await prisma.customerSession.deleteMany({ where: { tokenHash: hashToken(token) } });
}
