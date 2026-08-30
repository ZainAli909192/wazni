import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { customerToClient, getCurrentCustomer } from "@/lib/auth/customer-session-server";

const schema = z.object({
  firstName: z.string().trim().min(1), lastName: z.string().trim().min(1), email: z.email(), phone: z.string().trim().min(7),
  address: z.object({ id: z.string().optional(), label: z.enum(["Home", "Office"]), emirate: z.string().min(1), area: z.string().min(1), street: z.string().min(1), unit: z.string().optional().default("") }).optional(),
});

export async function PATCH(request: Request) {
  const current = await getCurrentCustomer();
  if (!current) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check your details." }, { status: 400 });
  const { address, ...profile } = parsed.data;
  await prisma.$transaction(async (tx) => {
    await tx.customer.update({ where: { id: current.id }, data: { name: `${profile.firstName} ${profile.lastName}`.trim(), email: profile.email.trim().toLowerCase(), phone: profile.phone } });
    if (address) {
      await tx.customerAddress.updateMany({ where: { customerId: current.id }, data: { isDefault: false } });
      const data = { label: address.label, emirate: address.emirate, area: address.area, address: address.street, building: address.unit, isDefault: true };
      if (address.id) await tx.customerAddress.update({ where: { id: address.id, customerId: current.id }, data });
      else await tx.customerAddress.create({ data: { ...data, customerId: current.id } });
    }
  }).catch((error: unknown) => {
    if (typeof error === "object" && error && "code" in error && error.code === "P2002") return null;
    throw error;
  });
  const duplicate = await prisma.customer.findFirst({ where: { email: parsed.data.email.trim().toLowerCase(), id: { not: current.id } }, select: { id: true } });
  if (duplicate) return NextResponse.json({ error: "Another account already uses this email address." }, { status: 409 });
  const updated = await prisma.customer.findUniqueOrThrow({ where: { id: current.id }, include: { addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }] } } });
  return NextResponse.json({ user: customerToClient(updated) });
}
