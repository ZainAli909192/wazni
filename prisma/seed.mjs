import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || "Wazni Administrator";

if (!email || !password || password.length < 8) {
  throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (minimum 8 characters) before seeding.");
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required.");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

try {
  await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash: await hash(password, 12), isActive: true },
    create: { email, name, passwordHash: await hash(password, 12), role: "SUPER_ADMIN" },
  });
  console.info(`Admin account ready: ${email}`);
} finally {
  await prisma.$disconnect();
}
