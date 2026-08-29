"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/components/shop/cart-provider";

const GOLD = "var(--wazni-gold)";

const categories = [
  { label: "Jewellery", icon: GemIcon },
  { label: "Collections", icon: RingIcon },
  { label: "Diamonds", icon: GemIcon },
  { label: "Gold", icon: GoldIcon },
];

const menuItems = [
  ...categories.map(({ label }) => label),
  "Gifts",
  "Bespoke",
  "Offers",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const reduceMotion = useReducedMotion();
  const { totalQuantity } = useCart();
  const duration = reduceMotion ? 0 : 0.32;

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--wazni-navy)] shadow-[0_5px_18px_rgba(4,15,29,0.08)]">
      <div className="hidden lg:block">
        <div className="flex h-[46px] items-center justify-between border-b border-white/15 px-8 text-[12px] text-white xl:px-10">
          <div className="flex items-center gap-5">
            <a
              href="tel:+971501234567"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-75"
            >
              <Phone
                size={17}
                strokeWidth={1.6}
                color={GOLD}
              />

              <span>+971 50 123 4567</span>
            </a>

            <span className="h-5 w-px bg-white/25" />

            <span className="flex items-center gap-2.5">
              <MapPin
                size={18}
                strokeWidth={1.6}
                color={GOLD}
              />

              Abu Dhabi, UAE
            </span>
          </div>

          <nav
            aria-label="Utility navigation"
            className="flex items-center gap-6"
          >
            <a
              href="#stores"
              className="transition-opacity hover:opacity-70"
            >
              Stores
            </a>

            <a
              href="#about"
              className="transition-opacity hover:opacity-70"
            >
              About Us
            </a>

            <a
              href="#contact"
              className="transition-opacity hover:opacity-70"
            >
              Contact Us
            </a>

            <span className="h-5 w-px bg-white/25" />
          </nav>
        </div>

        <div className="grid h-[142px] grid-cols-[260px_minmax(320px,520px)_1fr] items-center gap-8 px-10 xl:grid-cols-[300px_minmax(360px,580px)_1fr] xl:px-12">
          <Wordmark className="justify-self-start" />

          <label className="flex w-full items-center border-b border-[var(--wazni-gold)] pb-3 text-white">
            <span className="sr-only">
              Search for jewellery
            </span>

            <input
              type="search"
              placeholder="Search for jewellery..."
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/55"
            />

            <Search
              size={21}
              strokeWidth={1.6}
              color={GOLD}
            />
          </label>

          <div className="flex items-center justify-end gap-7 text-white xl:gap-9">
            <HeaderAction
              icon={<MapPin />}
              label="Stores"
            />

            <HeaderAction
              icon={<UserRound />}
              label="Account"
            />

            <HeaderAction
              icon={<Heart />}
              label="Wishlist"
            />

            <HeaderAction
              icon={<ShoppingBag />}
              label="Bag"
              badge={totalQuantity.toString()}
              href="/bag"
            />
          </div>
        </div>

        <nav
          aria-label="Product categories"
          className="flex h-[68px] items-center gap-14 bg-[var(--wazni-ivory)] px-10 text-[13px] font-medium uppercase text-[var(--wazni-navy)] xl:gap-16 xl:px-12"
        >
          {categories.map(({ label }) => (
            <a
              key={label}
              href={`/${label.toLowerCase()}`}
              className="transition-colors hover:text-[var(--wazni-gold-dark)]"
            >
              {label}  
            </a>
          ))}
        </nav>
      </div>

      <div className="lg:hidden">
        <div className="grid h-[96px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-[104px] sm:px-7">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="w-fit justify-self-start text-[var(--wazni-gold)]"
          >
            <Menu
              size={28}
              strokeWidth={1.4}
            />
          </motion.button>

          <Wordmark compact />

          <div className="flex items-center justify-self-end gap-4 sm:gap-5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() =>
                setSearchOpen((open) => !open)
              }
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search
                size={25}
                strokeWidth={1.5}
                color={GOLD}
              />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              aria-label="Wishlist"
              className="hidden sm:block"
            >
              <Heart
                size={26}
                strokeWidth={1.5}
                color={GOLD}
              />
            </motion.button>

            <motion.div
              whileTap={{ scale: 0.9 }}
              aria-label="Shopping bag"
              className="relative"
            >
              <Link href="/bag" className="block" aria-label={`Shopping bag with ${totalQuantity} items`}>
                <ShoppingBag
                  size={27}
                  strokeWidth={1.5}
                  color={GOLD}
                />

                <motion.span
                  key={totalQuantity}
                  initial={reduceMotion ? false : { scale: 0.65, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--wazni-gold)] px-1 text-[10px] font-medium text-[var(--wazni-navy)]"
                >
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 64,
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden border-t border-white/10 px-4 sm:px-7"
            >
              <label className="flex h-[64px] items-center border-b border-[var(--wazni-gold)] text-white">
                <span className="sr-only">
                  Search for jewellery
                </span>

                <input
                  autoFocus
                  type="search"
                  placeholder="Search for jewellery..."
                  className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/55"
                />

                <Search
                  size={20}
                  strokeWidth={1.5}
                  color={GOLD}
                />
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        <nav
          aria-label="Product categories"
          className="grid h-[88px] grid-cols-4 bg-[var(--wazni-ivory)] text-[var(--wazni-navy)] sm:h-[96px]"
        >
          {categories.map(
            ({ label, icon: Icon }) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="flex min-w-0 flex-col items-center justify-center gap-2 border-r border-[var(--wazni-gold)]/25 px-1 last:border-r-0"
              >
                <Icon className="h-6 w-8 shrink-0 text-[var(--wazni-gold-dark)] sm:h-7 sm:w-9" />

                <span className="max-w-full whitespace-nowrap text-center text-[9px] font-medium uppercase tracking-[-0.01em] sm:text-[11px] sm:tracking-normal">
                  {label}
                </span>
              </a>
            )
          )}
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          >
            <motion.button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/45"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-full w-[min(88vw,380px)] flex-col bg-[var(--wazni-navy)] text-white shadow-2xl"
            >
              <div className="flex h-[94px] items-center justify-between border-b border-white/15 px-5">
                <Wordmark compact />

                <button
                  type="button"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  aria-label="Close menu"
                >
                  <X
                    size={27}
                    strokeWidth={1.4}
                    color={GOLD}
                  />
                </button>
              </div>

              <nav className="px-5 py-4">
                {menuItems.map(
                  (item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      initial={{
                        opacity: 0,
                        x: -18,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: reduceMotion
                          ? 0
                          : 0.05 +
                            index * 0.035,
                      }}
                      className="block border-b border-white/10 py-4 text-[16px]"
                    >
                      {item}
                    </motion.a>
                  )
                )}
              </nav>

              <div className="mt-auto border-t border-white/10 px-5 py-6">
                <a
                  href="tel:+971501234567"
                  className="mb-4 flex items-center gap-3 text-[13px] text-white/75"
                >
                  <Phone
                    size={17}
                    color={GOLD}
                  />
                  +971 50 123 4567
                </a>

                <div className="flex items-center gap-3 text-[13px] text-white/75">
                  <MapPin
                    size={17}
                    color={GOLD}
                  />
                  Abu Dhabi, UAE
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Wordmark({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Wazni Jewellery home"
      className={`flex flex-col items-center ${className}`}
      style={{
        color: "var(--wazni-gold)",
      }}
    >
      <span
        className={`${
          compact
            ? "text-[28px] sm:text-[34px]"
            : "text-[48px] xl:text-[54px]"
        } font-light leading-none tracking-[0.22em] [text-indent:0.22em]`}
        style={{
          color: "var(--wazni-gold)",
        }}
      >
        WAZNI
      </span>

      <span
        className={`${
          compact
            ? "mt-1.5 text-[9px] sm:text-[11px]"
            : "mt-2 text-[17px] xl:text-[19px]"
        } font-light tracking-[0.35em] [text-indent:0.35em]`}
        style={{
          color: "var(--wazni-gold)",
        }}
      >
        JEWELLERY
      </span>
    </Link>
  );
}

