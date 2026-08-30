"use client";

import {
  ShoppingBag,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import { useCart } from "@/components/shop/cart-provider";

type Props = {
  product: {
    id: string | number;
    slug: string;
    name: string;
    image: string;
    sku?: string;
    price: number;
  };

  quantity?: number;
};

export default function AddToBagButton({
  product,
  quantity = 1,
}: Props) {
  const router = useRouter();

  const { addItem } = useCart();

  const [added, setAdded] =
    useState(false);

  function handleAdd() {
    addItem(product.id, quantity);

    setAdded(true);

    window.setTimeout(
      () =>
        setAdded(false),
      1500
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={handleAdd}
        className="flex h-[56px] w-full items-center justify-center gap-2 border border-[#C7A05A] bg-[#C7A05A] px-5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#071426] transition-colors hover:bg-[#D7B772]"
      >
        <ShoppingBag
          size={15}
        />

        {added
          ? "Added To Bag"
          : "Add To Bag"}
      </button>

      <button
        type="button"
        onClick={() => {
          addItem(product.id, quantity);

          router.push("/checkout");
        }}
        className="h-[56px] w-full bg-[#071426] px-5 text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#10233D]"
      >
        Buy Now
      </button>
    </div>
  );
}
