import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { adminAuthOptions } from "@/lib/auth/admin-options";
import { orderInclude, serializeOrder } from "@/lib/admin/order-db";
import { prisma } from "@/lib/db/prisma";
export async function GET() { const session = await getServerSession(adminAuthOptions); if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 }); const orders = await prisma.order.findMany({ include: orderInclude, orderBy: { placedAt: "desc" } }); return NextResponse.json(orders.map(serializeOrder)); }
