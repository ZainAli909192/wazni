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

  const mainCategories = [
    { name: "Jewellery", slug: "jewellery", description: "Fine jewellery across every collection.", sortOrder: 10 },
    { name: "Collections", slug: "collections", description: "Curated Wazni jewellery collections.", sortOrder: 20 },
    { name: "Diamonds", slug: "diamonds", description: "Diamond jewellery and signature pieces.", sortOrder: 30 },
    { name: "Gold", slug: "gold", description: "Gold jewellery in classic and contemporary styles.", sortOrder: 40 },
  ];

  const jewellery = await prisma.category.upsert({
    where: { slug: mainCategories[0].slug },
    update: { ...mainCategories[0], parentId: null, isActive: true },
    create: { ...mainCategories[0], isActive: true },
  });

  for (const category of mainCategories.slice(1)) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { ...category, parentId: null, isActive: true },
      create: { ...category, isActive: true },
    });
  }

  const jewellerySubcategories = [
    ["Rings", "rings"],
    ["Earrings", "earrings"],
    ["Necklaces", "necklaces"],
    ["Bracelets", "bracelets"],
    ["Pendants", "pendants"],
    ["Complete Sets", "complete-sets"],
  ];

  for (const [index, [categoryName, categorySlug]] of jewellerySubcategories.entries()) {
    await prisma.category.upsert({
      where: { slug: categorySlug },
      update: { name: categoryName, parentId: jewellery.id, isActive: true, sortOrder: (index + 1) * 10 },
      create: { name: categoryName, slug: categorySlug, parentId: jewellery.id, isActive: true, sortOrder: (index + 1) * 10 },
    });
  }
  console.info(`Admin account ready: ${email}`);
  console.info("Jewellery categories ready.");
} finally {
  await prisma.$disconnect();
}
