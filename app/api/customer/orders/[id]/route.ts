import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentCustomer } from "@/lib/auth/customer-session-server";
import { customerOrderInclude, orderToClient } from "@/lib/storefront/orders";

export async function GET(_request: Request, context: RouteContext<"/api/customer/orders/[id]">) {
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const { id } = await context.params;
  const order = await prisma.order.findFirst({ where: { customerId: customer.id, OR: [{ id }, { orderNumber: id }] }, include: customerOrderInclude });
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ order: orderToClient(order) });
}

export async function PATCH(_request: Request, context: RouteContext<"/api/customer/orders/[id]">) {
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const { id } = await context.params;
  const existing = await prisma.order.findFirst({ where: { customerId: customer.id, OR: [{ id }, { orderNumber: id }], orderStatus: { in: ["PENDING", "CONFIRMED"] } }, include: { items: true } });
  if (!existing) return NextResponse.json({ error: "This order cannot be cancelled." }, { status: 409 });
  const order = await prisma.$transaction(async (tx) => {
    for (const item of existing.items) if (item.productId) {
      const product = await tx.product.update({ where: { id: item.productId }, data: { quantity: { increment: item.quantity } } });
      await tx.stockMovement.create({ data: { productId: item.productId, action: "ADD", quantity: item.quantity, previousValue: product.quantity - item.quantity, resultingValue: product.quantity, reason: "Order cancellation", notes: existing.orderNumber } });
    }
    return tx.order.update({ where: { id: existing.id }, data: { orderStatus: "CANCELLED", deliveryStatus: "CANCELLED", cancelledAt: new Date(), cancellationReason: "Customer request" }, include: customerOrderInclude });
  });
  return NextResponse.json({ order: orderToClient(order) });
}
