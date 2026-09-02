"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Home,
  MapPin,
  MoreHorizontal,
  Package,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
];

export default function Header() {
  const pathname = usePathname();

  const [categories, setCategories] =
    useState<StorefrontCategory[]>([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

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

  const ordersHref =
    ready && isAuthenticated
      ? "/account/orders"
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

  useEffect(() => {
    let active = true;

    getPublicCatalog()
      .then((catalog) => {
        if (active) {
          setCategories(
            catalog.categories
          );
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

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

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const fromTop = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : -25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration:
          entranceDuration,
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
        duration:
          entranceDuration,
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
        duration:
          entranceDuration,
        ease,
      },
    },
  };

  const scaleIn = {
    hidden: {
      opacity: 0,
      scale:
        reduceMotion
          ? 1
          : 0.75,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration:
          entranceDuration,
        ease,
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren:
          reduceMotion
            ? 0
            : 0.08,
      },
    },
  };

  const isHome =
    pathname === "/";

  const isBag =
    pathname === "/bag";

  const isOrders =
    pathname.startsWith(
      "/account/orders"
    );

  const isAccount =
    !isOrders &&
    (
      pathname === "/account" ||
      pathname.startsWith(
        "/account/profile"
      ) ||
      pathname.startsWith(
        "/account/addresses"
      )
    );

  return (
    <>
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
                  Wazni Jewellery, Abu Dhabi, UAE
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
                  href={
                    STORE_MAP_URL
                  }
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
            {categories.map(
              (category) => (
                <motion.div
                  key={
                    category.id
                  }
                  variants={
                    fromBottom
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="group relative flex h-full items-center"
                >
                  <Link
                    href={`/search?q=${encodeURIComponent(
                      category.slug
                    )}`}
                    className="!text-[var(--wazni-navy)] !no-underline transition-colors hover:!text-[var(--wazni-gold-dark)]"
                  >
                    {
                      category.name
                    }
                  </Link>

                  {category.children.length > 0 && (
                    <div className="invisible absolute left-0 top-full z-[110] min-w-[220px] translate-y-2 border border-[#071426]/10 bg-white py-2 opacity-0 shadow-[0_14px_35px_rgba(7,20,38,0.13)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {category.children.map(
                        (
                          child
                        ) => (
                          <Link
                            key={
                              child.id
                            }
                            href={`/search?q=${encodeURIComponent(
                              child.slug
                            )}`}
                            className="block px-5 py-3 !text-[12px] !text-[var(--wazni-navy)] !no-underline hover:bg-[#FAF7F1] hover:!text-[var(--wazni-gold-dark)]"
                          >
                            {
                              child.name
                            }
                          </Link>
                        )
                      )}
                    </div>
                  )}
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
            className="grid h-[96px] grid-cols-[48px_1fr_48px] items-center bg-[var(--wazni-navy)] px-4 sm:h-[104px] sm:px-6"
          >
            <div />

            <motion.div
              variants={scaleIn}
              className="flex justify-center"
            >
              <Wordmark compact />
            </motion.div>

            <motion.button
              variants={fromRight}
              whileTap={{
                scale: 0.9,
              }}
              type="button"
              onClick={() =>
                setSearchOpen(
                  (open) =>
                    !open
                )
              }
              aria-label="Search"
              aria-expanded={
                searchOpen
              }
              className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full !text-[var(--wazni-gold)] transition-colors hover:bg-white/5"
            >
              <Search
                size={25}
                strokeWidth={1.5}
              />
            </motion.button>
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
                  height: 68,
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
                className="relative z-[90] overflow-visible border-t border-white/10 bg-[var(--wazni-navy)] px-4 sm:px-6"
              >
                <HeaderSearch
                  mobile
                  onNavigate={() =>
                    setSearchOpen(
                      false
                    )
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
            className="grid h-[92px] grid-cols-4 border-b border-[var(--wazni-gold)]/15 bg-[var(--wazni-ivory)] text-[var(--wazni-navy)] sm:h-[100px]"
          >
            {categories
              .slice(0, 4)
              .map(
                (
                  category
                ) => {
                  const Icon =
                    category.slug ===
                    "collections"
                      ? RingIcon
                      : category.slug ===
                          "gold"
                        ? GoldIcon
                        : GemIcon;

                  return (
                    <motion.div
                      key={
                        category.id
                      }
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: reduceMotion
                            ? 0
                            : 18,
                          scale:
                            reduceMotion
                              ? 1
                              : 0.9,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition:
                            {
                              duration:
                                entranceDuration,
                              ease,
                            },
                        },
                      }}
                      whileTap={{
                        scale: 0.94,
                      }}
                      className="min-w-0"
                    >
                      <Link
                        href={`/search?q=${encodeURIComponent(
                          category.slug
                        )}`}
                        className="flex h-[92px] min-w-0 flex-col items-center justify-center gap-2 border-r border-[var(--wazni-gold)]/15 px-1 !text-[var(--wazni-navy)] !no-underline last:border-r-0 sm:h-[100px]"
                      >
                        <Icon className="h-[28px] w-[39px] shrink-0 text-[var(--wazni-gold-dark)]" />

                        <span className="max-w-full whitespace-nowrap text-center text-[9px] font-medium uppercase tracking-[-0.02em] sm:text-[10px] sm:tracking-normal">
                          {
                            category.name
                          }
                        </span>
                      </Link>
                    </motion.div>
                  );
                }
              )}
          </motion.nav>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-[110] overflow-visible lg:hidden"
      >
        <div
          className="relative grid grid-cols-5 items-end overflow-visible border-t border-[var(--wazni-gold)]/20 bg-[var(--wazni-navy)] px-2 shadow-[0_-10px_35px_rgba(7,20,38,0.20)]"
          style={{
            height:
              "calc(78px + env(safe-area-inset-bottom))",
            paddingBottom:
              "max(10px, env(safe-area-inset-bottom))",
          }}
        >
          <MobileBottomItem
            href="/"
            label="Home"
            icon={<Home />}
            active={isHome}
          />

          <MobileBottomItem
            href={accountHref}
            label="Account"
            icon={
              <UserRound />
            }
            active={isAccount}
          />

          <MobileBottomItem
            href="/bag"
            label="Bag"
            icon={
              <ShoppingBag />
            }
            active={isBag}
            badge={
              totalQuantity
            }
          />

          <MobileBottomItem
            href={ordersHref}
            label="Orders"
            icon={<Package />}
            active={isOrders}
          />

          <MobileMoreButton
            active={menuOpen}
            onClick={() =>
              setMenuOpen(true)
            }
          />
        </div>
      </nav>

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
              aria-label="More navigation"
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                duration,
                ease,
              }}
              className="absolute bottom-0 left-0 right-0 max-h-[82dvh] overflow-hidden rounded-t-[28px] bg-[var(--wazni-navy)] text-white shadow-[0_-20px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="mx-auto mt-3 h-1 w-11 rounded-full bg-white/25" />

              <div className="flex items-center justify-between border-b border-white/10 px-5 pb-5 pt-4">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--wazni-gold)]">
                    Wazni Jewellery
                  </p>

                  <h2 className="mt-1 text-[20px] font-medium text-white">
                    More
                  </h2>
                </div>

                <motion.button
                  type="button"
                  onClick={() =>
                    setMenuOpen(
                      false
                    )
                  }
                  whileTap={{
                    scale: 0.9,
                  }}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 !text-[var(--wazni-gold)]"
                >
                  <X
                    size={22}
                    strokeWidth={1.5}
                  />
                </motion.button>
              </div>

              <div className="max-h-[calc(82dvh-94px)] overflow-y-auto pb-[calc(95px+env(safe-area-inset-bottom))]">
                <nav className="px-5 py-3">
                

                  <MoreMenuLink
                    href="/about"
                    label="About Us"
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                  />

                  <MoreMenuLink
                    href="/contact"
                    label="Contact Us"
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                  />

                  <a
                    href={
                      STORE_MAP_URL
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                    className="flex min-h-[56px] items-center justify-between border-b border-white/10 !text-[15px] !font-medium !text-white !no-underline transition-colors hover:!text-[var(--wazni-gold)]"
                  >
                    <span>
                      Our Store
                    </span>

                    <span className="text-[18px] font-light text-[var(--wazni-gold)]">
                      →
                    </span>
                  </a>
                </nav>

                <div className="px-5 pb-7 pt-4">
                  <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--wazni-gold)]">
                    Connect With Us
                  </p>

                  <div className="mb-6 flex items-center gap-3">
                    <motion.a
                      href={
                        WAZNI_SOCIALS.instagram
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Wazni Jewellery on Instagram"
                      onClick={() =>
                        setMenuOpen(
                          false
                        )
                      }
                      whileTap={{
                        scale: 0.92,
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--wazni-gold)]/40 bg-[var(--wazni-gold)]/10 !text-[var(--wazni-gold)] !no-underline"
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
                        setMenuOpen(
                          false
                        )
                      }
                      whileTap={{
                        scale: 0.92,
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--wazni-gold)]/40 bg-[var(--wazni-gold)]/10 !text-[var(--wazni-gold)] !no-underline"
                    >
                      <FilledWhatsAppIcon className="h-[19px] w-[19px]" />
                    </motion.a>
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
                    href={
                      STORE_MAP_URL
                    }
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileBottomItem({
  href,
  label,
  icon,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="relative flex h-[68px] min-w-0 flex-col items-center justify-end gap-[7px] pb-[3px] !no-underline"
    >
      {active ? (
        <motion.span
          layoutId="wazni-mobile-active"
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 32,
          }}
          className="absolute -top-[28px] left-1/2 flex h-[64px] w-[64px] -translate-x-1/2 items-center justify-center rounded-full border-[4px] border-white/90 bg-[var(--wazni-ivory)] shadow-[0_8px_22px_rgba(0,0,0,0.20)]"
        >
          <span className="relative flex items-center justify-center !text-[var(--wazni-gold-dark)] [&>svg]:h-[27px] [&>svg]:w-[27px] [&>svg]:stroke-[2]">
            {icon}

            {badge !== undefined &&
              badge > 0 && (
                <span className="absolute -right-3 -top-3 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[var(--wazni-gold)] px-1 text-[8px] font-bold text-[var(--wazni-navy)]">
                  {badge > 99
                    ? "99+"
                    : badge}
                </span>
              )}
          </span>
        </motion.span>
      ) : (
        <span className="relative flex h-[28px] items-center justify-center !text-white/70 [&>svg]:h-[24px] [&>svg]:w-[24px] [&>svg]:stroke-[1.6]">
          {icon}

          {badge !== undefined &&
            badge > 0 && (
              <span className="absolute -right-3 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--wazni-gold)] px-1 text-[8px] font-bold text-[var(--wazni-navy)]">
                {badge > 99
                  ? "99+"
                  : badge}
              </span>
            )}
        </span>
      )}

      <span
        className={`whitespace-nowrap text-[10px] font-medium leading-none ${
          active
            ? "!text-[var(--wazni-gold)]"
            : "!text-white/75"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

function MobileMoreButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{
        scale: 0.94,
      }}
      onClick={onClick}
      aria-label="More options"
      aria-expanded={active}
      className="relative flex h-[68px] min-w-0 flex-col items-center justify-end gap-[7px] pb-[3px]"
    >
      {active ? (
        <motion.span
          layoutId="wazni-mobile-active"
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 32,
          }}
          className="absolute -top-[28px] left-1/2 flex h-[64px] w-[64px] -translate-x-1/2 items-center justify-center rounded-full border-[4px] border-white/90 bg-[var(--wazni-ivory)] shadow-[0_8px_22px_rgba(0,0,0,0.20)]"
        >
          <MoreHorizontal
            size={28}
            strokeWidth={2}
            className="text-[var(--wazni-gold-dark)]"
          />
        </motion.span>
      ) : (
        <span className="flex h-[28px] items-center justify-center !text-white/70">
          <MoreHorizontal
            size={25}
            strokeWidth={1.6}
          />
        </span>
      )}

      <span
        className={`text-[10px] font-medium leading-none ${
          active
            ? "!text-[var(--wazni-gold)]"
            : "!text-white/75"
        }`}
      >
        More
      </span>
    </motion.button>
  );
}

function MoreMenuLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex min-h-[56px] items-center justify-between border-b border-white/10 !text-[15px] !font-medium !text-white !no-underline transition-colors hover:!text-[var(--wazni-gold)]"
    >
      <span>
        {label}
      </span>

      <span className="text-[18px] font-light text-[var(--wazni-gold)]">
        →
      </span>
    </Link>
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