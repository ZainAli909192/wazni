import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { getCurrentCustomer } from "@/lib/auth/customer-session-server";
import { customerOrderInclude, orderToClient } from "@/lib/storefront/orders";

const schema = z.object({
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(99) })).min(1),
  paymentMethod: z.enum(["card", "tamara", "tabby"]), deliveryMethod: z.enum(["delivery", "pickup"]),
  notes: z.string().max(1000).optional(),
  address: z.object({ emirate: z.string(), area: z.string(), street: z.string(), unit: z.string().optional(), phone: z.string() }).nullable(),
});

export async function GET() {
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const orders = await prisma.order.findMany({ where: { customerId: customer.id }, include: customerOrderInclude, orderBy: { placedAt: "desc" } });
  return NextResponse.json({ orders: orders.map(orderToClient) });
}

export async function POST(request: Request) {
  const customer = await getCurrentCustomer();
  if (!customer) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the order details." }, { status: 400 });
  const requested = new Map(parsed.data.items.map((item) => [item.productId, item.quantity]));
  const products = await prisma.product.findMany({ where: { id: { in: [...requested.keys()] }, status: "ACTIVE" } });
  if (products.length !== requested.size) return NextResponse.json({ error: "One or more products are no longer available." }, { status: 409 });

  try {
    const order = await prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const itemData = [];
      for (const product of products) {
        const quantity = requested.get(product.id)!;
        const unitPrice = product.salePrice ?? product.regularPrice;
        const updated = await tx.product.updateMany({ where: { id: product.id, status: "ACTIVE", quantity: { gte: quantity } }, data: { quantity: { decrement: quantity } } });
        if (updated.count !== 1) throw new Error(`INSUFFICIENT_STOCK:${product.name}`);
        await tx.stockMovement.create({ data: { productId: product.id, action: "REMOVE", quantity, previousValue: product.quantity, resultingValue: product.quantity - quantity, reason: "Customer order", notes: "Stock reserved when order was placed." } });
        subtotal += unitPrice * quantity;
        itemData.push({ productId: product.id, name: product.name, sku: product.sku, quantity, unitPrice });
      }
      const address = parsed.data.deliveryMethod === "pickup" ? { emirate: "Abu Dhabi", area: "Rabdan", street: "Wazni Boutique Pickup", unit: "Boutique", phone: customer.phone } : parsed.data.address;
      if (!address) throw new Error("DELIVERY_ADDRESS_REQUIRED");
      const orderNumber = `WZ-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
      return tx.order.create({
        data: { orderNumber, customerId: customer.id, subtotal, deliveryFee: 0, total: subtotal, paymentStatus: "PENDING", paymentMethod: parsed.data.paymentMethod, orderStatus: "CONFIRMED", deliveryStatus: "NOT_SCHEDULED", deliveryEmirate: address.emirate, deliveryArea: address.area, deliveryAddress: address.street, deliveryBuilding: address.unit ?? "", deliveryPhone: address.phone, customerNotes: parsed.data.notes ?? null, items: { create: itemData } },
        include: customerOrderInclude,
      });
    });
    return NextResponse.json({ order: orderToClient(order) }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.startsWith("INSUFFICIENT_STOCK:")) return NextResponse.json({ error: `${message.split(":")[1]} does not have enough stock.` }, { status: 409 });
    if (message === "DELIVERY_ADDRESS_REQUIRED") return NextResponse.json({ error: "A delivery address is required." }, { status: 400 });
    throw error;
  }
}
