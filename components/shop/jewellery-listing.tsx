"use client";

import Image from "next/image";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowDownUp,
  Check,
  ChevronDown,
  ChevronLeft,
  Filter,
  Heart,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  materials,
  priceRanges,
  products,
  productTypes,
  sortOptions,
  type Material,
  type ProductType,
} from "@/lib/shop-data";

type OpenDesktopFilter =
  | "productType"
  | "material"
  | "price"
  | "sort"
  | null;

type MobileSection =
  | "productType"
  | "material"
  | "price"
  | null;

type SelectedPrice = {
  id: string;
  label: string;
  min: number;
  max: number;
} | null;

export default function JewelleryListing() {
  const [selectedProductTypes, setSelectedProductTypes] =
    useState<ProductType[]>([]);

  const [selectedMaterials, setSelectedMaterials] =
    useState<Material[]>([]);

  const [selectedPrice, setSelectedPrice] =
    useState<SelectedPrice>(null);

  const [sort, setSort] =
    useState("featured");

  const [openDesktopFilter, setOpenDesktopFilter] =
    useState<OpenDesktopFilter>(null);

  const [filterDrawerOpen, setFilterDrawerOpen] =
    useState(false);

  const [sortDrawerOpen, setSortDrawerOpen] =
    useState(false);

  const [mobileSection, setMobileSection] =
    useState<MobileSection>(null);

  const [wishlist, setWishlist] =
    useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedProductTypes.length) {
      result = result.filter((product) =>
        selectedProductTypes.includes(
          product.productType
        )
      );
    }

    if (selectedMaterials.length) {
      result = result.filter((product) =>
        selectedMaterials.includes(
          product.material
        )
      );
    }

    if (selectedPrice) {
      result = result.filter(
        (product) =>
          product.price >= selectedPrice.min &&
          product.price <= selectedPrice.max
      );
    }

    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;

      case "price-low-high":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high-low":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
        });
    }

    return result;
  }, [
    selectedProductTypes,
    selectedMaterials,
    selectedPrice,
    sort,
  ]);

  const activeFilterCount =
    selectedProductTypes.length +
    selectedMaterials.length +
    (selectedPrice ? 1 : 0);

  const currentSortLabel =
    sortOptions.find(
      (option) => option.value === sort
    )?.label ?? "Featured";

  function toggleProductType(
    value: ProductType
  ) {
    setSelectedProductTypes((current) =>
      current.includes(value)
        ? current.filter(
          (item) => item !== value
        )
        : [...current, value]
    );
  }

  function toggleMaterial(
    value: Material
  ) {
    setSelectedMaterials((current) =>
      current.includes(value)
        ? current.filter(
          (item) => item !== value
        )
        : [...current, value]
    );
  }

  function toggleWishlist(id: number) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter(
          (item) => item !== id
        )
        : [...current, id]
    );
  }

  function clearAll() {
    setSelectedProductTypes([]);
    setSelectedMaterials([]);
    setSelectedPrice(null);
  }

  return (
    <main className="min-h-screen bg-white text-[#071426]">
      {/* desktop breadcomb  */}

      <div className="hidden border-b border-[#071426]/10 lg:block">
        <div className="mx-auto max-w-[1500px] px-10 py-4">
          <div className="flex items-center gap-3 text-[11px]">
            <Link
              href="/"
              className="text-[#071426]/50 transition-colors hover:text-[#B88734]"
            >
              Home
            </Link>

            <span className="text-[#071426]/30">
              /
            </span>

            <span className="font-medium text-[#071426]">
              Jewellery
            </span>
          </div>
        </div>
      </div>

      {/* page title  */}

      <section className="px-4 pb-5 pt-7 text-center sm:px-6 lg:pb-8 lg:pt-10">
        <h1 className="font-serif text-[32px] font-normal leading-tight text-[#071426] sm:text-[38px] lg:text-[44px]">
          Jewellery
        </h1>

        <p className="mt-2 text-[12px] text-[#071426]/50 lg:text-[13px]">
          ({filteredProducts.length})
        </p>
      </section>
      {/* filters */}


      <section className="hidden lg:block">
        <div className="mx-auto max-w-[1500px] px-10">
          <div className="flex min-h-[72px] items-stretch justify-between border-y border-[#071426]/10">
            <div className="flex">
              {/* PRODUCT TYPE */}

              {/* PRODUCT TYPE */}

              <DesktopDropdown
                label="Product Type"
                open={openDesktopFilter === "productType"}
                onToggle={() =>
                  setOpenDesktopFilter(
                    openDesktopFilter === "productType"
                      ? null
                      : "productType"
                  )
                }
              >
                {productTypes.map((type) => (
                  <DesktopOption
                    key={type}
                    label={type}
                    checked={selectedProductTypes.includes(type)}
                    onClick={() => {
                      toggleProductType(type);

                      // close dropdown after selection
                      setOpenDesktopFilter(null);
                    }}
                  />
                ))}
              </DesktopDropdown>
              {/* MATERIAL */}

              <DesktopDropdown
                label="Material"
                open={openDesktopFilter === "material"}
                onToggle={() =>
                  setOpenDesktopFilter(
                    openDesktopFilter === "material"
                      ? null
                      : "material"
                  )
                }
              >
                {materials.map((material) => (
                  <DesktopOption
                    key={material}
                    label={material}
                    checked={selectedMaterials.includes(material)}
                    onClick={() => {
                      toggleMaterial(material);

                      // close dropdown after selection
                      setOpenDesktopFilter(null);
                    }}
                  />
                ))}
              </DesktopDropdown>
              {/* PRICE */}

              <DesktopDropdown
                label="Price"
                open={openDesktopFilter === "price"}
                onToggle={() =>
                  setOpenDesktopFilter(
                    openDesktopFilter === "price"
                      ? null
                      : "price"
                  )
                }
              >
                {priceRanges.map((price) => (
                  <DesktopOption
                    key={price.id}
                    label={price.label}
                    checked={selectedPrice?.id === price.id}
                    onClick={() => {
                      setSelectedPrice(
                        selectedPrice?.id === price.id
                          ? null
                          : price
                      );

                      // close dropdown after selection
                      setOpenDesktopFilter(null);
                    }}
                  />
                ))}
              </DesktopDropdown>
            </div>

            {/* SORT */}

            <DesktopDropdown
              label={`Sort: ${currentSortLabel}`}
              open={
                openDesktopFilter ===
                "sort"
              }
              alignRight
              onToggle={() =>
                setOpenDesktopFilter(
                  openDesktopFilter === "sort"
                    ? null
                    : "sort"
                )
              }
            >
              {sortOptions.map((option) => (
                <DesktopOption
                  key={option.value}
                  label={option.label}
                  checked={
                    sort === option.value
                  }
                  onClick={() => {
                    setSort(option.value);
                    setOpenDesktopFilter(null);
                  }}
                />
              ))}
            </DesktopDropdown>
          </div>

          {/* SELECTED FILTERS */}

          {activeFilterCount > 0 && (
            <div className="flex min-h-[55px] flex-wrap items-center gap-2 border-b border-[#071426]/10 py-3">
              {selectedProductTypes.map(
                (type) => (
                  <FilterChip
                    key={type}
                    label={type}
                    onRemove={() =>
                      toggleProductType(type)
                    }
                  />
                )
              )}

              {selectedMaterials.map(
                (material) => (
                  <FilterChip
                    key={material}
                    label={material}
                    onRemove={() =>
                      toggleMaterial(material)
                    }
                  />
                )
              )}

              {selectedPrice && (
                <FilterChip
                  label={selectedPrice.label}
                  onRemove={() =>
                    setSelectedPrice(null)
                  }
                />
              )}

              <button
                type="button"
                onClick={clearAll}
                className="ml-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B88734]"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </section>
      {/* product grid  */}

      <section className="mx-auto max-w-[1500px] px-3 pb-28 pt-3 sm:px-5 lg:px-10 lg:pb-20 lg:pt-7">
        {filteredProducts.length ? (
          <motion.div
            layout
            className="grid grid-cols-2 gap-[6px] sm:gap-3 lg:grid-cols-4 lg:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(
                (product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <ProductCard
                      product={product}
                      wished={wishlist.includes(
                        product.id
                      )}
                      onWishlist={() =>
                        toggleWishlist(
                          product.id
                        )
                      }
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center">
            <h2 className="font-serif text-[30px] text-[#071426]">
              No jewellery found
            </h2>

            <p className="mt-3 text-[13px] text-[#071426]/50">
              Try changing your filters.
            </p>

            <button
              type="button"
              onClick={clearAll}
              className="mt-6 bg-[#071426] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
      {/* mobile fixes sort  */}

      <div className="fixed inset-x-0 bottom-0 z-40 grid h-[64px] grid-cols-2 border-t border-[#071426]/15 bg-white shadow-[0_-6px_22px_rgba(7,20,38,0.10)] lg:hidden">
        <button
          type="button"
          onClick={() =>
            setSortDrawerOpen(true)
          }
          className="flex items-center justify-center gap-3 border-r border-[#071426]/15 text-[14px] font-semibold uppercase tracking-[0.02em]"
        >
          <ArrowDownUp
            size={21}
            strokeWidth={1.8}
            className="text-[#B88734]"
          />

          Sort By
        </button>

        <button
          type="button"
          onClick={() =>
            setFilterDrawerOpen(true)
          }
          className="relative flex items-center justify-center gap-3 text-[14px] font-semibold uppercase tracking-[0.02em]"
        >
          <Filter
            size={21}
            fill="currentColor"
            strokeWidth={1.5}
            className="text-[#B88734]"
          />

          Filter By

          {activeFilterCount > 0 && (
            <span className="absolute right-4 top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B88734] px-1 text-[10px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
      {/* mobile filter drawer  */}

      <AnimatePresence>
        {filterDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[70] bg-white lg:hidden"
          >
            {/* HEADER */}

            <div className="flex h-[72px] items-center border-b border-[#071426]/15 px-5">
              <button
                type="button"
                aria-label="Back"
                onClick={() =>
                  setFilterDrawerOpen(false)
                }
                className="mr-5 flex h-9 w-9 items-center justify-center"
              >
                <ChevronLeft
                  size={28}
                  strokeWidth={1.7}
                />
              </button>

              <h2 className="text-[17px] font-semibold uppercase tracking-[0.06em]">
                Filter
              </h2>
            </div>

            {/* FILTERS */}

            <div className="h-[calc(100dvh-144px)] overflow-y-auto">
              <MobileFilterSection
                title="Product Type"
                open={
                  mobileSection ===
                  "productType"
                }
                onToggle={() =>
                  setMobileSection(
                    mobileSection ===
                      "productType"
                      ? null
                      : "productType"
                  )
                }
              >
                {productTypes.map((type) => (
                  <MobileCheckbox
                    key={type}
                    label={type}
                    checked={selectedProductTypes.includes(
                      type
                    )}
                    onClick={() =>
                      toggleProductType(type)
                    }
                  />
                ))}
              </MobileFilterSection>

              <MobileFilterSection
                title="Material"
                open={
                  mobileSection ===
                  "material"
                }
                onToggle={() =>
                  setMobileSection(
                    mobileSection ===
                      "material"
                      ? null
                      : "material"
                  )
                }
              >
                {materials.map((material) => (
                  <MobileCheckbox
                    key={material}
                    label={material}
                    checked={selectedMaterials.includes(
                      material
                    )}
                    onClick={() =>
                      toggleMaterial(material)
                    }
                  />
                ))}
              </MobileFilterSection>

              <MobileFilterSection
                title="Price"
                open={
                  mobileSection === "price"
                }
                onToggle={() =>
                  setMobileSection(
                    mobileSection === "price"
                      ? null
                      : "price"
                  )
                }
              >
                {priceRanges.map((price) => (
                  <MobileCheckbox
                    key={price.id}
                    label={price.label}
                    checked={
                      selectedPrice?.id ===
                      price.id
                    }
                    onClick={() =>
                      setSelectedPrice(
                        selectedPrice?.id ===
                          price.id
                          ? null
                          : price
                      )
                    }
                  />
                ))}
              </MobileFilterSection>
            </div>

            {/* BOTTOM BUTTONS */}

            <div className="fixed inset-x-0 bottom-0 grid h-[72px] grid-cols-[0.8fr_1.2fr] border-t border-[#071426]/15 bg-white">
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#071426]"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={() =>
                  setFilterDrawerOpen(false)
                }
                className="bg-[#B88734] px-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-white"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile sort  */}

      <AnimatePresence>
        {sortDrawerOpen && (
          <>
            <motion.button
              aria-label="Close sort"
              type="button"
              onClick={() =>
                setSortDrawerOpen(false)
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[#071426]/45 lg:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed inset-x-0 bottom-0 z-[61] bg-white px-5 pb-7 pt-6 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#071426]/10 pb-5">
                <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em]">
                  Sort By
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setSortDrawerOpen(false)
                  }
                >
                  <X
                    size={22}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              <div className="pt-2">
                {sortOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => {
                      setSort(option.value);
                      setSortDrawerOpen(false);
                    }}
                    className="flex w-full items-center justify-between border-b border-[#071426]/8 py-4 text-left text-[14px]"
                  >
                    <span>{option.label}</span>

                    {sort === option.value && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B88734] text-white">
                        <Check
                          size={13}
                          strokeWidth={2}
                        />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

// product card 

function ProductCard({
  product,
  wished,
  onWishlist,
}: {
  product: (typeof products)[number];
  wished: boolean;
  onWishlist: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[7px] border border-[#D8CDBB]/70 bg-white">
      <Link
        href={`/jewellery/${product.slug}`}
        className="block"
      >
        <div className="relative aspect-[1/1.05] overflow-hidden bg-[#F8F7F5]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="
              (max-width: 1023px) 50vw,
              25vw
            "
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />

          <button
            type="button"
            aria-label={
              wished
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onWishlist();
            }}
            className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center"
          >
            <Heart
              size={24}
              strokeWidth={1.3}
              fill={
                wished
                  ? "#B88734"
                  : "#D9D9D9"
              }
              className={
                wished
                  ? "text-[#B88734]"
                  : "text-[#D9D9D9]"
              }
            />
          </button>
        </div>

        <div className="px-3 pb-4 pt-3 sm:px-4">
          <h2 className="line-clamp-2 min-h-[34px] text-[12px] font-medium leading-[17px] text-[#071426] sm:text-[13px]">
            {product.name}
          </h2>

          <p className="mt-2 text-[14px] font-semibold text-[#B88734] sm:text-[15px]">
            AED{" "}
            {product.price.toLocaleString(
              "en-AE"
            )}
          </p>

          <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.02em] text-[#071426]/65 sm:text-[10px]">
            SKU : {product.sku}
          </p>
        </div>
      </Link>
    </article>
  );
}


function DesktopDropdown({
  label,
  open,
  onToggle,
  children,
  alignRight = false,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  alignRight?: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex h-[72px] min-w-[180px] items-center justify-between gap-6 border-r border-[#071426]/10 px-6 text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors hover:bg-[#FAF8F4]"
      >
        {label}

        <ChevronDown
          size={15}
          strokeWidth={1.8}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -7,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -7,
            }}
            transition={{
              duration: 0.18,
            }}
            className={`absolute top-full z-50 min-w-[280px] border border-[#071426]/10 bg-white py-2 shadow-[0_14px_35px_rgba(7,20,38,0.13)] ${alignRight
                ? "right-0"
                : "left-0"
              }`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopOption({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-8 px-5 py-4 text-left text-[12px] transition-colors hover:bg-[#FAF7F1]"
    >
      <span>{label}</span>

      {checked && (
        <Check
          size={16}
          strokeWidth={2}
          className="text-[#B88734]"
        />
      )}
    </button>
  );
}


function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-2 border border-[#C7A05A]/40 bg-[#FBF8F2] px-3 py-2 text-[10px] text-[#071426]"
    >
      {label}

      <X
        size={12}
        strokeWidth={1.8}
      />
    </button>
  );
}


function MobileFilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#071426]/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[64px] w-full items-center justify-between px-6 text-left"
      >
        <span className="text-[14px] font-medium uppercase tracking-[0.03em]">
          {title}
        </span>

        <ChevronDown
          size={18}
          strokeWidth={1.7}
          className={`transition-transform duration-250 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        className={`grid overflow-hidden bg-[#FAF8F3] transition-[grid-template-rows] duration-300 ${open
            ? "grid-rows-[1fr]"
            : "grid-rows-[0fr]"
          }`}
      >
        <div className="min-h-0">
          <div className="px-6 py-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCheckbox({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[53px] w-full items-center justify-between border-b border-[#071426]/8 text-left text-[13px] last:border-b-0"
    >
      <span>{label}</span>

      <span
        className={`flex h-[19px] w-[19px] items-center justify-center border ${checked
            ? "border-[#B88734] bg-[#B88734] text-white"
            : "border-[#071426]/25 bg-white"
          }`}
      >
        {checked && (
          <Check
            size={13}
            strokeWidth={2.2}
          />
        )}
      </span>
    </button>
  );
}