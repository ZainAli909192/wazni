export type StorefrontCategory = { id: string; name: string; slug: string; description: string; children: Array<{ id: string; name: string; slug: string }> };
export type StorefrontProduct = {
  id: string; name: string; slug: string; sku: string; price: number; regularPrice: number; salePrice: number | null;
  image: string; images: string[]; productType: string; material: string; featured: boolean;
  createdAt: string; description: string; shortDescription: string; quantity: number;
};
export type StorefrontCatalog = { categories: StorefrontCategory[]; products: StorefrontProduct[] };
