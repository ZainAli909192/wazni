import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await getServerSession(adminAuthOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const customers = await prisma.customer.findMany({ include: { orders: { select: { total: true, placedAt: true }, orderBy: { placedAt: "desc" } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(customers.map((customer) => ({ id: customer.id, name: customer.name, email: customer.email, phone: customer.phone, totalOrders: customer.orders.length, totalSpent: customer.orders.reduce((sum, order) => sum + order.total, 0), lastOrder: customer.orders[0]?.placedAt.toISOString() ?? "—", memberSince: customer.createdAt.toISOString(), status: customer.status === "ACTIVE" ? "Active" : "Inactive" })));
}
