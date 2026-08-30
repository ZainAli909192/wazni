import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";
import { productSchema } from "@/lib/validations/product";

const includeProduct = { category: { select: { id: true, name: true, slug: true, parent: { select: { id: true, name: true } } } } } satisfies Prisma.ProductInclude;
const authorized = async () => Boolean((await getServerSession(adminAuthOptions))?.user?.id);
type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const product = await prisma.product.findUnique({ where: { id: (await params).id }, include: includeProduct });
  return product ? NextResponse.json(product) : NextResponse.json({ message: "Product not found." }, { status: 404 });
}

export async function PATCH(request: Request, { params }: Context) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message }, { status: 400 });
  const [existing, category] = await Promise.all([
    prisma.product.findUnique({ where: { id }, select: { id: true } }),
    prisma.category.findUnique({ where: { id: parsed.data.categoryId }, include: { _count: { select: { children: true } } } }),
  ]);
  if (!existing) return NextResponse.json({ message: "Product not found." }, { status: 404 });
  if (!category || !category.isActive || category._count.children > 0) return NextResponse.json({ message: "Select an active subcategory." }, { status: 400 });
  try {
    return NextResponse.json(await prisma.product.update({ where: { id }, data: parsed.data, include: includeProduct }));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ message: "A product with this slug or SKU already exists." }, { status: 409 });
    throw error;
  }
}

export async function DELETE(_: Request, { params }: Context) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const product = await prisma.product.findUnique({ where: { id: (await params).id }, select: { id: true, name: true } });
  if (!product) return NextResponse.json({ message: "Product not found." }, { status: 404 });
  await prisma.product.delete({ where: { id: product.id } });
  return NextResponse.json({ message: `"${product.name}" deleted successfully.` });
}
