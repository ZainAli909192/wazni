import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { products } from "@/lib/shop-data";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const query =
    params.q?.trim() ?? "";

  const normalizedQuery =
    normalize(query);

  const searchResults =
    normalizedQuery
      ? products
          .filter((product) => {
            if (normalizedQuery === "jewellery") {
              return true;
            }

            if (normalizedQuery === "collections") {
              return product.featured === true;
            }

            if (normalizedQuery === "diamonds") {
              return normalize(product.name).includes("diamond");
            }

            if (normalizedQuery === "gold") {
              return normalize(product.material).includes("gold");
            }

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
              normalizedQuery
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
      : [];

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#071426]">
      <section className="bg-[#071426] px-4 py-10 text-center text-white sm:px-6 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[900px]">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#C7A05A]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#C7A05A] sm:text-[9px]">
              Wazni Jewellery
            </p>

            <span className="h-px w-7 bg-[#C7A05A]" />
          </div>

          <h1 className="mt-4 font-serif text-[36px] font-normal capitalize sm:text-[46px] lg:text-[52px]">
            {query || "Search"}
          </h1>

          {query && (
            <p className="mt-3 text-[10px] text-white/55 sm:text-[11px]">
              Explore Wazni {query.toLowerCase()}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        {!query ? (
          <EmptySearch />
        ) : searchResults.length ===
          0 ? (
          <NoResults
            query={query}
          />
        ) : (
          <>
            <div className="mb-6 flex items-end justify-between gap-5 border-b border-[#071426]/10 pb-4 sm:mb-8">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#B88734]">
                  Search Results
                </p>

                <h2 className="mt-2 font-serif text-[25px] text-[#071426] sm:text-[30px]">
                  {searchResults.length}{" "}
                  {searchResults.length ===
                  1
                    ? "Product"
                    : "Products"}
                </h2>
              </div>

              <Link
                href="/jewellery"
                className="shrink-0 !text-[8px] font-semibold uppercase tracking-[0.12em] !text-[#071426] !no-underline transition-colors hover:!text-[#B88734] sm:!text-[9px]"
              >
                View All Jewellery
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-5 sm:gap-x-4 sm:gap-y-7 md:grid-cols-3 lg:grid-cols-4">
              {searchResults.map(
                (product) => (
                  <Link
                    key={
                      product.slug
                    }
                    href={`/jewellery/${product.slug}`}
                    className="group overflow-hidden border border-[#071426]/8 bg-white !text-[#071426] !no-underline"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#F9F7F3]">
                      <Image
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        fill
                        sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.035] sm:p-5"
                      />
                    </div>

                    <div className="px-3 pb-5 pt-4 sm:px-4">
                      <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-[#B88734] sm:text-[8px]">
                        {
                          product.productType
                        }
                      </p>

                      <h3 className="mt-2 line-clamp-2 min-h-[38px] font-serif text-[16px] leading-[19px] text-[#071426] sm:min-h-[44px] sm:text-[19px] sm:leading-[22px]">
                        {
                          product.name
                        }
                      </h3>

                      <p className="mt-2 text-[8px] uppercase tracking-[0.06em] text-[#071426]/40">
                        {
                          product.material
                        }
                      </p>

                      <p className="mt-3 text-[14px] font-semibold text-[#B88734] sm:text-[16px]">
                        AED{" "}
                        {product.price.toLocaleString(
                          "en-AE"
                        )}
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-[0.04em] text-[#071426]/35">
                        SKU:{" "}
                        {product.sku}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function EmptySearch() {
  return (
    <div className="mx-auto max-w-[600px] border border-[#071426]/8 bg-white px-6 py-14 text-center sm:py-16">
      <Search
        size={28}
        strokeWidth={1.4}
        className="mx-auto text-[#B88734]"
      />

      <h2 className="mt-5 font-serif text-[30px] text-[#071426]">
        Find Your Jewellery
      </h2>

      <p className="mx-auto mt-3 max-w-[390px] text-[10px] leading-5 text-[#071426]/50">
        Use the search in the
        header to find jewellery
        by name, SKU, product
        type or material.
      </p>

      <Link
        href="/jewellery"
        className="mt-7 inline-flex h-[52px] items-center justify-center bg-[#C7A05A] px-8 !text-[9px] font-bold uppercase tracking-[0.14em] !text-[#071426] !no-underline transition-colors hover:bg-[#B88734]"
      >
        Browse Jewellery
      </Link>
    </div>
  );
}

function NoResults({
  query,
}: {
  query: string;
}) {
  return (
    <div className="mx-auto max-w-[650px] border border-[#071426]/8 bg-white px-6 py-14 text-center sm:py-16">
      <Search
        size={28}
        strokeWidth={1.4}
        className="mx-auto text-[#B88734]"
      />

      <h2 className="mt-5 font-serif text-[30px] text-[#071426]">
        No Results Found
      </h2>

      <p className="mx-auto mt-3 max-w-[430px] text-[10px] leading-5 text-[#071426]/50">
        We couldn&apos;t find a
        product matching
        &ldquo;{query}&rdquo;.
        Try another jewellery
        name, SKU, product type
        or material.
      </p>

      <Link
        href="/jewellery"
        className="mt-7 inline-flex h-[52px] items-center justify-center bg-[#C7A05A] px-8 !text-[9px] font-bold uppercase tracking-[0.14em] !text-[#071426] !no-underline transition-colors hover:bg-[#B88734]"
      >
        View All Jewellery
      </Link>
    </div>
  );
}