function HeaderAction({
  icon,
  label,
  badge,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="relative [&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-[1.4] [&>svg]:text-[var(--wazni-gold)]">
        {icon}

        {badge !== undefined && (
          <motion.span
            key={badge}
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--wazni-gold)] px-1 text-[9px] font-medium text-[var(--wazni-navy)]"
          >
            {Number(badge) > 99 ? "99+" : badge}
          </motion.span>
        )}
      </span>

      <span className="text-[11px] text-white">{label}</span>
    </>
  );

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex min-w-[54px] flex-col items-center gap-2"
    >
      {href ? (
        <Link href={href} aria-label={`${label}, ${badge ?? 0} items`} className="flex flex-col items-center gap-2">
          {content}
        </Link>
      ) : (
        <button type="button" className="flex flex-col items-center gap-2">{content}</button>
      )}
    </motion.div>
  );
}

type IconProps = {
  className?: string;
};

function GemIcon({
  className,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M13 8h38l9 12-28 25L4 20 13 8Z" />
      <path d="m13 8 9 12L32 8l10 12 9-12M4 20h56M22 20l10 25 10-25" />
    </svg>
  );
}

function RingIcon({
  className,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 64 54"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="33"
        r="16"
      />

      <path d="m25 12 7 6 7-6-4-6h-6l-4 6Z" />

      <path d="m29 6 3 6 3-6" />
    </svg>
  );
}

function GoldIcon({
  className,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 64 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 24h25l4 17H5l4-17ZM34 20h22l4 17H38l-4-17ZM24 7h22l4 17H20l4-17Z" />

      <path d="m24 7-4 17M46 7l4 17M34 20l4 17" />
    </svg>
  );
}
