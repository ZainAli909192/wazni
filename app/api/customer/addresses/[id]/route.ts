import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentCustomer } from "@/lib/auth/customer-session-server";
import { customerAddressSchema } from "@/lib/validations/customer-address";

export async function PATCH(request: Request, context: RouteContext<"/api/customer/addresses/[id]">) {
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const { id } = await context.params;
  const existing = await prisma.customerAddress.findFirst({ where: { id, customerId: customer.id } });
  if (!existing) return NextResponse.json({ error: "Address not found." }, { status: 404 });
  const body = await request.json().catch(() => null);
  if (body && Object.keys(body).length === 1 && body.isDefault === true) {
    await prisma.$transaction([prisma.customerAddress.updateMany({ where: { customerId: customer.id }, data: { isDefault: false } }), prisma.customerAddress.update({ where: { id }, data: { isDefault: true } })]);
    return NextResponse.json({ success: true });
  }
  const parsed = customerAddressSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the address details." }, { status: 400 });
  const address = await prisma.$transaction(async (tx) => {
    if (parsed.data.isDefault) await tx.customerAddress.updateMany({ where: { customerId: customer.id }, data: { isDefault: false } });
    return tx.customerAddress.update({ where: { id }, data: { label: parsed.data.label, firstName: parsed.data.firstName, lastName: parsed.data.lastName, phone: parsed.data.phone, emirate: parsed.data.emirate, area: parsed.data.area, address: parsed.data.street, building: parsed.data.unit, landmark: parsed.data.landmark, isDefault: parsed.data.isDefault || existing.isDefault } });
  });
  return NextResponse.json({ address });
}

export async function DELETE(_request: Request, context: RouteContext<"/api/customer/addresses/[id]">) {
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const { id } = await context.params;
  const existing = await prisma.customerAddress.findFirst({ where: { id, customerId: customer.id } });
  if (!existing) return NextResponse.json({ error: "Address not found." }, { status: 404 });
  await prisma.$transaction(async (tx) => {
    await tx.customerAddress.delete({ where: { id } });
    if (existing.isDefault) {
      const replacement = await tx.customerAddress.findFirst({ where: { customerId: customer.id }, orderBy: { createdAt: "asc" } });
      if (replacement) await tx.customerAddress.update({ where: { id: replacement.id }, data: { isDefault: true } });
    }
  });
  return NextResponse.json({ success: true });
}
