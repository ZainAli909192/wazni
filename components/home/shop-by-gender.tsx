"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const tabs = ["Women", "Men", "Kids"];

const items = [
  {
    title: "Daimond Ring",
    image: "/images/gender/ring.png",
  },
  {
    title: "Earrings",
    image: "/images/gender/earrings.png",
  },
  {
    title: "Diamond set",
    image: "/images/gender/set.png",
  },
  {
    title: "Bracelet", 
    image: "/images/gender/bracelate.png", 
  },
];

export default function ShopByGender() {
  const [activeTab, setActiveTab] = useState("Women");
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center"
        >
          <h2 className="font-serif text-[34px] font-normal text-[var(--wazni-navy)] sm:text-[40px] lg:text-[44px]">
            Premium Collections
          </h2>

        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => (
            <motion.a
              key={item.title}
              href="#"
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
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[16px] bg-[var(--wazni-ivory)]"
            >
              <div className="relative aspect-[0.92] sm:aspect-[1/1.05] lg:aspect-[0.95]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[var(--wazni-ivory)] via-[var(--wazni-ivory)]/78 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex min-h-[64px] items-end justify-center px-3 pb-4 sm:min-h-[72px] sm:pb-5">
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