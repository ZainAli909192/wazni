import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { StorefrontCatalog, StorefrontProduct } from "@/lib/storefront/types";

const productInclude = { category: { select: { name: true } } } as const;
const mapProduct = (product: Awaited<ReturnType<typeof findProduct>>) => product && ({
  id: product.id, name: product.name, slug: product.slug, sku: product.sku,
  price: product.salePrice ?? product.regularPrice, regularPrice: product.regularPrice, salePrice: product.salePrice,
  image: product.images[0] ?? "", images: product.images,
  productType: product.category.name, material: product.material, featured: product.featured,
  createdAt: product.createdAt.toISOString(), description: product.description,
  shortDescription: product.shortDescription, quantity: product.quantity,
}) satisfies StorefrontProduct;
const findProduct = (slug: string) => prisma.product.findUnique({ where: { slug }, include: productInclude });

export async function getStorefrontCatalog(): Promise<StorefrontCatalog> {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ where: { parentId: null, isActive: true }, include: { children: { where: { isActive: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] } }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
    prisma.product.findMany({ where: { status: "ACTIVE" }, include: productInclude, orderBy: [{ featured: "desc" }, { createdAt: "desc" }] }),
  ]);
  return { categories: categories.map((category) => ({ id: category.id, name: category.name, slug: category.slug, description: category.description ?? "", children: category.children.map((child) => ({ id: child.id, name: child.name, slug: child.slug })) })), products: products.map((product) => mapProduct(product)!) };
}
export async function getStorefrontProduct(slug: string) { return mapProduct(await findProduct(slug)); }
