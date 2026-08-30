import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { createCustomerSession, customerToClient, CUSTOMER_SESSION_COOKIE, CUSTOMER_SESSION_MAX_AGE } from "@/lib/auth/customer-session-server";

const schema = z.object({ email: z.email(), password: z.string().min(1) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  const customer = await prisma.customer.findUnique({ where: { email: parsed.data.email.trim().toLowerCase() }, include: { addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }] } } });
  if (!customer?.passwordHash || !(await compare(parsed.data.password, customer.passwordHash))) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  if (customer.status !== "ACTIVE") return NextResponse.json({ error: "This account is not active." }, { status: 403 });
  await prisma.customer.update({ where: { id: customer.id }, data: { lastLoginAt: new Date() } });
  const token = await createCustomerSession(customer.id);
  const response = NextResponse.json({ user: customerToClient(customer) });
  response.cookies.set(CUSTOMER_SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: CUSTOMER_SESSION_MAX_AGE });
  return response;
}
