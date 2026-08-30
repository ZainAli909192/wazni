"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getPublicCatalog } from "@/lib/storefront/client";
import type { StorefrontProduct } from "@/lib/storefront/types";

type HeaderSearchProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export default function HeaderSearch({
  mobile = false,
  onNavigate,
}: HeaderSearchProps) {
  const router = useRouter();

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const [query, setQuery] =
    useState("");

  const [focused, setFocused] =
    useState(false);
  const [products, setProducts] = useState<StorefrontProduct[]>([]);

  const cleanQuery =
    normalize(query);

  const results = useMemo(() => {
    if (!cleanQuery) {
      return [];
    }

    return products
      .filter((product) => {
        const searchable =
          normalize(
            [
              product.name,
              product.sku,
              product.productType,
              product.material,
            ].join(" ")
          );

        return searchable.includes(
          cleanQuery
        );
      })
      .filter(
        (
          product,
          index,
          array
        ) =>
          array.findIndex(
            (item) =>
              item.slug ===
              product.slug
          ) === index
      )
      .slice(0, 6);
  }, [cleanQuery, products]);

  const showDropdown =
    focused &&
    cleanQuery.length > 0;

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setFocused(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => { let active = true; getPublicCatalog().then((catalog) => active && setProducts(catalog.products)).catch(() => undefined); return () => { active = false; }; }, []);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      return;
    }

    setFocused(false);

    onNavigate?.();

    router.push(
      `/search?q=${encodeURIComponent(
        value
      )}`
    );
  }

  function handleViewAll() {
    const value = query.trim();

    if (!value) {
      return;
    }

    setFocused(false);

    onNavigate?.();

    router.push(
      `/search?q=${encodeURIComponent(
        value
      )}`
    );
  }

  function clearSearch() {
    setQuery("");
    setFocused(true);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      <form
        onSubmit={handleSubmit}
        role="search"
        className={`flex w-full items-center text-white ${
          mobile
            ? "h-[64px] border-b border-[var(--wazni-gold)]"
            : "border-b border-[var(--wazni-gold)] pb-3"
        }`}
      >
        <label
          htmlFor={
            mobile
              ? "mobile-header-search"
              : "desktop-header-search"
          }
          className="sr-only"
        >
          Search for jewellery
        </label>

        <input
          id={
            mobile
              ? "mobile-header-search"
              : "desktop-header-search"
          }
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value
            )
          }
          onFocus={() =>
            setFocused(true)
          }
          placeholder="Search for jewellery..."
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/55"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center text-white/50 transition-colors hover:text-white"
          >
            <X
              size={16}
              strokeWidth={1.5}
            />
          </button>
        )}

        <button
          type="submit"
          aria-label="Search jewellery"
          className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--wazni-gold)]"
        >
          <Search
            size={
              mobile ? 20 : 21
            }
            strokeWidth={1.6}
          />
        </button>
      </form>

      {showDropdown && (
        <div
          className={`absolute z-[100] overflow-hidden border border-[#071426]/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] ${
            mobile
              ? "left-0 right-0 top-[64px]"
              : "left-0 right-0 top-[calc(100%+10px)]"
          }`}
        >
          {results.length > 0 ? (
            <>
              <div className="max-h-[390px] overflow-y-auto">
                {results.map(
                  (product) => (
                    <Link
                      key={
                        product.slug
                      }
                      href={`/jewellery/${product.slug}`}
                      onClick={() => {
                        setFocused(
                          false
                        );

                        setQuery("");

                        onNavigate?.();
                      }}
                      className="group flex items-center gap-3 border-b border-[#071426]/10 bg-white p-3 !text-[#071426] !no-underline transition-colors last:border-b-0 hover:bg-[#F8F5EF] sm:gap-4 sm:p-4"
                    >
                      <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden bg-[#F8F5EF] sm:h-[72px] sm:w-[72px]">
                        <Image
                          src={
                            product.image
                          }
                          alt={
                            product.name
                          }
                          fill
                          sizes="72px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-[15px] text-[#071426] sm:text-[17px]">
                          {
                            product.name
                          }
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[8px] uppercase tracking-[0.06em] text-[#071426]/45">
                          <span>
                            {
                              product.productType
                            }
                          </span>

                          <span>
                            •
                          </span>

                          <span>
                            {
                              product.material
                            }
                          </span>
                        </div>

                        <p className="mt-2 text-[12px] font-semibold text-[#B88734]">
                          AED{" "}
                          {product.price.toLocaleString(
                            "en-AE"
                          )}
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={
                  handleViewAll
                }
                className="flex h-[50px] w-full items-center justify-center bg-[#071426] px-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#10233D]"
              >
                View All Results
              </button>
            </>
          ) : (
            <div className="px-5 py-8 text-center">
              <Search
                size={22}
                strokeWidth={1.4}
                className="mx-auto text-[#B88734]"
              />

              <p className="mt-3 font-serif text-[17px] text-[#071426]">
                No jewellery found
              </p>

              <p className="mx-auto mt-2 max-w-[280px] text-[9px] leading-5 text-[#071426]/45">
                Try another product
                name, material,
                product type or SKU.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
