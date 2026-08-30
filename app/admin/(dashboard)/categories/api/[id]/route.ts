import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";
import { categorySchema } from "@/lib/validations/category";

const includeCategory = {
  parent: { select: { id: true, name: true, slug: true } },
  _count: { select: { children: true } },
} satisfies Prisma.CategoryInclude;

function serialize(category: Prisma.CategoryGetPayload<{ include: typeof includeCategory }>) {
  const { _count, ...data } = category;
  return { ...data, childrenCount: _count.children };
}

async function authorized() {
  const session = await getServerSession(adminAuthOptions);
  return Boolean(session?.user?.id && ["ADMIN", "SUPER_ADMIN"].includes(session.user.role));
}

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id }, include: includeCategory });
  if (!category) return NextResponse.json({ message: "Category not found." }, { status: 404 });
  return NextResponse.json(serialize(category));
}

export async function PATCH(request: Request, { params }: Context) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message }, { status: 400 });
  if (parsed.data.parentId === id) return NextResponse.json({ message: "A category cannot be its own parent." }, { status: 400 });

  const existing = await prisma.category.findUnique({ where: { id }, include: { _count: { select: { children: true } } } });
  if (!existing) return NextResponse.json({ message: "Category not found." }, { status: 404 });
  if (parsed.data.parentId && existing._count.children > 0) {
    return NextResponse.json({ message: "A main category with subcategories cannot become a subcategory." }, { status: 409 });
  }
  if (parsed.data.parentId) {
    const parent = await prisma.category.findUnique({ where: { id: parsed.data.parentId } });
    if (!parent || parent.parentId) return NextResponse.json({ message: "Select a valid main category." }, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description || null,
        isActive: parsed.data.isActive,
        sortOrder: parsed.data.sortOrder,
        parentId: parsed.data.parentId || null,
      },
      include: includeCategory,
    });
    return NextResponse.json(serialize(category));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "A category with this slug already exists." }, { status: 409 });
    }
    throw error;
  }
}

export async function DELETE(_: Request, { params }: Context) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id }, include: { _count: { select: { children: true } } } });
  if (!category) return NextResponse.json({ message: "Category not found." }, { status: 404 });
  if (category._count.children > 0) {
    return NextResponse.json({ message: "Delete or move this category's subcategories first." }, { status: 409 });
  }
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ message: `"${category.name}" deleted successfully.` });
}
