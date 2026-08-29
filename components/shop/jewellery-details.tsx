"use client";

import Image from "next/image";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import {
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  products,
  type Product,
} from "@/lib/shop-data";

const ease = [0.22, 1, 0.36, 1] as const;

type ProductDetailsData = Product & {
  images?: string[];
  description?: string;
  details?: Array<{
    label: string;
    value: string;
  }>;
};

type Props = {
  product: ProductDetailsData;
};

export default function JewelleryDetails({
  product,
}: Props) {
  const [activeImage, setActiveImage] =
    useState(0);

  const [quantity, setQuantity] =
    useState(1);

  const [openSection, setOpenSection] =
    useState<string | null>("delivery");

  /*
   * Use gallery images when available.
   * Otherwise automatically use the main listing image.
   */
  const gallery = useMemo(() => {
    if (
      product.images &&
      product.images.length > 0
    ) {
      return product.images.slice(0, 4);
    }

    return [product.image];
  }, [product.image, product.images]);

  const formattedPrice =
    product.price.toLocaleString("en-AE");

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1
    );
  };

  const nextImage = () => {
    setActiveImage((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    );
  };

  const productDetails =
    product.details ??
    [
      {
        label: "Product Type",
        value: product.productType,
      },
      {
        label: "Material",
        value: product.material,
      },
      {
        label: "SKU",
        value: product.sku,
      },
    ];

  return (
    <main className="min-h-screen bg-white text-[#071426]">
      {/* ===================================================
          BREADCRUMB
      ==================================================== */}

      <div className="border-b border-[#071426]/10">
        <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[10px] text-[#071426]/50 sm:text-[11px]">
            <Link
              href="/"
              className="transition-colors hover:text-[#B88734]"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/jewellery"
              className="transition-colors hover:text-[#B88734]"
            >
              Jewellery
            </Link>

            <span>/</span>

            <span className="text-[#071426]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================
          MAIN PRODUCT
      ==================================================== */}

      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
        <div className="grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          {/* =================================================
              GALLERY
          ================================================== */}

          <div>
            <div className="relative overflow-hidden bg-[#F9F7F3]">
              <div className="relative aspect-square sm:aspect-[1.05/1] lg:aspect-square">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{
                      opacity: 0,
                      scale: 1.02,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.35,
                      ease,
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={gallery[activeImage]}
                      alt={`${product.name} view ${
                        activeImage + 1
                      }`}
                      fill
                      priority
                      sizes="(max-width: 1023px) 100vw, 55vw"
                      className="object-contain p-4 sm:p-7 lg:p-10"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Image navigation */}

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      aria-label="Previous product image"
                      className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#071426] shadow-sm transition-transform hover:scale-105 sm:left-5"
                    >
                      <ChevronLeft
                        size={21}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next product image"
                      className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#071426] shadow-sm transition-transform hover:scale-105 sm:right-5"
                    >
                      <ChevronRight
                        size={21}
                        strokeWidth={1.5}
                      />
                    </button>
                  </>
                )}

                {gallery.length > 1 && (
                  <div className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] text-[#071426]/65 shadow-sm">
                    {activeImage + 1} /{" "}
                    {gallery.length}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}

            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
                {gallery.map(
                  (image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() =>
                        setActiveImage(index)
                      }
                      aria-label={`View product image ${
                        index + 1
                      }`}
                      className={`relative aspect-square overflow-hidden border transition-all duration-300 ${
                        activeImage === index
                          ? "border-[#B88734]"
                          : "border-[#071426]/10 hover:border-[#B88734]/60"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${
                          index + 1
                        }`}
                        fill
                        sizes="150px"
                        className="bg-[#F9F7F3] object-contain p-2"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================== */}

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="border-b border-[#071426]/10 pb-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#B88734]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B88734] sm:text-[10px]">
                  Wazni Jewellery
                </p>
              </div>

              <h1 className="mt-5 font-serif text-[34px] font-normal leading-[1.04] tracking-[-0.025em] text-[#071426] sm:text-[42px] lg:text-[48px]">
                {product.name}
              </h1>

              <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-[#071426]/45">
                SKU: {product.sku}
              </p>

              <p className="mt-6 text-[27px] font-semibold tracking-[-0.02em] text-[#B88734] sm:text-[30px]">
                AED {formattedPrice}
              </p>
            </div>

            {/* Product type / material */}

            <div className="grid grid-cols-2 border-b border-[#071426]/10">
              <div className="border-r border-[#071426]/10 py-5 pr-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#071426]/45">
                  Product Type
                </p>

                <p className="mt-2 text-[14px] font-medium text-[#071426]">
                  {product.productType}
                </p>
              </div>

              <div className="py-5 pl-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#071426]/45">
                  Material
                </p>

                <p className="mt-2 text-[14px] font-medium text-[#071426]">
                  {product.material}
                </p>
              </div>
            </div>

            {/* Quantity */}

            <div className="border-b border-[#071426]/10 py-6">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#071426]/50">
                Quantity
              </p>

              <div className="inline-flex h-11 items-center border border-[#071426]/20">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(
                        1,
                        current - 1
                      )
                    )
                  }
                  className="flex h-full w-11 items-center justify-center transition-colors hover:bg-[#F8F5EF]"
                >
                  <Minus
                    size={15}
                    strokeWidth={1.6}
                  />
                </button>

                <span className="flex h-full min-w-[48px] items-center justify-center border-x border-[#071426]/15 text-[13px]">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity(
                      (current) =>
                        current + 1
                    )
                  }
                  className="flex h-full w-11 items-center justify-center transition-colors hover:bg-[#F8F5EF]"
                >
                  <Plus
                    size={15}
                    strokeWidth={1.6}
                  />
                </button>
              </div>
            </div>

            {/* =================================================
                PURCHASE BUTTONS
            ================================================== */}

            <div className="space-y-3 py-7">
              <button
                type="button"
                className="
                  group flex min-h-[56px] w-full
                  items-center justify-center gap-3
                  bg-[#071426]
                  px-6
                  text-[10px] font-semibold uppercase
                  tracking-[0.18em]
                  text-[#C7A05A]
                  transition-colors duration-300
                  hover:bg-[#10243B]
                  sm:text-[11px]
                "
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.5}
                />

                Add To Bag
              </button>

              <button
                type="button"
                className="
                  flex min-h-[56px] w-full
                  items-center justify-center
                  bg-[#C7A05A]
                  px-6
                  text-[10px] font-semibold uppercase
                  tracking-[0.18em]
                  text-[#071426]
                  transition-colors duration-300
                  hover:bg-[#D7B772]
                  sm:text-[11px]
                "
              >
                Buy Now
              </button>
            </div>

            {/* =================================================
                SERVICE INFORMATION
            ================================================== */}

            <div className="grid grid-cols-2 border-y border-[#071426]/10">
              <div className="flex items-center gap-2 border-r border-[#071426]/10 py-4 pr-3">
                <span className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-[#B88734] text-white">
                  <Check
                    size={12}
                    strokeWidth={2}
                  />
                </span>

                <span className="text-[10px] text-[#071426]/65 sm:text-[11px]">
                  Secure Purchase
                </span>
              </div>

              <div className="flex items-center gap-2 py-4 pl-3">
                <span className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-[#B88734] text-white">
                  <Check
                    size={12}
                    strokeWidth={2}
                  />
                </span>

                <span className="text-[10px] text-[#071426]/65 sm:text-[11px]">
                  Boutique Assistance
                </span>
              </div>
            </div>

          </div>
        </div>

        <ProductInformation
          product={product}
          productDetails={productDetails}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
      </section>

      <RelatedProducts
        currentProduct={product}
      />
    </main>
  );
}

/* ==========================================================
   RESPONSIVE PRODUCT INFORMATION
========================================================== */

function ProductInformation({
  product,
  productDetails,
  openSection,
  setOpenSection,
}: {
  product: ProductDetailsData;
  productDetails: Array<{
    label: string;
    value: string;
  }>;
  openSection: string | null;
  setOpenSection: (section: string | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const deliveryCopy =
    "Delivery and return information will be shown here once Wazni's final shipping, exchange and return policies are connected.";

  const description = (
    <div>
      {product.description && (
        <p className="mb-4">
          {product.description}
        </p>
      )}

      <ul className="space-y-2 pl-5 marker:text-[#B88734]">
        <li>Set No.: {product.sku}</li>
        <li>Product: {product.productType}</li>
        <li>Material: {product.material}</li>
        <li>Crafted by Wazni Jewellery</li>
      </ul>
    </div>
  );

  const details = (
    <div>
      {productDetails.map((detail) => (
        <div
          key={`${detail.label}-${detail.value}`}
          className="flex min-h-12 items-center justify-between gap-5 border-b border-[#071426]/10 py-3 first:border-t"
        >
          <span className="text-[#071426]/60">
            {detail.label}
          </span>

          <span className="max-w-[58%] text-right font-medium text-[#071426]">
            {detail.value}
          </span>
        </div>
      ))}
    </div>
  );

  const panels = [
    {
      id: "description",
      title: "Description",
      content: description,
    },
    {
      id: "details",
      title: "Product Details",
      content: details,
    },
    {
      id: "delivery",
      title: "Delivery & Returns",
      content: <p>{deliveryCopy}</p>,
    },
  ];

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.36,
            ease,
            staggerChildren: reduceMotion
              ? 0
              : 0.06,
          },
        },
      }}
      className="mt-10 border-t border-[#071426]/10 pt-2 sm:mt-14 lg:mt-20 lg:pt-0"
    >
      <div className="lg:hidden">
        {panels.map((panel) => (
          <ProductAccordion
            key={panel.id}
            title={panel.title}
            open={openSection === panel.id}
            onToggle={() =>
              setOpenSection(
                openSection === panel.id
                  ? null
                  : panel.id
              )
            }
          >
            {panel.content}
          </ProductAccordion>
        ))}
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:divide-x lg:divide-[#071426]/10">
        {panels.map((panel) => (
          <motion.section
            key={panel.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 12,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  ease,
                },
              },
            }}
            className="min-h-[300px] px-8 py-10 first:pl-0 last:pr-0 xl:px-12"
          >
            <h2 className="font-serif text-[27px] font-normal text-[#071426]">
              {panel.title}
            </h2>

            <div className="mt-8 text-[16px] leading-8 text-[#071426]/65">
              {panel.content}
            </div>
          </motion.section>
        ))}
      </div>
    </motion.div>
  );
}

