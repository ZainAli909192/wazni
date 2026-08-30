"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import Link from "next/link";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import HeaderSearch from "@/components/layout/header-search";
import {
  FilledInstagramIcon,
  FilledWhatsAppIcon,
  WAZNI_SOCIALS,
} from "@/components/layout/footer";
import { useStore } from "@/components/providers/store-provider";
import { useCart } from "@/components/shop/cart-provider";
import { getPublicCatalog } from "@/lib/storefront/client";
import type { StorefrontCategory } from "@/lib/storefront/types";

const GOLD = "var(--wazni-gold)";

const STORE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Wazni%20Jewellery%2C%20Al%20Maqta%27%20St%20-%20Rabdan%20-%20RB2%20-%20Abu%20Dhabi";

const menuItems = [
  {
    label: "Gifts",
    href: "/gifts",
  },
  {
    label: "Bespoke",
    href: "/bespoke",
  },
  {
    label: "Offers",
    href: "/offers",
  },
];

export default function Header() {
  const [categories, setCategories] = useState<StorefrontCategory[]>([]);
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const reduceMotion =
    useReducedMotion();

  const { totalQuantity } =
    useCart();

  const {
    ready,
    isAuthenticated,
  } = useStore();

  const accountHref =
    ready && isAuthenticated
      ? "/account"
      : "/account/login";

  const duration =
    reduceMotion ? 0 : 0.32;

  const entranceDuration =
    reduceMotion ? 0 : 0.7;

  const ease = [
    0.22,
    1,
    0.36,
    1,
  ] as const;

  useEffect(() => { let active = true; getPublicCatalog().then((catalog) => active && setCategories(catalog.categories)).catch(() => undefined); return () => { active = false; }; }, []);

  const fromTop = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : -25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: entranceDuration,
        ease,
      },
    },
  };

  const fromBottom = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: entranceDuration,
        ease,
      },
    },
  };

  const fromLeft = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: entranceDuration,
        ease,
      },
    },
  };

  const fromRight = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: entranceDuration,
        ease,
      },
    },
  };

  const scaleIn = {
    hidden: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.75,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: entranceDuration,
        ease,
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren:
          reduceMotion ? 0 : 0.08,
      },
    },
  };

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--wazni-navy)] shadow-[0_5px_18px_rgba(4,15,29,0.08)]">
      <div className="hidden lg:block">
        <motion.div
          variants={fromTop}
          initial="hidden"
          animate="visible"
          className="flex h-[46px] items-center justify-between border-b border-white/15 px-8 text-[12px] text-white xl:px-10"
        >
          <div className="flex items-center gap-5">
            <a
              href="tel:+97125581720"
              className="flex items-center gap-2.5 !text-white !no-underline transition-opacity hover:opacity-75"
            >
              <Phone
                size={17}
                strokeWidth={1.6}
                color={GOLD}
              />

              <span>
                +971 2 558 1720
              </span>
            </a>

            <span className="h-5 w-px bg-white/25" />

            <a
              href={STORE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 !text-white !no-underline transition-opacity hover:opacity-75"
            >
              <MapPin
                size={18}
                strokeWidth={1.6}
                color={GOLD}
              />

              <span>
                Wazni Jewellery, Abu Dhabi,
                UAE
              </span>
            </a>
          </div>

          <nav
            aria-label="Utility navigation"
            className="flex items-center gap-5"
          >
         

            <Link
              href="/about"
              className="!text-white !no-underline transition-opacity hover:opacity-70"
            >
              About Us
            </Link>

           

            <span className="h-5 w-px bg-white/25" />

            <div className="flex items-center gap-2">
              <motion.a
                href={
                  WAZNI_SOCIALS.instagram
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wazni Jewellery on Instagram"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.08,
                      }
                }
                whileTap={{
                  scale: 0.94,
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--wazni-gold)]/40 !text-[var(--wazni-gold)] !no-underline transition-all duration-300 hover:border-[var(--wazni-gold)] hover:bg-[var(--wazni-gold)] hover:!text-[var(--wazni-navy)]"
              >
                <FilledInstagramIcon className="h-[15px] w-[15px]" />
              </motion.a>

              <motion.a
                href={
                  WAZNI_SOCIALS.whatsapp
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Wazni Jewellery on WhatsApp"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.08,
                      }
                }
                whileTap={{
                  scale: 0.94,
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--wazni-gold)]/40 !text-[var(--wazni-gold)] !no-underline transition-all duration-300 hover:border-[var(--wazni-gold)] hover:bg-[var(--wazni-gold)] hover:!text-[var(--wazni-navy)]"
              >
                <FilledWhatsAppIcon className="h-[16px] w-[16px]" />
              </motion.a>
            </div>
          </nav>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid h-[142px] grid-cols-[260px_minmax(320px,520px)_1fr] items-center gap-8 px-10 xl:grid-cols-[300px_minmax(360px,580px)_1fr] xl:px-12"
        >
          <motion.div
            variants={scaleIn}
            className="justify-self-start"
          >
            <Wordmark />
          </motion.div>

          <motion.div
            variants={fromBottom}
          >
            <HeaderSearch />
          </motion.div>

          <motion.div
            variants={stagger}
            className="flex items-center justify-end gap-7 text-white xl:gap-9"
          >
            <motion.div
              variants={fromRight}
            >
              <HeaderAction
                icon={<MapPin />}
                label="Stores"
                href={STORE_MAP_URL}
                external
              />
            </motion.div>

            <motion.div
              variants={fromRight}
            >
              <HeaderAction
                icon={
                  <UserRound />
                }
                label="Account"
                href={accountHref}
              />
            </motion.div>

            <motion.div
              variants={fromRight}
            >
              <HeaderAction
                icon={
                  <ShoppingBag />
                }
                label="Bag"
                badge={totalQuantity.toString()}
                href="/bag"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.nav
          aria-label="Product categories"
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex h-[68px] items-center gap-14 bg-[var(--wazni-ivory)] px-10 text-[13px] font-medium uppercase text-[var(--wazni-navy)] xl:gap-16 xl:px-12"
        >
          {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={fromBottom}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="group relative flex h-full items-center"
              >
                <Link
                  href={`/search?q=${encodeURIComponent(category.slug)}`}
                  className="!text-[var(--wazni-navy)] !no-underline transition-colors hover:!text-[var(--wazni-gold-dark)]"
                >
                  {category.name}
                </Link>
                {category.children.length > 0 && <div className="invisible absolute left-0 top-full z-[110] min-w-[220px] translate-y-2 border border-[#071426]/10 bg-white py-2 opacity-0 shadow-[0_14px_35px_rgba(7,20,38,0.13)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">{category.children.map((child) => <Link key={child.id} href={`/search?q=${encodeURIComponent(child.slug)}`} className="block px-5 py-3 !text-[12px] !text-[var(--wazni-navy)] !no-underline hover:bg-[#FAF7F1] hover:!text-[var(--wazni-gold-dark)]">{child.name}</Link>)}</div>}
              </motion.div>
            )
          )}
        </motion.nav>
      </div>

      <div className="lg:hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid h-[96px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-[104px] sm:px-7"
        >
          <motion.button
            variants={fromLeft}
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Open menu"
            className="w-fit justify-self-start text-[var(--wazni-gold)]"
          >
            <Menu
              size={28}
              strokeWidth={1.4}
            />
          </motion.button>

          <motion.div
            variants={scaleIn}
          >
            <Wordmark compact />
          </motion.div>

          <motion.div
            variants={stagger}
            className="flex items-center justify-self-end gap-4 sm:gap-5"
          >
            <motion.button
              variants={fromRight}
              whileTap={{
                scale: 0.9,
              }}
              type="button"
              onClick={() =>
                setSearchOpen(
                  (open) => !open
                )
              }
              aria-label="Search"
              aria-expanded={
                searchOpen
              }
            >
              <Search
                size={25}
                strokeWidth={1.5}
                color={GOLD}
              />
            </motion.button>

            <motion.div
              variants={fromRight}
              whileTap={{
                scale: 0.9,
              }}
              className="relative"
            >
              <Link
                href="/bag"
                className="block !no-underline"
                aria-label={`Shopping bag with ${totalQuantity} items`}
              >
                <ShoppingBag
                  size={27}
                  strokeWidth={1.5}
                  color={GOLD}
                />

                <motion.span
                  key={totalQuantity}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          scale: 0.65,
                          opacity: 0,
                        }
                  }
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--wazni-gold)] px-1 text-[10px] font-medium text-[var(--wazni-navy)]"
                >
                  {totalQuantity > 99
                    ? "99+"
                    : totalQuantity}
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence
          initial={false}
        >
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
                ease,
              }}
              className="relative z-[90] overflow-visible border-t border-white/10 px-4 sm:px-7"
            >
              <HeaderSearch
                mobile
                onNavigate={() =>
                  setSearchOpen(false)
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.nav
          aria-label="Product categories"
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid h-[88px] grid-cols-4 bg-[var(--wazni-ivory)] text-[var(--wazni-navy)] sm:h-[96px]"
        >
          {categories.slice(0, 4).map((category) => {
              const Icon = category.slug === "collections" ? RingIcon : category.slug === "gold" ? GoldIcon : GemIcon;
              return (
              <motion.div
                key={category.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: reduceMotion
                      ? 0
                      : 22,
                    scale: reduceMotion
                      ? 1
                      : 0.82,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration:
                        entranceDuration,
                      ease,
                    },
                  },
                }}
                whileTap={{
                  scale: 0.94,
                }}
              >
                <Link
                  href={`/search?q=${encodeURIComponent(category.slug)}`}
                  className="flex h-[88px] min-w-0 flex-col items-center justify-center gap-2 border-r border-[var(--wazni-gold)]/25 px-1 !text-[var(--wazni-navy)] !no-underline last:border-r-0 sm:h-[96px]"
                >
                  <Icon className="h-6 w-8 shrink-0 text-[var(--wazni-gold-dark)] sm:h-7 sm:w-9" />

                  <span className="max-w-full whitespace-nowrap text-center text-[9px] font-medium uppercase tracking-[-0.01em] sm:text-[11px] sm:tracking-normal">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            )}
          )}
        </motion.nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[120] lg:hidden"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration,
            }}
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() =>
                setMenuOpen(false)
              }
              className="absolute inset-0 bg-black/45"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                duration,
                ease,
              }}
              className="relative flex h-full w-[min(88vw,380px)] flex-col bg-[var(--wazni-navy)] text-white shadow-2xl"
            >
              <div className="flex h-[94px] items-center justify-between border-b border-white/15 px-5">
                <Wordmark compact />

                <motion.button
                  type="button"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  whileTap={{
                    scale: 0.9,
                  }}
                  aria-label="Close menu"
                >
                  <X
                    size={27}
                    strokeWidth={1.4}
                    color={GOLD}
                  />
                </motion.button>
              </div>

              <nav className="overflow-y-auto px-5 py-4">
                {categories.map((category) => <div key={category.id}><Link href={`/search?q=${encodeURIComponent(category.slug)}`} onClick={() => setMenuOpen(false)} className="block border-b border-white/10 py-4 !text-[16px] !text-white !no-underline transition-colors hover:!text-[var(--wazni-gold)]">{category.name}</Link>{category.children.map((child) => <Link key={child.id} href={`/search?q=${encodeURIComponent(child.slug)}`} onClick={() => setMenuOpen(false)} className="block border-b border-white/10 py-3 pl-5 !text-[13px] !text-white/75 !no-underline hover:!text-[var(--wazni-gold)]">{child.name}</Link>)}</div>)}
                {menuItems.map(
                  (
                    item,
                    index
                  ) => (
                    <motion.div
                      key={
                        item.label
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
                        delay:
                          reduceMotion
                            ? 0
                            : 0.05 +
                              index *
                                0.035,
                      }}
                    >
                      <Link
                        href={
                          item.href
                        }
                        onClick={() =>
                          setMenuOpen(
                            false
                          )
                        }
                        className="block border-b border-white/10 py-4 !text-[16px] !text-white !no-underline transition-colors hover:!text-[var(--wazni-gold)]"
                      >
                        {
                          item.label
                        }
                      </Link>
                    </motion.div>
                  )
                )}

                <Link
                  href={accountHref}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex items-center gap-3 border-b border-white/10 py-4 !text-[16px] !text-white !no-underline"
                >
                  <UserRound
                    size={18}
                    color={GOLD}
                  />

                  {isAuthenticated
                    ? "My Account"
                    : "Sign In / Register"}
                </Link>

                <Link
                  href="/about"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="block border-b border-white/10 py-4 !text-[16px] !text-white !no-underline"
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="block border-b border-white/10 py-4 !text-[16px] !text-white !no-underline"
                >
                  Contact Us
                </Link>
              </nav>

              <div className="mt-auto border-t border-white/10 px-5 py-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <motion.a
                    href={
                      WAZNI_SOCIALS.instagram
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Wazni Jewellery on Instagram"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    whileTap={{
                      scale: 0.92,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--wazni-gold)]/45 bg-[var(--wazni-gold)]/10 !text-[var(--wazni-gold)] !no-underline transition-colors hover:bg-[var(--wazni-gold)] hover:!text-[var(--wazni-navy)]"
                  >
                    <FilledInstagramIcon className="h-[18px] w-[18px]" />
                  </motion.a>

                  <motion.a
                    href={
                      WAZNI_SOCIALS.whatsapp
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact Wazni Jewellery on WhatsApp"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    whileTap={{
                      scale: 0.92,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--wazni-gold)]/45 bg-[var(--wazni-gold)]/10 !text-[var(--wazni-gold)] !no-underline transition-colors hover:bg-[var(--wazni-gold)] hover:!text-[var(--wazni-navy)]"
                  >
                    <FilledWhatsAppIcon className="h-[19px] w-[19px]" />
                  </motion.a>

                  <div className="ml-2">
                    <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--wazni-gold)]">
                      Follow Wazni
                    </p>

                    <p className="mt-1 text-[11px] text-white/50">
                      Stay connected
                      with us
                    </p>
                  </div>
                </div>

                <a
                  href="tel:+97125581720"
                  className="mb-4 flex items-center gap-3 !text-[13px] !text-white/75 !no-underline"
                >
                  <Phone
                    size={17}
                    color={GOLD}
                  />

                  +971 2 558 1720
                </a>

                <a
                  href={STORE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 !text-[13px] !text-white/75 !no-underline"
                >
                  <MapPin
                    size={17}
                    color={GOLD}
                  />

                  Abu Dhabi, UAE
                </a>
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
      className={`flex flex-col items-center !no-underline ${className}`}
      style={{
        color:
          "var(--wazni-gold)",
      }}
    >
      <span
        className={`${
          compact
            ? "text-[28px] sm:text-[34px]"
            : "text-[48px] xl:text-[54px]"
        } font-light leading-none tracking-[0.22em] [text-indent:0.22em]`}
        style={{
          color:
            "var(--wazni-gold)",
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
          color:
            "var(--wazni-gold)",
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
  external = false,
}: {
  icon: ReactNode;
  label: string;
  badge?: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="relative [&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-[1.4] [&>svg]:text-[var(--wazni-gold)]">
        {icon}

        {badge !== undefined && (
          <motion.span
            key={badge}
            initial={{
              scale: 0.65,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--wazni-gold)] px-1 text-[9px] font-medium text-[var(--wazni-navy)]"
          >
            {Number(badge) > 99
              ? "99+"
              : badge}
          </motion.span>
        )}
      </span>

      <span className="text-[11px] text-white">
        {label}
      </span>
    </>
  );

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="flex min-w-[54px] flex-col items-center gap-2"
    >
      {href ? (
        external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex flex-col items-center gap-2 !text-white !no-underline"
          >
            {content}
          </a>
        ) : (
          <Link
            href={href}
            aria-label={
              badge !== undefined
                ? `${label}, ${badge} items`
                : label
            }
            className="flex flex-col items-center gap-2 !text-white !no-underline"
          >
            {content}
          </Link>
        )
      ) : (
        <button
          type="button"
          className="flex flex-col items-center gap-2"
        >
          {content}
        </button>
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
