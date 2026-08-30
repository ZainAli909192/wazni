import { notFound } from "next/navigation";

import JewelleryDetails from "@/components/shop/jewellery-details";
import { getStorefrontCatalog, getStorefrontProduct } from "@/lib/storefront/catalog";
import FinalCTA from "@/components/home/final-cta";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function JewelleryDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const [product, catalog] = await Promise.all([getStorefrontProduct(slug), getStorefrontCatalog()]);

  if (!product) {
    notFound();
  }

  return (
    <>
    <JewelleryDetails
      product={product}
      catalogProducts={catalog.products}
      />
      <FinalCTA />

      </>
  );
}