/* ==========================================================
   ACCORDION
========================================================== */

function ProductAccordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const contentId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      layout={!reduceMotion}
      transition={{
        layout: {
          duration: 0.26,
          ease,
        },
      }}
      className="border-b border-[#071426]/10"
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        whileTap={reduceMotion ? undefined : { scale: 0.995 }}
        className="group flex min-h-16 w-full cursor-pointer items-center justify-between py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#B88734] focus-visible:ring-inset sm:min-h-[70px]"
      >
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#071426] transition-colors duration-200 group-hover:text-[#B88734] sm:text-[13px]">
          {title}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.22,
            ease,
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-end"
          aria-hidden="true"
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            key="content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: reduceMotion ? 0 : 0.28,
                ease,
              },
              opacity: {
                duration: reduceMotion ? 0 : 0.2,
                ease: "easeOut",
              },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={reduceMotion ? false : { y: -6 }}
              animate={{ y: 0 }}
              exit={reduceMotion ? undefined : { y: -4 }}
              transition={{
                duration: reduceMotion ? 0 : 0.24,
                ease,
              }}
              className="max-w-[760px] pb-8 pr-2 text-[15px] leading-8 text-[#071426]/65 sm:text-[16px]"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ==========================================================
   RELATED PRODUCTS
========================================================== */

