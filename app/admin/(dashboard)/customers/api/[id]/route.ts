import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";

type Context = { params: Promise<{ id: string }> };
const schema = z.object({ status: z.enum(["Active", "Inactive"]).optional(), adminNotes: z.string().max(2000).optional() }).refine((value) => Object.keys(value).length > 0);
const title = (value: string) => value.toLowerCase().split("_").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
const includeCustomer = { addresses: true, orders: { orderBy: { placedAt: "desc" as const } } };
function serialize(customer: Awaited<ReturnType<typeof findCustomer>>) {
  if (!customer) return null;
  const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
  return { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone, memberSince: customer.createdAt.toISOString(), lastLogin: customer.lastLoginAt?.toISOString() ?? "Never", status: customer.status === "ACTIVE" ? "Active" : "Inactive", totalOrders: customer.orders.length, deliveredOrders: customer.orders.filter((order) => order.orderStatus === "DELIVERED").length, cancelledOrders: customer.orders.filter((order) => order.orderStatus === "CANCELLED").length, totalSpent, totalReviews: 0, addresses: customer.addresses, orders: customer.orders.map((order) => ({ id: order.id, orderNumber: order.orderNumber, date: order.placedAt.toISOString(), total: order.total, paymentStatus: title(order.paymentStatus), orderStatus: title(order.orderStatus) })), reviews: [], refunds: [], adminNotes: customer.adminNotes ?? "", lastOrder: customer.orders[0]?.placedAt.toISOString() ?? "—" };
}
const findCustomer = (id: string) => prisma.customer.findUnique({ where: { id }, include: includeCustomer });
export async function GET(_: Request, { params }: Context) { const session = await getServerSession(adminAuthOptions); if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 }); const customer = await findCustomer((await params).id); return customer ? NextResponse.json(serialize(customer)) : NextResponse.json({ message: "Customer not found." }, { status: 404 }); }
export async function PATCH(request: Request, { params }: Context) { const session = await getServerSession(adminAuthOptions); if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 }); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid update." }, { status: 400 }); const id = (await params).id; const exists = await prisma.customer.findUnique({ where: { id }, select: { id: true } }); if (!exists) return NextResponse.json({ message: "Customer not found." }, { status: 404 }); await prisma.customer.update({ where: { id }, data: { status: parsed.data.status === "Active" ? "ACTIVE" : parsed.data.status === "Inactive" ? "INACTIVE" : undefined, adminNotes: parsed.data.adminNotes } }); return NextResponse.json(serialize(await findCustomer(id))); }
