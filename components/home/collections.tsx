"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Diamond } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Diamonds",
    image: "/collections/diamond.png",
    href: "/collections/diamonds",
    animation: "left",
  },
  {
    title: "Sapphire",
    image: "/collections/sphere.png",
    href: "/collections/sapphire",
    animation: "right",
  },
  {
    title: "Statement Jewellery",
    image: "/collections/sign.png",
    href: "/collections/statement-jewellery",
    animation: "scale",
  },
] as const;

export default function Collections() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="collections"
      className="overflow-hidden bg-[var(--wazni-ivory)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12">
        <motion.header
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-9 max-w-[760px] text-center sm:mb-12 lg:mb-14"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--wazni-gold-dark)] sm:text-[11px]">
            Signature Collections
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[var(--wazni-gold)]/50" />

            <Diamond
              size={15}
              strokeWidth={1.4}
              className="text-[var(--wazni-gold)]"
            />

            <span className="h-px w-10 bg-[var(--wazni-gold)]/50" />
          </div>

          <h2 className="mt-5 font-serif text-[36px] font-normal leading-[1.05] tracking-[-0.035em] text-[var(--wazni-navy)] sm:text-[44px] lg:text-[54px]">
            Timeless by Design
          </h2>

          <p className="mx-auto mt-4 max-w-[570px] text-[13px] leading-6 text-[var(--wazni-muted)] sm:text-[14px] lg:text-[15px]">
            Discover our most iconic collections, crafted to be treasured
            forever.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <CollectionCard
            collection={collections[0]}
            reduceMotion={reduceMotion}
          />

          <CollectionCard
            collection={collections[1]}
            reduceMotion={reduceMotion}
          />

          <div className="lg:col-span-2">
            <CollectionCard
              collection={collections[2]}
              reduceMotion={reduceMotion}
              wide
            />
          </div>
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex items-center justify-center gap-4 sm:mt-12"
        >
          <span className="hidden h-px w-20 bg-[var(--wazni-gold)]/35 sm:block" />

          <p className="max-w-[450px] text-center text-[9px] font-medium uppercase leading-5 tracking-[0.22em] text-[var(--wazni-gold-dark)] sm:text-[10px]">
            Crafted to celebrate life&apos;s most precious moments.
          </p>

          <span className="hidden h-px w-20 bg-[var(--wazni-gold)]/35 sm:block" />
        </motion.div>

        <div className="mt-3 flex justify-center">
          <Diamond
            size={14}
            strokeWidth={1.4}
            className="text-[var(--wazni-gold)]"
          />
        </div>
      </div>
    </section>
  );
}

type Collection = (typeof collections)[number];

function CollectionCard({
  collection,
  wide = false,
  reduceMotion,
}: {
  collection: Collection;
  wide?: boolean;
  reduceMotion: boolean | null;
}) {
  const getInitialAnimation = () => {
    if (reduceMotion) {
      return false;
    }

    if (collection.animation === "left") {
      return {
        opacity: 0,
        x: -110,
      };
    }

    if (collection.animation === "right") {
      return {
        opacity: 0,
        x: 110,
      };
    }

    return {
      opacity: 0,
      scale: 0,
    };
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      <Link
        href={collection.href}
        className={`group relative block overflow-hidden rounded-[14px] bg-[var(--wazni-navy)] ${
          wide
            ? "h-[330px] sm:h-[420px] lg:h-[420px]"
            : "h-[330px] sm:h-[420px] lg:h-[450px]"
        }`}
      >
        <Image
          src={collection.image}
          alt={`${collection.title} collection`}
          fill
          sizes={
            wide
              ? "100vw"
              : "(max-width: 1023px) 100vw, 50vw"
          }
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--wazni-navy)]/90 via-[var(--wazni-navy)]/10 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--wazni-navy)]/35 via-transparent to-transparent opacity-70" />

        <div className="absolute bottom-0 left-0 z-10 w-full p-6 sm:p-8 lg:p-9">
          <motion.div
            initial={false}
            whileHover={{
              x: 4,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="mb-4 flex h-8 w-8 items-center justify-center text-[var(--wazni-gold)]">
              <CollectionSymbol title={collection.title} />
            </div>

            <h3
              className={`font-serif font-normal leading-none tracking-[-0.025em] text-white ${
                wide
                  ? "text-[30px] sm:text-[38px] lg:text-[44px]"
                  : "text-[30px] sm:text-[36px] lg:text-[40px]"
              }`}
            >
              {collection.title}
            </h3>

            <span className="mt-5 block h-px w-12 bg-[var(--wazni-gold)] transition-all duration-500 group-hover:w-20" />

            <div className="mt-5 inline-flex items-center gap-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--wazni-gold-light)] sm:text-[10px]">
                Explore Collection
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="text-[var(--wazni-gold-light)] transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

function CollectionSymbol({
  title,
}: {
  title: string;
}) {
  if (title === "Diamonds") {
    return (
      <Diamond
        size={28}
        strokeWidth={1.3}
      />
    );
  }

  if (title === "Sapphire") {
    return (
      <span className="block h-7 w-5 rotate-12 rounded-[50%] border-2 border-[var(--wazni-gold)]" />
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M16 2.5L18.8 10.2L26 6L21.8 13.2L29.5 16L21.8 18.8L26 26L18.8 21.8L16 29.5L13.2 21.8L6 26L10.2 18.8L2.5 16L10.2 13.2L6 6L13.2 10.2L16 2.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}