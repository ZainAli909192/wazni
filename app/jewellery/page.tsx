import FinalCTA from "@/components/home/final-cta";
import JewelleryListing from "@/components/shop/jewellery-listing";
import { getStorefrontCatalog } from "@/lib/storefront/catalog";

export const dynamic = "force-dynamic";

export default async function JewelleryPage() {
  const catalog = await getStorefrontCatalog();
  const productTypes = [...new Set(catalog.products.map((product) => product.productType))];
  return (
<>
      <JewelleryListing products={catalog.products} productTypes={productTypes} />
<FinalCTA />
</>
  )
  
}
