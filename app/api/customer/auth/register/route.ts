import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { createCustomerSession, customerToClient, CUSTOMER_SESSION_COOKIE, CUSTOMER_SESSION_MAX_AGE } from "@/lib/auth/customer-session-server";

const schema = z.object({ firstName: z.string().trim().min(1), lastName: z.string().trim().min(1), email: z.email(), phone: z.string().trim().min(7), password: z.string().min(8) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check your account details." }, { status: 400 });
  const email = parsed.data.email.trim().toLowerCase();
  if (await prisma.customer.findUnique({ where: { email }, select: { id: true } })) return NextResponse.json({ error: "An account already exists with this email." }, { status: 409 });
  const customer = await prisma.customer.create({ data: { name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(), email, phone: parsed.data.phone, passwordHash: await hash(parsed.data.password, 12), lastLoginAt: new Date() }, include: { addresses: true } });
  const token = await createCustomerSession(customer.id);
  const response = NextResponse.json({ user: customerToClient(customer) }, { status: 201 });
  response.cookies.set(CUSTOMER_SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: CUSTOMER_SESSION_MAX_AGE });
  return response;
}
