"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutStore() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="overflow-hidden bg-[var(--wazni-ivory)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <motion.header
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-9 max-w-[760px] text-center sm:mb-11 lg:mb-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--wazni-gold-dark)] sm:text-[11px]">
            Wazni Jewellery
          </p>

          <h2 className="mt-3 font-serif text-[36px] font-normal leading-tight tracking-[-0.035em] text-[var(--wazni-navy)] sm:text-[44px] lg:text-[52px]">
            About Our Store
          </h2>

          <p className="mx-auto mt-3 max-w-[600px] text-[13px] leading-6 text-[var(--wazni-muted)] sm:text-[14px] lg:text-[15px]">
            A destination for exceptional jewellery and a more personal
            shopping experience.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.12fr_0.88fr] lg:gap-5">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -80,
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative min-h-[390px] overflow-hidden rounded-[20px] bg-[var(--wazni-navy)] sm:min-h-[500px] lg:min-h-[600px]"
          >
            <Image
              src="/images/gifting/about.png"
              alt="Wazni Jewellery boutique"
              fill
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--wazni-navy)]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 z-10 p-6 sm:p-8 lg:p-9">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--wazni-gold)]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--wazni-gold-light)] sm:text-[10px]">
                  Visit Wazni
                </span>
              </div>

              <h3 className="mt-3 max-w-[440px] font-serif text-[30px] font-normal leading-tight text-white sm:text-[36px] lg:text-[42px]">
                Discover the Wazni experience in Abu Dhabi.
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 80,
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-h-[470px] flex-col justify-between rounded-[20px] bg-white p-7 shadow-[0_18px_50px_rgba(11,23,40,0.05)] sm:p-9 lg:min-h-[600px] lg:p-10 xl:p-12"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--wazni-gold)]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[var(--wazni-gold-dark)] sm:text-[10px]">
                  Our Store
                </span>
              </div>

              <h3 className="mt-6 font-serif text-[34px] font-normal leading-tight tracking-[-0.025em] text-[var(--wazni-navy)] sm:text-[40px] lg:text-[44px]">
                About Wazni
              </h3>

              <p className="mt-6 text-[14px] leading-7 text-[var(--wazni-muted)] sm:text-[15px]">
                Discover a world of distinctive jewellery at Wazni. From
                refined diamond creations to exceptional coloured gemstones
                and statement pieces, our collections are selected for those
                who appreciate individuality, detail and timeless beauty.
              </p>

              <p className="mt-5 text-[14px] leading-7 text-[var(--wazni-muted)] sm:text-[15px]">
                Our boutique experience is designed to feel personal, refined
                and considered, allowing every piece to be discovered at its
                own pace.
              </p>
            </div>

            <div className="mt-10">
              <div className="mb-7 border-t border-[var(--wazni-gold)]/25 pt-7">
                <p className="text-[12px] font-medium uppercase leading-6 tracking-[0.12em] text-[var(--wazni-navy)]">
                  Visit our Abu Dhabi boutique and experience Wazni in person.
                </p>
              </div>

              <Link
                href="/our-story"
                className="group inline-flex min-h-[48px] items-center justify-center bg-[var(--wazni-gold)] px-6 text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--wazni-gold)] transition-colors duration-300 hover:bg-white hover:text-[var(--wazni-navy)] hover:border sm:px-7 sm:text-[11px]"
              >
                Discover Wazni

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}