function RelatedProducts({
  currentProduct,
}: {
  currentProduct: Product;
}) {
  /*
   * Prioritize products of the same type.
   * Then fill remaining cards with other jewellery.
   */
  const related = useMemo(() => {
    const sameType = products.filter(
      (item) =>
        item.id !== currentProduct.id &&
        item.productType ===
          currentProduct.productType
    );

    const otherProducts =
      products.filter(
        (item) =>
          item.id !== currentProduct.id &&
          item.productType !==
            currentProduct.productType
      );

    return [
      ...sameType,
      ...otherProducts,
    ].slice(0, 4);
  }, [currentProduct]);

  if (!related.length) {
    return null;
  }

  return (
    <section className="border-t border-[#071426]/10 bg-[#FAF8F4] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="mb-8 text-center sm:mb-10">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#B88734]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B88734]">
              Discover More
            </p>

            <span className="h-px w-7 bg-[#B88734]" />
          </div>

          <h2 className="mt-4 font-serif text-[30px] font-normal text-[#071426] sm:text-[36px] lg:text-[40px]">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          {related.map((item) => (
            <Link
              key={item.id}
              href={`/jewellery/${item.slug}`}
              className="group overflow-hidden border border-[#071426]/10 bg-white"
            >
              <div className="relative aspect-square overflow-hidden bg-[#F8F6F2]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.035] sm:p-5"
                />
              </div>

              <div className="px-3 pb-4 pt-3 sm:px-4">
                <h3 className="line-clamp-2 min-h-[34px] text-[12px] font-medium leading-[17px] text-[#071426] sm:text-[13px]">
                  {item.name}
                </h3>

                <p className="mt-2 text-[14px] font-semibold text-[#B88734] sm:text-[15px]">
                  AED{" "}
                  {item.price.toLocaleString(
                    "en-AE"
                  )}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.03em] text-[#071426]/50">
                  SKU: {item.sku}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
