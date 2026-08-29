"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";

import OrderSummary from "@/components/shop/OrderSummary";
import { useCart } from "@/components/shop/cart-provider";

import {
  products,
  type Product,
} from "@/lib/shop-data";

type BagItem = {
  product: Product;
  quantity: number;
};

export default function BagPage() {
  const {
    items: cartLines,
    totalQuantity,
    hydrated,
    setQuantity,
    removeItem: removeItemFromCart,
  } = useCart();

  const items = useMemo(
    () =>
      cartLines
        .map((line) => {
          const product = products.find(
            (item) => item.id === line.productId
          );

          return product
            ? { product, quantity: line.quantity }
            : null;
        })
        .filter((item): item is BagItem => item !== null),
    [cartLines]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.product.price *
            item.quantity,
        0
      ),
    [items]
  );

  function increaseQuantity(id: number) {
    const item = items.find((line) => line.product.id === id);
    if (item) setQuantity(id, item.quantity + 1);
  }

  function decreaseQuantity(id: number) {
    const item = items.find((line) => line.product.id === id);
    if (item) setQuantity(id, Math.max(1, item.quantity - 1));
  }

  function removeItem(id: number) {
    removeItemFromCart(id);
  }

  if (!hydrated) {
    return <BagLoading />;
  }

  if (!items.length) {
    return <EmptyBag />;
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] text-[#071426]">

      

      <section className="relative overflow-hidden bg-[#071426]">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full border border-[#C7A05A]" />
          <div className="absolute right-10 top-10 h-48 w-48 rotate-45 border border-[#C7A05A]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-12 text-center sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C7A05A]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C7A05A]">
              Your Selection
            </p>

            <span className="h-px w-8 bg-[#C7A05A]" />
          </div>

          <h1 className="mt-4 font-serif text-[38px] font-normal text-white sm:text-[46px] lg:text-[56px]">
            Shopping Bag
          </h1>

          <p className="mt-3 text-[12px] text-white/55">
            {totalQuantity}{" "}
            {totalQuantity === 1
              ? "beautiful piece"
              : "beautiful pieces"}{" "}
            selected
          </p>
        </div>
      </section>
      {/* Main  */}

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-12">
        
        {/* Products  */}

          <div>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
                  Your Pieces
                </p>

                <h2 className="mt-2 font-serif text-[28px] text-[#071426] sm:text-[32px]">
                  Selected Jewellery
                </h2>
              </div>

              <p className="hidden text-[11px] text-[#071426]/45 sm:block">
                {totalQuantity} items
              </p>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <BagItemCard
                  key={item.product.id}
                  item={item}
                  onIncrease={() =>
                    increaseQuantity(
                      item.product.id
                    )
                  }
                  onDecrease={() =>
                    decreaseQuantity(
                      item.product.id
                    )
                  }
                  onRemove={() =>
                    removeItem(
                      item.product.id
                    )
                  }
                />
              ))}
            </div>

            {/* Continue */}
            <Link
              href="/jewellery"
              className="group mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071426] transition-colors hover:text-[#B88734]"
            >
              Continue Shopping

              <ArrowRight
                size={15}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Luxury reassurance */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <ServiceCard
                icon={<ShieldCheck size={20} />}
                title="Secure Purchase"
                text="Protected checkout experience."
              />

              <ServiceCard
                icon={<Check size={19} />}
                title="Quality Assured"
                text="Carefully selected Wazni pieces."
              />

              <ServiceCard
                icon={<ShoppingBag size={19} />}
                title="Boutique Support"
                text="Assistance when you need it."
              />
            </div>
          </div>

          {/* =================================================
              SUMMARY
          ================================================== */}

          <div className="xl:sticky xl:top-8 xl:self-start">
            <OrderSummary
              subtotal={subtotal}
              totalQuantity={
                totalQuantity
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// product card 

function BagItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: BagItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  const total =
    item.product.price *
    item.quantity;

  return (
    <article
      className="
        group overflow-hidden
        border border-[#C7A05A]/20
        bg-white
        transition-all duration-300
        hover:border-[#C7A05A]/50
        hover:shadow-[0_18px_45px_rgba(7,20,38,0.07)]
      "
    >
      <div className="grid grid-cols-[120px_minmax(0,1fr)] sm:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)]">
        {/* Image */}
        <Link
          href={`/jewellery/${item.product.slug}`}
          className="relative min-h-[180px] overflow-hidden bg-[#F7F3EC] sm:min-h-[220px]"
        >
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            sizes="220px"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.035] sm:p-5"
          />
        </Link>

        {/* Info */}
        <div className="flex min-w-0 flex-col justify-between p-4 sm:p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/jewellery/${item.product.slug}`}
                  className="font-serif text-[19px] leading-[1.15] text-[#071426] transition-colors hover:text-[#B88734] sm:text-[24px]"
                >
                  {item.product.name}
                </Link>

                <p className="mt-2 text-[9px] uppercase tracking-[0.08em] text-[#071426]/40">
                  SKU: {item.product.sku}
                </p>
              </div>

              <button
                type="button"
                onClick={onRemove}
                aria-label="Remove product"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#071426]/35 transition-all hover:bg-[#F6F1E8] hover:text-[#B88734]"
              >
                <Trash2
                  size={16}
                  strokeWidth={1.4}
                />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <ProductMeta
                label="Type"
                value={
                  item.product.productType
                }
              />

              <ProductMeta
                label="Material"
                value={
                  item.product.material
                }
              />
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 flex flex-col gap-4 border-t border-[#071426]/8 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#071426]/40">
                Quantity
              </p>

              <div className="mt-2">
                <QuantityControl
                  quantity={
                    item.quantity
                  }
                  onIncrease={
                    onIncrease
                  }
                  onDecrease={
                    onDecrease
                  }
                />
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#071426]/40">
                Item Total
              </p>

              <p className="mt-2 text-[18px] font-semibold text-[#B88734]">
                AED{" "}
                {total.toLocaleString(
                  "en-AE"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// product meta 

function ProductMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#071426]/35">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-medium text-[#071426]/70">
        {value}
      </p>
    </div>
  );
}

// quantity 

function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="inline-flex h-10 items-center border border-[#C7A05A]/30 bg-[#FCFAF6]">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center text-[#071426] transition-colors hover:bg-[#EFE7D8] disabled:opacity-25"
      >
        <Minus
          size={13}
          strokeWidth={1.7}
        />
      </button>

      <span className="flex h-full min-w-[42px] items-center justify-center border-x border-[#C7A05A]/20 text-[12px] font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-[#071426] transition-colors hover:bg-[#EFE7D8]"
      >
        <Plus
          size={13}
          strokeWidth={1.7}
        />
      </button>
    </div>
  );
}

/* ==========================================================
   SERVICE CARD
========================================================== */

function ServiceCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 border border-[#C7A05A]/15 bg-white px-4 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4EBDD] text-[#B88734]">
        {icon}
      </div>

      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#071426]">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-[#071426]/45">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================
   EMPTY
========================================================== */

function BagLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading shopping bag"
      className="min-h-[75vh] bg-[#FCFAF6] px-5 py-14"
    >
      <div className="mx-auto max-w-[1500px] animate-pulse">
        <div className="mx-auto h-10 w-52 bg-[#071426]/8" />
        <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="h-64 bg-[#071426]/5" />
          <div className="h-80 bg-[#071426]/5" />
        </div>
      </div>
    </main>
  );
}

function EmptyBag() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FCFAF6] px-5">
      <div className="max-w-[520px] text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#071426] text-[#C7A05A]">
          <ShoppingBag
            size={30}
            strokeWidth={1.3}
          />
        </div>

        <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B88734]">
          Your Selection
        </p>

        <h1 className="mt-4 font-serif text-[38px] text-[#071426]">
          Your bag is empty
        </h1>

        <p className="mx-auto mt-3 max-w-[390px] text-[12px] leading-6 text-[#071426]/50">
          Discover jewellery created for celebrations, milestones and the moments that matter most.
        </p>

        <Link
          href="/jewellery"
          className="mt-7 inline-flex min-h-[54px] items-center justify-center bg-[#C7A05A] px-8 !text-[10px] font-semibold uppercase tracking-[0.16em] !text-[#071426] !no-underline transition-colors hover:bg-[#D8B76E]"
        >
          Explore Jewellery
        </Link>
      </div>
    </main>
  );
}
