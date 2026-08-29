"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const smallItems = [
  {
    title: "Birthday",
    image: "/images/gifting/birthday.png",
  },
  {
    title: "Anniversary",
    image: "/images/gifting/anniversary.png",
  },
  {
    title: "Baby Birth",
    image: "/images/gifting/babybirthday.png",
  },
  {
    title: "Luxury Gifts",
    image: "/images/gifting/luxary.png",
  },
];

const largeItems = [
  {
    title: "Customized Jewellery",
    image: "/images/gifting/customizied.png",
  },
  {
    title: "Party Wear Jewellery",
    image: "/images/gifting/partywear.png",
  },
];

export default function GiftingMore() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white pb-16 pt-4 sm:pb-20 lg:pb-24">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
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
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="font-serif text-[34px] font-normal text-[var(--wazni-navy)] sm:text-[40px] lg:text-[44px]">
            Gifting &amp; More
          </h2>

          <p className="mt-2 text-[14px] text-[var(--wazni-muted)] sm:text-[15px]">
            Gifts that mark a moment
          </p>
        </motion.header>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            {smallItems.map((item, index) => (
              <motion.a
                key={item.title}
                href="#"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: index % 2 === 0 ? -35 : 35,
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
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-[16px] bg-[var(--wazni-ivory)]"
              >
                <div className="relative aspect-[1.45]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--wazni-ivory)]/35" />

                  <div className="absolute inset-y-0 right-0 flex w-[52%] items-center justify-center px-3">
                    <h3 className="text-center text-[13px] font-semibold leading-tight text-[var(--wazni-gold-dark)] sm:text-[15px] lg:text-[16px]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {largeItems.map((item, index) => (
            <motion.a
              key={item.title}
              href="#"
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
                amount: 0.2,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : 0.12 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[16px] bg-[var(--wazni-ivory)]"
            >
              <div className="relative aspect-[0.72] lg:h-full lg:min-h-[420px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[var(--wazni-ivory)] via-[var(--wazni-ivory)]/70 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex min-h-[64px] items-end justify-center px-4 pb-4 sm:min-h-[72px] sm:pb-5">
                  <h3 className="text-center text-[13px] font-semibold text-[var(--wazni-navy)] sm:text-[15px] lg:text-[16px]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}