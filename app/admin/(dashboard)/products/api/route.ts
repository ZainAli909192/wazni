import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";
import { productSchema } from "@/lib/validations/product";

const includeProduct = { category: { select: { id: true, name: true, slug: true, parent: { select: { id: true, name: true } } } } } satisfies Prisma.ProductInclude;
const authorized = async () => Boolean((await getServerSession(adminAuthOptions))?.user?.id);

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  return NextResponse.json(await prisma.product.findMany({ include: includeProduct, orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message }, { status: 400 });
  const category = await prisma.category.findUnique({ where: { id: parsed.data.categoryId }, include: { _count: { select: { children: true } } } });
  if (!category || !category.isActive) return NextResponse.json({ message: "Select an active category." }, { status: 400 });
  if (category._count.children > 0) return NextResponse.json({ message: "Products must be assigned to a subcategory." }, { status: 400 });
  try {
    return NextResponse.json(await prisma.product.create({ data: parsed.data, include: includeProduct }), { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ message: "A product with this slug or SKU already exists." }, { status: 409 });
    throw error;
  }
}
