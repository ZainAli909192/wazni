import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";
import { adminProfileSchema } from "@/lib/validations/admin-profile";

async function getAdminId() {
  const session = await getServerSession(adminAuthOptions);
  return session?.user?.id;
}

export async function GET() {
  const adminId = await getAdminId();
  if (!adminId) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const admin = await prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { name: true, email: true, phone: true, avatar: true, role: true },
  });

  if (!admin) return NextResponse.json({ message: "Admin account not found." }, { status: 404 });

  return NextResponse.json({
    fullName: admin.name,
    email: admin.email,
    phone: admin.phone ?? "",
    avatar: admin.avatar ?? "",
    role: admin.role === "SUPER_ADMIN" ? "Super Administrator" : "Administrator",
  });
}

export async function PATCH(request: Request) {
  const adminId = await getAdminId();
  if (!adminId) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const parsed = adminProfileSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid profile details." },
      { status: 400 }
    );
  }

  try {
    const admin = await prisma.adminUser.update({
      where: { id: adminId },
      data: {
        name: parsed.data.fullName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        avatar: parsed.data.avatar || null,
      },
      select: { name: true, email: true, phone: true, avatar: true, role: true },
    });

    return NextResponse.json({
      message: "Profile updated successfully.",
      profile: {
        fullName: admin.name,
        email: admin.email,
        phone: admin.phone ?? "",
        avatar: admin.avatar ?? "",
        role: admin.role === "SUPER_ADMIN" ? "Super Administrator" : "Administrator",
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "That email address is already in use." }, { status: 409 });
    }
    throw error;
  }
}
