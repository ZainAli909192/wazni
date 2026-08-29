"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Diamond,
  MapPin,
  Phone,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const details = [
  {
    icon: MapPin,
    title: "Location",
    lines: [
      "Wazni Jewellery",
      "Al Maqta' St - Rabdan - RB2",
      "Abu Dhabi, UAE",
    ],
  },
  {
    icon: Clock3,
    title: "Opening Hours",
    lines: ["Saturday – Thursday", "10:00 AM – 10:00 PM"],
  },
  {
    icon: Diamond,
    title: "Personal Service",
    lines: [
      "Private and personalised",
      "jewellery shopping experience.",
    ],
  },
];

export default function FinalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[#F8F4EC] py-10 sm:py-14 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 40,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease,
          }}
          className="overflow-hidden rounded-[22px] border border-[#C99B49]/25 sm:rounded-[28px]"
        >

          <div className="lg:hidden">
            <div className="relative min-h-[720px] overflow-hidden bg-[#07182D] sm:min-h-[760px]">
              {/* Background image */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        scale: 1.07,
                      }
                }
                whileInView={{
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.4,
                  ease,
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/gifting/about.png"
                  alt="Wazni Jewellery boutique in Abu Dhabi"
                  fill
                  sizes="100vw"
                  className="object-cover object-[56%_center]"
                />
              </motion.div>

              {/* Full cinematic overlay */}
              <div
                className="
                  absolute inset-0
                  bg-[linear-gradient(180deg,rgba(7,20,38,0.12)_0%,rgba(7,20,38,0.18)_22%,rgba(7,20,38,0.52)_55%,rgba(7,20,38,0.96)_100%)]
                "
              />

              {/* Extra left darkening for text readability */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.42)_0%,rgba(7,20,38,0.08)_100%)]" />

              {/* Mobile content */}
              <div className="relative z-10 flex min-h-[720px] items-end px-6 pb-8 pt-16 sm:min-h-[760px] sm:px-9 sm:pb-10">
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 35,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    delay: reduceMotion ? 0 : 0.12,
                    ease,
                  }}
                  className="w-full"
                >
                  {/* Eyebrow */}
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#D6AE63]" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#D6AE63]">
                      Boutique Experience
                    </p>
                  </div>

                  {/* Heading */}
                  <h2 className="mt-5 font-serif text-[50px] font-normal leading-[0.92] tracking-[-0.04em] text-[#D6AE63] sm:text-[58px]">
                    Visit Wazni
                  </h2>

                  <p className="mt-3 text-[14px] font-medium uppercase tracking-[0.34em] text-white">
                    Abu Dhabi
                  </p>

                  {/* Decorative divider */}
                  <div className="my-6 flex max-w-[280px] items-center gap-4">
                    <span className="h-px flex-1 bg-[#D6AE63]/50" />

                    <span className="h-[6px] w-[6px] rotate-45 bg-[#D6AE63]" />

                    <span className="h-px flex-1 bg-[#D6AE63]/50" />
                  </div>

                  <p className="max-w-[440px] text-[14px] leading-7 text-white/85 sm:text-[15px]">
                    Step into our boutique and discover a world of exceptional
                    jewellery. Our specialists are here to guide you through
                    every detail.
                  </p>

                  {/* Buttons */}
                  <div className="mt-7 flex flex-col gap-3">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Wazni+Jewellery%2C+Al+Maqta%27+St+-+Rabdan+-+RB2+-+Abu+Dhabi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group flex min-h-[56px] w-full
                        items-center justify-center gap-3
                        bg-[#CFA34C]
                        px-6
                        text-[10px] font-bold uppercase
                        tracking-[0.18em]
                        text-[#07182D]
                        transition-all duration-300
                        hover:bg-[#E1BA6C]
                      "
                    >
                      <MapPin size={17} strokeWidth={1.7} />

                      Get Directions

                      <ArrowRight
                        size={15}
                        strokeWidth={1.6}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>

                    <Link
                      href="/contact"
                      className="
                        flex min-h-[56px] w-full
                        items-center justify-center gap-3
                        border border-white/40
                        bg-white
                        px-6
                        text-[10px] font-bold uppercase
                        tracking-[0.18em]
                        text-[#07182D]
                        transition-all duration-300
                        hover:bg-[#F7F2E8]
                      "
                    >
                      <Phone size={16} strokeWidth={1.7} />

                      Contact Boutique
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>


            <div className="bg-[#FCF9F3] px-6 py-8 sm:px-8">
              <div className="grid grid-cols-1">
                {details.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
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
                        amount: 0.4,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.55,
                        delay: reduceMotion ? 0 : index * 0.08,
                        ease,
                      }}
                      className={`
                        flex items-center gap-5 py-6
                        ${
                          index !== details.length - 1
                            ? "border-b border-[#C99B49]/20"
                            : ""
                        }
                      `}
                    >
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C99B49]/35">
                        <Icon
                          size={21}
                          strokeWidth={1.35}
                          className="text-[#B8842F]"
                        />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#B8842F]">
                          {item.title}
                        </h3>

                        <div className="mt-2">
                          {item.lines.map((line) => (
                            <p
                              key={line}
                              className="text-[13px] leading-[1.65] text-[#17263A]"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="hidden lg:block">
            <div className="relative min-h-[620px] overflow-hidden bg-[#07182D] xl:min-h-[670px]">
              {/* Background */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 1.06,
                      }
                }
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.25,
                  ease,
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/gifting/about.png"
                  alt="Wazni Jewellery boutique in Abu Dhabi"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Desktop gradient */}
              <div
                className="
                  absolute inset-0
                  bg-[linear-gradient(90deg,#07182D_0%,rgba(7,24,45,0.98)_23%,rgba(7,24,45,0.84)_38%,rgba(7,24,45,0.22)_62%,rgba(7,24,45,0.02)_100%)]
                "
              />

              {/* Content */}
              <div className="relative z-10 flex min-h-[620px] items-center px-14 py-16 xl:min-h-[670px] xl:px-20">
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -55,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    delay: 0.12,
                    ease,
                  }}
                  className="w-full max-w-[470px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#D6AE63]" />

                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6AE63]">
                      Boutique Experience
                    </p>
                  </div>

                  <h2 className="mt-6 font-serif text-[64px] font-normal leading-[0.95] tracking-[-0.035em] text-[#D6AE63] xl:text-[72px]">
                    Visit Wazni
                  </h2>

                  <p className="mt-3 text-[17px] font-medium uppercase tracking-[0.36em] text-white">
                    Abu Dhabi
                  </p>

                  <div className="my-7 flex max-w-[290px] items-center gap-4">
                    <span className="h-px flex-1 bg-[#D6AE63]/40" />
                    <span className="h-[5px] w-[5px] rotate-45 bg-[#D6AE63]" />
                    <span className="h-px flex-1 bg-[#D6AE63]/40" />
                  </div>

                  <p className="max-w-[420px] text-[15px] leading-7 text-white/80">
                    Step into our boutique and discover a world of exceptional
                    jewellery. Our specialists are here to guide you through
                    every detail.
                  </p>

                  <div className="mt-8 flex gap-3">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Wazni+Jewellery%2C+Al+Maqta%27+St+-+Rabdan+-+RB2+-+Abu+Dhabi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-[50px] items-center justify-center gap-3 bg-[#C99B49] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#07182D] transition-all duration-300 hover:bg-[#E0BB72]"
                    >
                      <MapPin size={16} strokeWidth={1.7} />

                      Get Directions

                      <ArrowRight
                        size={14}
                        strokeWidth={1.6}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>

                    <Link
                      href="/contact"
                      className="inline-flex min-h-[50px] items-center justify-center gap-3 border border-[#C99B49]/70 bg-white px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#07182D] transition-all duration-300 hover:bg-[#C99B49]"
                    >
                      <Phone size={15} strokeWidth={1.7} />

                      Contact Boutique
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>


            <motion.div
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
                amount: 0.3,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: 0.15,
                ease,
              }}
              className="bg-[#FCF9F3] px-12 py-11"
            >
              <div className="grid grid-cols-3">
                {details.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className={`
                        flex flex-col items-center px-8 text-center
                        ${
                          index !== details.length - 1
                            ? "border-r border-[#C99B49]/20"
                            : ""
                        }
                      `}
                    >
                      <Icon
                        size={27}
                        strokeWidth={1.25}
                        className="text-[#B98A39]"
                      />

                      <h3 className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B98A39]">
                        {item.title}
                      </h3>

                      <div className="mt-3">
                        {item.lines.map((line) => (
                          <p
                            key={line}
                            className="text-[14px] leading-6 text-[#263240]"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}