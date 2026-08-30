import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentCustomer } from "@/lib/auth/customer-session-server";
import { customerAddressSchema } from "@/lib/validations/customer-address";

export async function POST(request: Request) {
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const parsed = customerAddressSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the address details." }, { status: 400 });
  const existingCount = await prisma.customerAddress.count({ where: { customerId: customer.id } });
  const makeDefault = parsed.data.isDefault || existingCount === 0;
  const address = await prisma.$transaction(async (tx) => {
    if (makeDefault) await tx.customerAddress.updateMany({ where: { customerId: customer.id }, data: { isDefault: false } });
    return tx.customerAddress.create({ data: { customerId: customer.id, label: parsed.data.label, firstName: parsed.data.firstName, lastName: parsed.data.lastName, phone: parsed.data.phone, emirate: parsed.data.emirate, area: parsed.data.area, address: parsed.data.street, building: parsed.data.unit, landmark: parsed.data.landmark, isDefault: makeDefault } });
  });
  return NextResponse.json({ address }, { status: 201 });
}
