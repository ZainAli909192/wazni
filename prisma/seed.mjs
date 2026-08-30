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

  const subcategoryIds = new Map();
  for (const [index, [categoryName, categorySlug]] of jewellerySubcategories.entries()) {
    const subcategory = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: { name: categoryName, parentId: jewellery.id, isActive: true, sortOrder: (index + 1) * 10 },
      create: { name: categoryName, slug: categorySlug, parentId: jewellery.id, isActive: true, sortOrder: (index + 1) * 10 },
    });
    subcategoryIds.set(categorySlug, subcategory.id);
  }

  const products = [
    ["Diamond Halo Ring", "diamond-halo-ring", "WZ-RNG-001", 8220, "/images/products/ring-1.png", "rings", "Yellow Gold", 8, true],
    ["Rose Gold Diamond Ring", "rose-gold-diamond-ring", "WZ-RNG-002", 8260, "/images/products/ring-2.png", "rings", "Rose Gold", 2, true],
    ["Square Diamond Ring", "square-diamond-ring", "WZ-RNG-003", 8840, "/images/products/ring-3.png", "rings", "Yellow Gold", 6, false],
    ["Diamond Wave Ring", "diamond-wave-ring", "WZ-RNG-004", 8920, "/images/products/ring-4.png", "rings", "Yellow Gold", 1, false],
    ["Diamond Circle Ring", "diamond-circle-ring", "WZ-RNG-005", 9210, "/images/products/ring-5.png", "rings", "Yellow Gold", 0, false],
    ["Diamond Leaf Ring", "diamond-leaf-ring", "WZ-RNG-006", 9250, "/images/products/ring-6.png", "rings", "Yellow Gold", 12, false],
    ["Heart Diamond Ring", "heart-diamond-ring", "WZ-RNG-007", 9500, "/images/products/ring-7.png", "rings", "Rose Gold", 4, false],
    ["Floral Diamond Ring", "floral-diamond-ring", "WZ-RNG-008", 9690, "/images/products/ring-8.png", "rings", "Rose Gold", 15, false],
    ["Sapphire Diamond Earrings", "sapphire-diamond-earrings", "WZ-EAR-001", 12400, "/images/products/earrings-1.png", "earrings", "White Gold", 8, true],
    ["Emerald Drop Earrings", "emerald-drop-earrings", "WZ-EAR-002", 17500, "/images/products/earrings-2.png", "earrings", "White Gold", 2, false],
    ["Sapphire Diamond Necklace", "sapphire-diamond-necklace", "WZ-NEC-001", 33023, "/images/products/necklace-1.png", "necklaces", "White Gold", 6, true],
    ["Emerald Diamond Necklace", "emerald-diamond-necklace", "WZ-NEC-002", 41368, "/images/products/necklace-2.png", "necklaces", "White Gold", 1, false],
    ["Classic Diamond Bracelet", "classic-diamond-bracelet", "WZ-BRA-001", 22150, "/images/products/bracelet-1.png", "bracelets", "White Gold", 0, false],
    ["Diamond Loop Bracelet", "diamond-loop-bracelet", "WZ-BRA-002", 28750, "/images/products/bracelet-2.png", "bracelets", "White Gold", 12, false],
    ["Emerald Diamond Pendant", "emerald-diamond-pendant", "WZ-PEN-001", 14800, "/images/products/necklace-3.png", "pendants", "White Gold", 4, false],
    ["Aquamarine Jewellery Set", "aquamarine-jewellery-set", "WZ-SET-001", 63341, "/images/products/set-1.png", "complete-sets", "White Gold", 15, true],
  ];

  for (const [productName, slug, sku, regularPrice, image, categorySlug, material, quantity, featured] of products) {
    const categoryId = subcategoryIds.get(categorySlug);
    const description = `${productName}, crafted in ${material} as part of Wazni Jewellery's ${categorySlug.replaceAll("-", " ")} collection.`;
    await prisma.product.upsert({
      where: { slug },
      update: { name: productName, sku, regularPrice, images: [image], categoryId, material, quantity, featured, status: "ACTIVE", shortDescription: description, description },
      create: { name: productName, slug, sku, regularPrice, images: [image], categoryId, material, quantity, featured, status: "ACTIVE", shortDescription: description, description },
    });
  }

  const dbProducts = await prisma.product.findMany({ orderBy: { sku: "asc" } });
  const customerSeeds = [
    ["Layla Hassan", "layla@example.com", "+971 50 123 4567"],
    ["Sara Khan", "sara@example.com", "+971 52 222 4110"],
    ["Omar Ali", "omar@example.com", "+971 55 981 1122"],
    ["Mariam Noor", "mariam@example.com", "+971 54 884 3210"],
    ["Khalid Hassan", "khalid@example.com", "+971 50 774 9011"],
    ["Fatima Zahra", "fatima@example.com", "+971 56 118 2214"],
    ["Ali Rehman", "ali@example.com", "+971 52 445 2121"],
    ["Noura Ahmed", "noura@example.com", "+971 55 411 1902"],
  ];
  const orderStatuses = ["PROCESSING", "CONFIRMED", "PENDING", "DELIVERED", "CANCELLED", "PROCESSING", "DELIVERED", "PENDING"];
  const paymentStatuses = ["PAID", "PAID", "PENDING", "PAID", "FAILED", "PAID", "PAID", "PENDING"];
  const paymentMethods = ["Card", "Tamara", "Tabby", "Card", "Card", "Tabby", "Tamara", "Tabby"];

  for (const [index, [customerName, customerEmail, customerPhone]] of customerSeeds.entries()) {
    const customer = await prisma.customer.upsert({ where: { email: customerEmail }, update: { name: customerName, phone: customerPhone }, create: { name: customerName, email: customerEmail, phone: customerPhone, lastLoginAt: new Date() } });
    const address = await prisma.customerAddress.findFirst({ where: { customerId: customer.id, isDefault: true } });
    if (!address) await prisma.customerAddress.create({ data: { customerId: customer.id, label: "Home", emirate: "Abu Dhabi", area: "Al Bateen", address: "Villa 25, Street 14", building: "Villa 25", isDefault: true } });
    const selected = [dbProducts[index], dbProducts[(index + 8) % dbProducts.length]].filter(Boolean);
    const subtotal = selected.reduce((sum, product, itemIndex) => sum + product.regularPrice * (itemIndex + 1), 0);
    const deliveryFee = subtotal >= 10000 ? 0 : 50;
    const placedAt = new Date(Date.now() - index * 86400000);
    await prisma.order.upsert({
      where: { orderNumber: `WZ-${String(2048 - index).padStart(4, "0")}` },
      update: { customerId: customer.id, subtotal, deliveryFee, total: subtotal + deliveryFee, paymentStatus: paymentStatuses[index], paymentMethod: paymentMethods[index], orderStatus: orderStatuses[index], deliveryStatus: orderStatuses[index] === "DELIVERED" ? "DELIVERED" : orderStatuses[index] === "CANCELLED" ? "CANCELLED" : "PREPARING" },
      create: { orderNumber: `WZ-${String(2048 - index).padStart(4, "0")}`, customerId: customer.id, subtotal, deliveryFee, total: subtotal + deliveryFee, paymentStatus: paymentStatuses[index], paymentMethod: paymentMethods[index], orderStatus: orderStatuses[index], deliveryStatus: orderStatuses[index] === "DELIVERED" ? "DELIVERED" : orderStatuses[index] === "CANCELLED" ? "CANCELLED" : "PREPARING", transactionReference: `PAY-WZ-${2048 - index}`, paidAt: paymentStatuses[index] === "PAID" ? placedAt : null, deliveryEmirate: "Abu Dhabi", deliveryArea: "Al Bateen", deliveryAddress: "Villa 25, Street 14", deliveryBuilding: "Villa 25", deliveryPhone: customerPhone, customerNotes: "Please call before delivery.", adminNotes: "Jewellery order verified for fulfilment.", placedAt, items: { create: selected.map((product, itemIndex) => ({ productId: product.id, name: product.name, sku: product.sku, quantity: itemIndex + 1, unitPrice: product.regularPrice })) } },
    });
  }
  console.info(`Admin account ready: ${email}`);
  console.info("Jewellery categories ready.");
  console.info("Jewellery products ready.");
  console.info("Customers and orders ready.");
} finally {
  await prisma.$disconnect();
}
