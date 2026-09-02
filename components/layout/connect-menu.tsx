"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Share2,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  connectItems,
  type ConnectItem,
} from "@/config/site";

function ConnectIcon({
  kind,
}: {
  kind: ConnectItem["kind"];
}) {
  if (kind === "call") {
    return (
      <Phone
        aria-hidden="true"
        className="size-5"
        strokeWidth={1.6}
      />
    );
  }

  if (kind === "email") {
    return (
      <Mail
        aria-hidden="true"
        className="size-5"
        strokeWidth={1.6}
      />
    );
  }

  if (kind === "location") {
    return (
      <MapPin
        aria-hidden="true"
        className="size-5"
        strokeWidth={1.6}
      />
    );
  }

  const paths = {
    whatsapp:
      "M16.75 13.96c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.41-.8-1.93-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.46.07-.7.33-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.83 2.8 4.44 3.92.62.27 1.1.43 1.48.55.62.2 1.19.17 1.63.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3M12.04 21a8.93 8.93 0 0 1-4.55-1.25L2.45 21l1.35-4.91A8.93 8.93 0 1 1 12.04 21m0-16.2a7.25 7.25 0 0 0-6.16 11.08l.2.31-.8 2.92 3-.79.29.17a7.26 7.26 0 1 0 3.47-13.69",
    instagram:
      "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m10.5 1.5A1.25 1.25 0 1 1 16.25 6.75 1.25 1.25 0 0 1 17.5 5.5M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3",
    linkedin:
      "M6.94 8.5V20H3.12V8.5h3.82M5.03 3a2.21 2.21 0 1 1 0 4.42A2.21 2.21 0 0 1 5.03 3M20.88 13.41V20h-3.81v-6.15c0-1.47-.03-3.35-2.04-3.35-2.05 0-2.36 1.6-2.36 3.24V20H8.86V8.5h3.66v1.57h.05c.51-.97 1.76-1.99 3.62-1.99 3.87 0 4.69 2.55 4.69 5.33",
  } as const;

  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d={paths[kind]} />
    </svg>
  );
}

