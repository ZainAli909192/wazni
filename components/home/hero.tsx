"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    eyebrow: "The Signature Collection",
    title: "Jewellery made",
    highlight: "to be remembered.",
    description:
      "Discover refined pieces created to celebrate individuality, beauty and timeless moments.",
    image: "/hero/hero1.png",
    imagePosition: "center", 
  },
  {
    id: 2,
    eyebrow: "Timeless Diamonds",
    title: "Brilliance that",
    highlight: "speaks for itself.",
    description:
      "Exceptional jewellery designed around enduring elegance and remarkable detail.",
    image: "/hero/hero2.png",
    imagePosition: "center",
  },
  {
    id: 3,
    eyebrow: "Wazni Jewellery",
    title: "Made for your",
    highlight: "most precious moments.",
    description:
      "Explore distinctive jewellery created for celebrations, milestones and everything in between.",
    image: "/hero/hero3.png",
    imagePosition: "center",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  const current = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      currentSlide === 0
        ? slides.length - 1
        : currentSlide - 1
    );
  };

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => {
      window.clearInterval(interval);
    };
  }, [reduceMotion]);

  return (
    <section className="relative overflow-hidden bg-[var(--wazni-navy)]">
      <div className="relative h-[620px] sm:h-[680px] lg:h-[calc(100vh-156px)] lg:min-h-[620px] 2xl:h-[calc(100vh-256px)] 2xl:min-h-[460px]">
          
      {/* <div className="relative h-[calc(100svh-192px)] min-h-[560px] max-h-[840px] lg:h-[calc(1000vh-556px)]"> */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={
              reduceMotion
                ? undefined
                : { opacity: 0, scale: 1.025 }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: current.imagePosition,
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--wazni-navy)]/95 via-[var(--wazni-navy)]/55 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--wazni-navy)]/45 via-transparent to-[var(--wazni-navy)]/10" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center px-5 sm:px-8 lg:px-10 xl:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current.id}`}
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 25,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[650px]"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--wazni-gold)]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--wazni-gold)] sm:text-[11px]">
                  {current.eyebrow}
                </p>
              </div>

              <h1 className="max-w-[640px] text-[42px] font-light leading-[0.96] tracking-[-0.045em] text-white sm:text-[54px] md:text-[64px] lg:text-[72px] xl:text-[82px]">
                {current.title}

                <span className="mt-1 block font-serif italic text-[var(--wazni-gold-light)]">
                  {current.highlight}
                </span>
              </h1>

              <p className="mt-6 max-w-[500px] text-[13px] font-light leading-6 text-white/75 sm:text-[14px] sm:leading-7 lg:text-[15px]">
                {current.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
                <a
                  href="#collections"
                  className="group inline-flex min-h-[48px] items-center justify-center bg-[var(--wazni-gold)] px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--wazni-navy)] transition-colors duration-300 hover:bg-[var(--wazni-gold-light)] sm:px-7 sm:text-[11px]"
                >
                  Discover Collection

                  <ArrowRight
                    size={15}
                    strokeWidth={1.7}
                    className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

              
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between sm:bottom-7 sm:left-8 sm:right-8 lg:bottom-8 lg:left-10 lg:right-10 xl:left-12 xl:right-12">
          <div className="flex items-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="group flex h-5 items-center"
              >
                <span
                  className={`block h-px transition-all duration-500 ${
                    currentSlide === index
                      ? "w-10 bg-[var(--wazni-gold)]"
                      : "w-5 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}

            <span className="ml-2 text-[10px] tracking-[0.18em] text-white/65">
              0{currentSlide + 1}
            </span>

            <span className="text-[10px] text-white/30">
              /
            </span>

            <span className="text-[10px] tracking-[0.18em] text-white/35">
              0{slides.length}
            </span>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-all duration-300 hover:border-[var(--wazni-gold)] hover:bg-[var(--wazni-gold)] hover:text-[var(--wazni-navy)]"
            >
              <ArrowLeft
                size={17}
                strokeWidth={1.5}
              />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-all duration-300 hover:border-[var(--wazni-gold)] hover:bg-[var(--wazni-gold)] hover:text-[var(--wazni-navy)]"
            >
              <ArrowRight
                size={17}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[34%] items-end justify-end lg:flex">
          <div className="mb-9 mr-10 flex items-center gap-3 xl:mr-12">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">
              Wazni Jewellery
            </span>

            <span className="h-px w-10 bg-[var(--wazni-gold)]/60" />
          </div>
        </div>
      </div>
    </section>
  );
}