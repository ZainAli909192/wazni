import type { StorefrontCatalog } from "@/lib/storefront/types";
export async function getPublicCatalog() { const response = await fetch("/api/storefront/catalog"); if (!response.ok) throw new Error("Unable to load catalogue."); return response.json() as Promise<StorefrontCatalog>; }
