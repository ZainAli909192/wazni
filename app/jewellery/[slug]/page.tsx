import { notFound } from "next/navigation";

import JewelleryDetails from "@/components/shop/jewellery-details";
import { products } from "@/lib/shop-data";
import Header from "@/components/layout/header";
import FinalCTA from "@/components/home/final-cta";
import Footer from "@/components/layout/footer";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function JewelleryDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <>
    <Header />
    <JewelleryDetails
      product={product}
      
      />
      <FinalCTA />

      </>
  );
}