import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";
import { adminForgotPasswordSchema } from "@/lib/validations/admin-forgot-password";

const RESET_TTL_MS = 30 * 60 * 1000;

export async function POST(request: Request) {
  const parsed = adminForgotPasswordSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  if (admin?.isActive) {
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");

    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({ where: { adminId: admin.id } }),
      prisma.passwordResetToken.create({
        data: {
          adminId: admin.id,
          tokenHash,
          expiresAt: new Date(Date.now() + RESET_TTL_MS),
        },
      }),
    ]);

    const origin = process.env.NEXTAUTH_URL ?? new URL(request.url).origin;
    const resetUrl = `${origin}/admin/reset-password?token=${encodeURIComponent(token)}`;

    // Connect this URL to the project's transactional email provider in production.
    if (process.env.NODE_ENV !== "production") console.info("Admin password reset:", resetUrl);
  }

  return NextResponse.json({
    message: "If an active admin account exists, a password reset link has been created.",
  });
}
