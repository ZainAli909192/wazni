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

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const categories = await prisma.category.findMany({
    include: includeCategory,
    orderBy: [{ parentId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(categories.map(serialize));
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message }, { status: 400 });

  if (parsed.data.parentId) {
    const parent = await prisma.category.findUnique({ where: { id: parsed.data.parentId } });
    if (!parent || parent.parentId) return NextResponse.json({ message: "Select a valid main category." }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({
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
    return NextResponse.json(serialize(category), { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "A category with this slug already exists." }, { status: 409 });
    }
    throw error;
  }
}
