"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Gem,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

const STORE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Wazni%20Jewellery%2C%20Al%20Maqta%27%20St%20-%20Rabdan%20-%20RB2%20-%20Abu%20Dhabi";

const jewelleryCategories = [
  {
    name: "Rings",
    image: "/images/products/ring-1.png",
    href: "/search?q=rings",
  },
  {
    name: "Earrings",
    image: "/images/products/earrings-1.png",
    href: "/search?q=earrings",
  },
  {
    name: "Necklaces",
    image: "/images/products/necklace-1.png",
    href: "/search?q=necklaces",
  },
  {
    name: "Bracelets",
    image: "/images/products/bracelet-2.png",
    href: "/search?q=bracelets",
  },
  {
    name: "Pendants",
    image: "/images/products/ring-3.png",
    href: "/search?q=pendants",
  },
  {
    name: "Complete Sets",
    image: "/images/products/set-1.png",
    href: "/search?q=complete%20sets",
  },
];

const viewport = {
  once: true,
  amount: 0.18,
};

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  const revealDuration = reduceMotion ? 0 : 0.85;

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 55,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: revealDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeLeft: Variants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -90,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: revealDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeRight: Variants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 90,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: revealDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const scaleReveal: Variants = {
    hidden: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const softScale: Variants = {
    hidden: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.88,
      y: reduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: revealDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const staggerItem: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 40,
      scale: reduceMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: revealDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <main className="overflow-hidden bg-[#F8F5EF] text-[#071426]">
      <section className="relative isolate flex min-h-[500px] items-center justify-center overflow-hidden bg-[#071426] px-5 py-20 sm:min-h-[560px] sm:px-8 lg:min-h-[620px] lg:px-12">
        <motion.div
          aria-hidden="true"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.4,
                  x: -80,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -left-[180px] top-[80px] h-[430px] w-[430px] rounded-full border border-[#C7A05A]/30"
        />

        <motion.div
          aria-hidden="true"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.3,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -left-[100px] top-[160px] h-[240px] w-[240px] rounded-full border border-[#C7A05A]/15"
        />

        <motion.div
          aria-hidden="true"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.4,
                  x: 80,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -right-[190px] top-[90px] h-[490px] w-[490px] rounded-full border border-[#C7A05A]/25"
        />

        <motion.div
          aria-hidden="true"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.3,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -right-[55px] top-[210px] h-[210px] w-[210px] rounded-full border border-[#C7A05A]/15"
        />

        <motion.svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.5,
                  rotate: -30,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -bottom-32 -left-24 h-[360px] w-[360px] text-[#C7A05A]/15 sm:h-[430px] sm:w-[430px]"
        >
          <circle
            cx="200"
            cy="200"
            r="155"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M45 200 200 45l155 155-155 155L45 200Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M90 95 310 305M310 95 90 305M45 200h310M200 45v310"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.svg>

        <motion.svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.5,
                  rotate: 40,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 12,
          }}
          transition={{
            duration: 1.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -right-24 -top-20 h-[360px] w-[360px] text-[#C7A05A]/10 sm:h-[460px] sm:w-[460px]"
        >
          <circle
            cx="200"
            cy="200"
            r="155"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M45 200 200 45l155 155-155 155L45 200Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M90 95 310 305M310 95 90 305M45 200h310M200 45v310"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.svg>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-[900px] text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-7 flex items-center justify-center gap-4 sm:mb-9"
          >
            <motion.span
              initial={{
                scaleX: reduceMotion ? 1 : 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="h-px w-10 origin-right bg-[#C7A05A]/70 sm:w-16"
            />

            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#C7A05A] sm:text-[13px]">
              About Wazni
            </p>

            <motion.span
              initial={{
                scaleX: reduceMotion ? 1 : 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="h-px w-10 origin-left bg-[#C7A05A]/70 sm:w-16"
            />
          </motion.div>

          <motion.h1
            variants={scaleReveal}
            className="mx-auto max-w-[880px] font-serif text-[42px] font-normal leading-[1.06] tracking-[-0.02em] text-[#F8F5EF] sm:text-[58px] lg:text-[76px]"
          >
            A Legacy of Elegance,
            <span className="block">
              Crafted for Today.
            </span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mx-auto my-8 flex max-w-[390px] items-center justify-center gap-4 sm:my-10"
          >
            <span className="h-px flex-1 bg-[#C7A05A]/45" />

            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [45, 225, 405],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-[7px] w-[7px] rotate-45 bg-[#C7A05A]"
            />

            <span className="h-px flex-1 bg-[#C7A05A]/45" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-[630px] text-[14px] leading-7 text-white/75 sm:text-[16px] sm:leading-8"
          >
            Fine jewellery shaped by craftsmanship, refinement and personal
            service in Abu Dhabi.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 sm:mt-11"
          >
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.04,
                    }
              }
              whileTap={{
                scale: 0.97,
              }}
              className="inline-block"
            >
              <Link
                href="/jewellery"
                className="group inline-flex h-[54px] items-center justify-center gap-4 border border-[#C7A05A] px-8 text-[11px] font-medium uppercase tracking-[0.2em] !text-[#C7A05A] !no-underline transition-all duration-300 hover:bg-[#C7A05A] hover:!text-[#071426] sm:h-[58px] sm:px-10"
              >
                Explore Jewellery

                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex justify-center gap-3"
          >
            {[0, 1, 2, 3].map((item) => (
              <motion.span
                key={item}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.5, 1],
                        opacity: [0.45, 1, 0.45],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item * 0.2,
                }}
                className={`h-[5px] w-[5px] rotate-45 border border-[#C7A05A] ${
                  item === 1
                    ? "bg-[#C7A05A]"
                    : ""
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-[#F8F5EF] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-[560px] lg:pl-6"
          >
            <SectionLabel>
              Our Story
            </SectionLabel>

            <motion.h2
              variants={fadeLeft}
              className="mt-5 font-serif text-[39px] font-normal leading-[1.06] text-[#071426] sm:text-[50px] lg:text-[58px]"
            >
              Timeless Craft.
              <span className="block">
                Modern Elegance.
              </span>
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-8 space-y-5 text-[14px] leading-7 text-[#071426]/70 sm:text-[15px] sm:leading-8"
            >
              <motion.p variants={fadeLeft}>
                At Wazni Jewellery, we believe true luxury is found in the
                details. Every piece is selected and presented with a deep
                appreciation for craftsmanship, refined design and enduring
                beauty.
              </motion.p>

              <motion.p variants={fadeLeft}>
                From our boutique in Abu Dhabi to every customer we serve, our
                focus is on creating a personal jewellery experience built
                around quality, trust and meaningful moments.
              </motion.p>

              <motion.p variants={fadeLeft}>
                Whether celebrating a milestone, choosing a gift or discovering
                something uniquely yours, Wazni Jewellery is here to make every
                choice feel exceptional.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <motion.div
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : 30,
                y: reduceMotion ? 0 : -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              viewport={viewport}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute -left-4 -top-4 hidden h-full w-full border border-[#C7A05A]/35 sm:block"
            />

            <motion.div
              initial={{
                scale: reduceMotion ? 1 : 0.9,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={viewport}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-[16/10] overflow-hidden bg-[#E7E0D5]"
            >
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.035,
                      }
                }
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/about/about.png"
                  alt="Wazni Jewellery boutique interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/20 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#C7A05A]/20 bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-3 md:gap-0"
        >
          <motion.div variants={staggerItem}>
            <BrandPillar
              icon={
                <Gem
                  size={34}
                  strokeWidth={1.2}
                />
              }
              title="Exceptional Craftsmanship"
              description="Meticulous attention to detail and exceptional finishing in every piece."
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <BrandPillar
              icon={
                <Sparkles
                  size={34}
                  strokeWidth={1.2}
                />
              }
              title="Refined Design"
              description="Timeless jewellery designed to balance tradition with contemporary elegance."
              bordered
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <BrandPillar
              icon={
                <UserRound
                  size={34}
                  strokeWidth={1.2}
                />
              }
              title="Personal Service"
              description="A thoughtful and personal approach to help you discover jewellery that feels truly yours."
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="grid overflow-hidden bg-[#071426] lg:min-h-[570px] lg:grid-cols-2">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative min-h-[360px] overflow-hidden sm:min-h-[450px] lg:min-h-full"
        >
          <motion.div
            initial={{
              scale: reduceMotion ? 1 : 1.12,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={viewport}
            transition={{
              duration: reduceMotion ? 0 : 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src="/images/about/craftmanship.png"
              alt="Fine jewellery craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[#071426]/10" />
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24"
        >
          <div className="max-w-[620px]">
            <SectionLabel dark>
              Our Craftsmanship
            </SectionLabel>

            <motion.h2
              variants={softScale}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-5 font-serif text-[40px] font-normal leading-[1.08] text-[#F8F5EF] sm:text-[52px] lg:text-[62px]"
            >
              Every Detail Matters.
            </motion.h2>

            <motion.p
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-7 max-w-[570px] text-[14px] leading-7 text-white/70 sm:text-[15px] sm:leading-8"
            >
              Every piece at Wazni is approached with an uncompromising
              appreciation for quality. From the character of the metal to the
              brilliance of each stone, every element is considered to ensure
              beauty that feels exceptional today and remains timeless for
              years to come.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-10 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3"
            >
              <motion.div variants={staggerItem}>
                <CraftDetail
                  number="01"
                  title="Selection"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <CraftDetail
                  number="02"
                  title="Detail"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <CraftDetail
                  number="03"
                  title="Finish"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#F8F5EF] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1450px]">
          <motion.div
            variants={softScale}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center"
          >
            <SectionLabel centered>
              Our Jewellery
            </SectionLabel>

            <h2 className="mt-5 font-serif text-[38px] font-normal text-[#071426] sm:text-[48px]">
              Discover the Collection
            </h2>

            <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-7 text-[#071426]/60">
              Explore jewellery created for celebrations, meaningful moments
              and everyday elegance.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-12 grid grid-cols-2 border-l border-t border-[#C7A05A]/20 md:grid-cols-3 lg:mt-16 lg:grid-cols-6"
          >
            {jewelleryCategories.map(
              (category) => (
                <motion.div
                  key={category.name}
                  variants={staggerItem}
                  className="h-full"
                >
                  <Link
                    href={category.href}
                    className="group relative flex h-full min-h-[270px] flex-col border-b border-r border-[#C7A05A]/20 bg-[#FBF9F5] px-3 pb-7 pt-5 !text-[#071426] !no-underline transition-colors duration-300 hover:bg-white sm:min-h-[310px] sm:px-5"
                  >
                    <div className="relative mx-auto aspect-square w-full max-w-[170px] overflow-hidden">
                      <Image
                        src={
                          category.image
                        }
                        alt={
                          category.name
                        }
                        fill
                        sizes="(max-width: 768px) 50vw, 16vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.08]"
                      />
                    </div>

                    <div className="mt-auto text-center">
                      <h3 className="font-serif text-[18px] uppercase tracking-[0.04em] sm:text-[20px]">
                        {
                          category.name
                        }
                      </h3>

                      <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#A77F3B]">
                        Explore

                        <ArrowRight
                          size={13}
                          strokeWidth={
                            1.5
                          }
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden bg-white">
        <div className="grid lg:grid-cols-2">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative min-h-[400px] overflow-hidden sm:min-h-[520px] lg:min-h-[650px]"
          >
            <motion.div
              initial={{
                scale: reduceMotion ? 1 : 1.12,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={viewport}
              transition={{
                duration: reduceMotion ? 0 : 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src="/images/about/about-story.png"
                alt="Wazni Jewellery boutique in Abu Dhabi"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/45 via-transparent to-transparent lg:hidden" />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="absolute bottom-5 left-5 right-5 lg:hidden"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C7A05A]">
                Wazni Jewellery
              </p>

              <p className="mt-2 font-serif text-[29px] text-white">
                Abu Dhabi
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex items-center bg-[#F8F5EF] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24"
          >
            <div className="max-w-[600px]">
              <SectionLabel>
                The Boutique Experience
              </SectionLabel>

              <motion.h2
                variants={softScale}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-5 font-serif text-[42px] font-normal leading-[1.08] text-[#071426] sm:text-[54px]"
              >
                Visit Our Boutique
              </motion.h2>

              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-7 flex items-start gap-3"
              >
                <MapPin
                  size={20}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-[#A77F3B]"
                />

                <div>
                  <p className="font-medium text-[#071426]">
                    Wazni Jewellery
                  </p>

                  <p className="mt-1 max-w-[430px] text-[14px] leading-7 text-[#071426]/65">
                    Al Maqta&apos; St - Rabdan - RB2 - Abu Dhabi
                  </p>
                </div>
              </motion.div>

              <motion.p
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-7 max-w-[520px] text-[14px] leading-7 text-[#071426]/65 sm:text-[15px] sm:leading-8"
              >
                Step into our Abu Dhabi boutique and experience Wazni
                Jewellery up close. Discover refined pieces in a calm,
                personal environment where our team is ready to guide you
                through every detail.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <motion.a
                  variants={staggerItem}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.035,
                          y: -2,
                        }
                  }
                  whileTap={{
                    scale: 0.97,
                  }}
                  href={STORE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-[56px] items-center justify-center gap-3 bg-[#C7A05A] px-7 text-[11px] font-medium uppercase tracking-[0.16em] !text-[#071426] !no-underline transition-colors hover:bg-[#B8914A]"
                >
                  Get Directions

                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.a>

                <motion.div
                  variants={staggerItem}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.035,
                          y: -2,
                        }
                  }
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <Link
                    href="/contact"
                    className="group inline-flex h-[56px] w-full items-center justify-center gap-3 border border-[#071426]/30 px-7 text-[11px] font-medium uppercase tracking-[0.16em] !text-[#071426] !no-underline transition-colors hover:border-[#071426] hover:bg-[#071426] hover:!text-white"
                  >
                    Contact Boutique

                    <ArrowRight
                      size={15}
                      strokeWidth={
                        1.5
                      }
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FBF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={viewport}
          transition={{
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -bottom-32 -left-32 h-[350px] w-[350px] rounded-full border border-[#C7A05A]/15"
        />

        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={viewport}
          transition={{
            duration: 1.3,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full border border-[#C7A05A]/15"
        />

        <motion.div
          variants={softScale}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mx-auto max-w-[940px] text-center"
        >
          <motion.span
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0,
              rotate: reduceMotion ? 0 : -20,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            viewport={viewport}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block font-serif text-[72px] leading-none text-[#C7A05A]/80"
          >
            “
          </motion.span>

          <blockquote className="-mt-7 font-serif text-[30px] italic leading-[1.3] text-[#071426] sm:text-[40px] lg:text-[48px]">
            Jewellery is more than something you wear. It becomes part of the
            moments you remember.
          </blockquote>

          <motion.div
            initial={{
              scaleX: reduceMotion ? 1 : 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={viewport}
            transition={{
              duration: 0.9,
              delay: 0.25,
            }}
            className="mx-auto mt-8 h-px w-20 bg-[#C7A05A]"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto mt-7 max-w-[690px] text-[14px] leading-7 text-[#071426]/65 sm:text-[15px] sm:leading-8"
          >
            We are honoured to be part of celebrations, milestones and memories
            through jewellery chosen to remain meaningful for generations.
          </motion.p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden bg-[#071426] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          aria-hidden="true"
          initial={{
            scale: reduceMotion ? 1 : 0,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          viewport={viewport}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full border border-[#C7A05A]/15"
        />

        <motion.div
          aria-hidden="true"
          initial={{
            scale: reduceMotion ? 1 : 0,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          viewport={viewport}
          transition={{
            duration: 1.4,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -left-24 -top-48 h-[400px] w-[400px] rounded-full border border-[#C7A05A]/10"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mx-auto max-w-[980px] text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C7A05A] sm:text-[12px]"
          >
            Wazni Jewellery
          </motion.p>

          <motion.h2
            variants={scaleReveal}
            className="mx-auto mt-5 max-w-[850px] font-serif text-[38px] font-normal leading-[1.12] text-[#F8F5EF] sm:text-[52px] lg:text-[60px]"
          >
            Discover Jewellery Made to Be Remembered.
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.div
              variants={staggerItem}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.04,
                      y: -3,
                    }
              }
              whileTap={{
                scale: 0.97,
              }}
            >
              <Link
                href="/jewellery"
                className="group inline-flex h-[56px] min-w-[220px] items-center justify-center gap-3 bg-[#C7A05A] px-7 text-[11px] font-medium uppercase tracking-[0.17em] !text-[#071426] !no-underline transition-colors hover:bg-[#B8914A]"
              >
                Explore Jewellery

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.a
              variants={staggerItem}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.04,
                      y: -3,
                    }
              }
              whileTap={{
                scale: 0.97,
              }}
              href={STORE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[56px] min-w-[220px] items-center justify-center gap-3 border border-[#C7A05A] px-7 text-[11px] font-medium uppercase tracking-[0.17em] !text-[#C7A05A] !no-underline transition-all hover:bg-[#C7A05A] hover:!text-[#071426]"
            >
              Visit Our Boutique

              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

function SectionLabel({
  children,
  centered = false,
  dark = false,
}: {
  children: ReactNode;
  centered?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        centered
          ? "justify-center"
          : "justify-start"
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-[11px] ${
          dark
            ? "text-[#C7A05A]"
            : "text-[#A77F3B]"
        }`}
      >
        {children}
      </p>

      <span className="h-px w-9 bg-[#C7A05A]/70" />
    </div>
  );
}

function BrandPillar({
  icon,
  title,
  description,
  bordered = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  bordered?: boolean;
}) {
  return (
    <motion.article
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`flex flex-col items-center px-5 text-center sm:px-10 md:min-h-[210px] md:justify-center ${
        bordered
          ? "md:border-x md:border-[#C7A05A]/25"
          : ""
      }`}
    >
      <motion.div
        whileHover={{
          scale: 1.12,
          rotate: 4,
        }}
        transition={{
          duration: 0.3,
        }}
        className="text-[#C7A05A]"
      >
        {icon}
      </motion.div>

      <h3 className="mt-5 max-w-[230px] font-serif text-[20px] uppercase leading-[1.25] tracking-[0.03em] text-[#071426] sm:text-[22px]">
        {title}
      </h3>

      <p className="mt-4 max-w-[290px] text-[13px] leading-6 text-[#071426]/60">
        {description}
      </p>
    </motion.article>
  );
}

function CraftDetail({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <motion.div
      whileHover={{
        x: 5,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <p className="text-[10px] font-semibold tracking-[0.22em] text-[#C7A05A]">
        {number}
      </p>

      <p className="mt-2 font-serif text-[20px] text-white">
        {title}
      </p>
    </motion.div>
  );
}