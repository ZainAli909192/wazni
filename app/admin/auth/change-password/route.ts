import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { adminAuthOptions } from "@/lib/auth/admin-options";
import { prisma } from "@/lib/db/prisma";
import { adminChangePasswordSchema } from "@/lib/validations/admin-change-password";

export async function POST(request: Request) {
  const session = await getServerSession(adminAuthOptions);

  if (!session?.user?.id || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const parsed = adminChangePasswordSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: session.user.id } });
  if (!admin || !(await compare(parsed.data.currentPassword, admin.passwordHash))) {
    return NextResponse.json({ message: "Current password is incorrect." }, { status: 400 });
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: await hash(parsed.data.newPassword, 12) },
  });

  return NextResponse.json({ message: "Password changed successfully." });
}
