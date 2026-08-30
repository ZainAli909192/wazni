import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";
import { inventoryUpdateSchema } from "@/lib/validations/inventory";

const authorized = async () => {
  const session = await getServerSession(adminAuthOptions);
  return Boolean(session?.user?.id && ["ADMIN", "SUPER_ADMIN"].includes(session.user.role));
};

const serialize = (product: { id: string; name: string; sku: string; quantity: number; lowStockThreshold: number; updatedAt: Date; category: { name: string } }) => ({
  id: product.id, name: product.name, sku: product.sku, type: "Jewellery" as const,
  category: product.category.name, quantity: product.quantity,
  lowStockThreshold: product.lowStockThreshold, updatedAt: product.updatedAt.toISOString(),
});

const inventorySelect = { id: true, name: true, sku: true, quantity: true, lowStockThreshold: true, updatedAt: true, category: { select: { name: true } } } as const;

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const products = await prisma.product.findMany({ select: inventorySelect, orderBy: { name: "asc" } });
  return NextResponse.json(products.map(serialize));
}

export async function PATCH(request: Request) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const parsed = inventoryUpdateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message }, { status: 400 });
  const { ids, action, quantity, reason, notes } = parsed.data;
  const existing = await prisma.product.findMany({ where: { id: { in: ids } }, select: { id: true, quantity: true, lowStockThreshold: true } });
  if (existing.length !== ids.length) return NextResponse.json({ message: "One or more products no longer exist." }, { status: 404 });
  if (action === "remove" && existing.some((item) => item.quantity < quantity)) return NextResponse.json({ message: "Stock cannot be reduced below zero." }, { status: 409 });

  await prisma.$transaction(existing.flatMap((item) => {
    const previousValue = action === "threshold" ? item.lowStockThreshold : item.quantity;
    const resultingValue = action === "add" ? item.quantity + quantity : action === "remove" ? item.quantity - quantity : quantity;
    const updateData = action === "threshold" ? { lowStockThreshold: resultingValue } : { quantity: resultingValue };
    return [
      prisma.product.update({ where: { id: item.id }, data: updateData }),
      prisma.stockMovement.create({ data: { productId: item.id, action: action.toUpperCase() as "ADD" | "REMOVE" | "SET" | "THRESHOLD", quantity, previousValue, resultingValue, reason: reason || null, notes: notes || null } }),
    ];
  }));

  const updated = await prisma.product.findMany({ where: { id: { in: ids } }, select: inventorySelect, orderBy: { name: "asc" } });
  return NextResponse.json({ message: `${updated.length} ${updated.length === 1 ? "product" : "products"} updated successfully.`, items: updated.map(serialize) });
}
