import AboutStore from "@/components/home/about-store";
import Collections from "@/components/home/collections";
import FinalCTA from "@/components/home/final-cta";
import GiftingMore from "@/components/home/gifting-more";
import Hero from "@/components/home/hero";
import ShopByGender from "@/components/home/shop-by-gender";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Collections />
      <ShopByGender />
      <GiftingMore />
      <AboutStore />
      <FinalCTA />
    </main>
  );
}