export function ConnectMenu() {
  const [open, setOpen] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const triggerRef =
    useRef<HTMLButtonElement>(null);

  const reducedMotion =
    useReducedMotion();

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnOutsidePointer(
      event: PointerEvent
    ) {
      if (
        !containerRef.current?.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    function closeOnEscape(
      event: KeyboardEvent
    ) {
      if (event.key !== "Escape") {
        return;
      }

      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener(
      "pointerdown",
      closeOnOutsidePointer
    );

    document.addEventListener(
      "keydown",
      closeOnEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeOnOutsidePointer
      );

      document.removeEventListener(
        "keydown",
        closeOnEscape
      );
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[calc(94px+env(safe-area-inset-bottom))] right-4 z-[75] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 lg:bottom-6 lg:right-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            id="connect-actions"
            role="group"
            aria-label="Connect with Wazni Jewellery"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                    scale: 0.94,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              reducedMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: 12,
                    scale: 0.96,
                  }
            }
            transition={{
              duration:
                reducedMotion
                  ? 0
                  : 0.28,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="flex min-w-[210px] flex-col gap-1.5 rounded-[20px] border border-[var(--wazni-gold)]/25 bg-[var(--wazni-navy)]/95 p-2 shadow-[0_20px_60px_rgba(7,20,38,0.35)] backdrop-blur-xl"
          >
            <div className="px-3 pb-2 pt-2">
              <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--wazni-gold)]">
                Connect With Us
              </p>
            </div>

            {connectItems.map(
              (item, index) => (
                <motion.a
                  key={`${item.kind}-${item.label}`}
                  href={item.href}
                  target={
                    item.external
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={
                    item.external
                      ? `${item.label} (opens in a new tab)`
                      : item.label
                  }
                  title={
                    item.approval ===
                    "client-approval-required"
                      ? `${item.label} pending client confirmation`
                      : item.label
                  }
                  onClick={() =>
                    setOpen(false)
                  }
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 18,
                          scale: 0.95,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay:
                      reducedMotion
                        ? 0
                        : index *
                          0.045,
                    duration:
                      reducedMotion
                        ? 0
                        : 0.25,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          x: -3,
                        }
                  }
                  whileTap={
                    reducedMotion
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  className="group flex min-h-[52px] items-center gap-3 rounded-[14px] px-2.5 text-[13px] font-medium !text-white !no-underline transition-colors duration-300 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--wazni-gold)]/30 bg-[var(--wazni-gold)]/10 text-[var(--wazni-gold)] transition-all duration-300 group-hover:border-[var(--wazni-gold)]/60 group-hover:bg-[var(--wazni-gold)] group-hover:text-[var(--wazni-navy)]">
                    <ConnectIcon
                      kind={item.kind}
                    />
                  </span>

                  <span className="flex-1">
                    {item.label}
                  </span>

                  <span className="h-1.5 w-1.5 rotate-45 border border-[var(--wazni-gold)]/70 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.a>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                scale: 0,
                y: 20,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration:
            reducedMotion
              ? 0
              : 0.7,
          delay:
            reducedMotion
              ? 0
              : 0.35,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="relative"
      >
        {!reducedMotion && !open && (
          <>
            <motion.span
              aria-hidden="true"
              animate={{
                scale: [
                  1,
                  1.35,
                  1.35,
                ],
                opacity: [
                  0.35,
                  0,
                  0,
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute inset-0 rounded-full border border-[var(--wazni-gold)]"
            />

            <motion.span
              aria-hidden="true"
              animate={{
                scale: [
                  1,
                  1.55,
                  1.55,
                ],
                opacity: [
                  0.18,
                  0,
                  0,
                ],
              }}
              transition={{
                duration: 2.4,
                delay: 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute inset-0 rounded-full border border-[var(--wazni-gold)]"
            />
          </>
        )}

      <motion.button
  ref={triggerRef}
  type="button"
  aria-expanded={open}
  aria-controls="connect-actions"
  aria-label={
    open
      ? "Close connect menu"
      : "Open connect menu"
  }
  onClick={() =>
    setOpen((current) => !current)
  }
  whileHover={
    reducedMotion
      ? undefined
      : {
          scale: 1.05,
          y: -2,
        }
  }
  whileTap={
    reducedMotion
      ? undefined
      : {
          scale: 0.96,
        }
  }
  className={`relative inline-flex h-[44px] min-w-[138px] cursor-pointer items-center justify-center gap-2 rounded-full border px-4 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:h-[46px] sm:min-w-[148px] sm:text-[11px] ${
    open
      ? "border-[var(--wazni-gold)] bg-[var(--wazni-gold)] text-[var(--wazni-navy)]"
      : "border-[var(--wazni-gold)] bg-[var(--wazni-navy)] text-[var(--wazni-gold)] hover:bg-[var(--wazni-gold)] hover:text-[var(--wazni-navy)]"
  } shadow-[0_8px_24px_rgba(7,20,38,0.32),0_0_0_1px_rgba(199,160,90,0.14),0_0_22px_rgba(199,160,90,0.22)]`}
>
  <AnimatePresence
    mode="wait"
    initial={false}
  >
    {open ? (
      <motion.span
        key="close"
        initial={
          reducedMotion
            ? false
            : {
                rotate: -90,
                scale: 0.6,
                opacity: 0,
              }
        }
        animate={{
          rotate: 0,
          scale: 1,
          opacity: 1,
        }}
        exit={{
          rotate: 90,
          scale: 0.6,
          opacity: 0,
        }}
        transition={{
          duration:
            reducedMotion
              ? 0
              : 0.2,
        }}
        className="flex items-center gap-2"
      >
        <X
          aria-hidden="true"
          className="size-[15px]"
          strokeWidth={1.8}
        />

        Close
      </motion.span>
    ) : (
      <motion.span
        key="connect"
        initial={
          reducedMotion
            ? false
            : {
                scale: 0.75,
                opacity: 0,
              }
        }
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.75,
          opacity: 0,
        }}
        transition={{
          duration:
            reducedMotion
              ? 0
              : 0.2,
        }}
        className="flex items-center gap-2"
      >
        <Share2
          aria-hidden="true"
          className="size-[15px]"
          strokeWidth={1.8}
        />

        Contact
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>
      </motion.div>
    </div>
  );
}
