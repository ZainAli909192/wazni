"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type FooterSection = {
  title: string;
  links?: {
    label: string;
    href: string;
  }[];
  content?: ReactNode;
};

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Wazni+Jewellery%2C+Al+Maqta%27+St+-+Rabdan+-+RB2+-+Abu+Dhabi";
export const WAZNI_SOCIALS = {
  instagram:
    "https://www.instagram.com/waznijewellery_uae/",
  whatsapp:
    "https://wa.me/971562656550",
} as const;
const footerSections: FooterSection[] = [
  {
    title: "Get To Know Us",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Store", href: "/our-store" },
      { label: "Collections", href: "/search?q=collections" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  // {
  //   title: "Customer Care",
  //   links: [
  //     { label: "Contact Us", href: "/contact" },
  //     { label: "Delivery Information", href: "/delivery" },
  //     { label: "Returns & Exchanges", href: "/returns" },
  //     { label: "Size Guide", href: "/size-guide" },
  //   ],
  // },
  {
    title: "Policies",
    links: [
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Exchange Policy", href: "/exchange-policy" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Jewellery", href: "/jewellery" },
      { label: "Collections", href: "/collections" },
      { label: "Diamonds", href: "/diamonds" },
      { label: "Gold", href: "/gold" },
    ],
  },
  {
    title: "Visit Wazni",
    content: (
      <div className="space-y-3">
        <p>Wazni Jewellery</p>

        <p>
          Al Maqta&apos; St - Rabdan - RB2
          <br />
          Abu Dhabi, UAE
        </p>

        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          <FilledLocationIcon className="h-4 w-4" />
          <span>Get Directions</span>
        </a>
      </div>
    ),
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection((current) => (current === index ? null : index));
  };

  return (
    <footer className="w-full">
  {/* mob tablet view  */}
      <div className="bg-white lg:hidden">
        {/* Accordion sections */}
        <div className="px-5 sm:px-7">
          {footerSections.map((section, index) => {
            const isOpen = openSection === index;

            return (
              <div
                key={section.title}
                className="border-b border-[#071426]/10"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-[16px] font-medium text-[#071426] sm:text-[17px]">
                    {section.title}
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-[#071426]">
                    {isOpen ? (
                      <FilledMinusIcon className="h-[15px] w-[15px]" />
                    ) : (
                      <FilledPlusIcon className="h-[15px] w-[15px]" />
                    )}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="pb-6">
                      {section.links && (
                        <div className="flex flex-col gap-4">
                          {section.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="!text-[14px] !text-[#B88734] !no-underline transition-colors duration-300 hover:!text-[#071426] sm:!text-[15px]"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {section.content && (
                        <div
                          className="
                            text-[14px] leading-7 text-[#071426]
                            [&_p]:!text-[#071426]
                            [&_a]:!text-[#B88734]
                            [&_a]:!no-underline
                            [&_svg]:!text-[#B88734]
                          "
                        >
                          {section.content}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile social/contact icons */}
        <div className="border-t border-[#071426]/10 bg-white px-5 py-8 sm:px-7">
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <a
              href="https://www.instagram.com/waznijewellery_uae/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C7A05A] !text-[#071426] !no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#071426] hover:!text-white"
            >
              <FilledInstagramIcon className="h-[22px] w-[22px]" />
            </a>

            <a
              href="https://wa.me/971562656550"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C7A05A] !text-[#071426] !no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#071426] hover:!text-white"
            >
              <FilledWhatsAppIcon className="h-[23px] w-[23px]" />
            </a>

            <a
              href="tel:025581720"
              aria-label="Call Wazni Jewellery"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C7A05A] !text-[#071426] !no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#071426] hover:!text-white"
            >
              <FilledPhoneIcon className="h-[21px] w-[21px]" />
            </a>

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wazni Jewellery location"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C7A05A] !text-[#071426] !no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#071426] hover:!text-white"
            >
              <FilledLocationIcon className="h-[22px] w-[22px]" />
            </a>
          </div>
        </div>

        {/* Mobile copyright */}
        <div className="border-t border-[#071426]/10 bg-white px-5 py-5 sm:px-7">
          <p className="text-center text-[11px] leading-5 text-[#071426]/65">
            © 2026 Wazni Jewellery. All Rights Reserved.
          </p>

          <div className="mt-2 flex items-center justify-center gap-3">
            <Link
              href="/privacy-policy"
              className="!text-[10px] !text-[#071426]/60 !no-underline transition-colors hover:!text-[#B88734]"
            >
              Privacy Policy
            </Link>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[#B88734]"
            />

            <Link
              href="/terms"
              className="!text-[10px] !text-[#071426]/60 !no-underline transition-colors hover:!text-[#B88734]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

{/* desktpo view  */}
      <div
        className="
          hidden bg-[#071426] lg:block
          [&_a]:!no-underline
        "
      >
        <div className="mx-auto max-w-[1600px] px-10 py-16 xl:px-12 xl:py-20">
          {/* Logo */}
          <div className="border-b border-[#C7A05A]/25 pb-12 text-center">
            <Link
              href="/"
              aria-label="Wazni Jewellery home"
              className="inline-flex flex-col items-center"
            >
              <span className="font-serif text-[46px] font-light leading-none tracking-[0.24em] !text-[#C7A05A] [text-indent:0.24em]">
                WAZNI
              </span>

              <span className="mt-3 text-[11px] font-light uppercase tracking-[0.46em] !text-[#C7A05A] [text-indent:0.46em]">
                Jewellery
              </span>
            </Link>
          </div>

          {/* Desktop columns */}
          <div className="grid grid-cols-5 gap-10 py-14">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] !text-[#C7A05A]">
                  {section.title}
                </h3>

                <div className="mt-6">
                  {/* Normal links */}
                  {section.links && (
                    <div className="flex flex-col items-start gap-4">
                      {section.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          style={{
                            color: "#D8DEE7",
                          }}
                          className="
                            !text-[13px]
                            !text-[#D8DEE7]
                            !no-underline
                            transition-colors
                            duration-300
                            hover:!text-[#C7A05A]
                          "
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Visit Wazni */}
                  {section.content && (
                    <div
                      className="
                        text-[13px] leading-7
                        !text-[#D8DEE7]

                        [&_p]:!text-[#D8DEE7]

                        [&_a]:!text-[#C7A05A]
                        [&_a]:!no-underline

                        [&_svg]:!text-[#C7A05A]
                      "
                    >
                      {section.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social / policy row */}
          <div className="flex items-center justify-between border-t border-[#C7A05A]/20 py-7">
            {/* Social buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-[#C7A05A]
                  !text-[#071426]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:!text-[#071426]
                "
              >
                <FilledInstagramIcon className="h-[19px] w-[19px]" />
              </a>

              <a
                href="https://wa.me/971562656550"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-[#C7A05A]
                  !text-[#071426]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:!text-[#071426]
                "
              >
                <FilledWhatsAppIcon className="h-5 w-5" />
              </a>

              <a
                href="tel:025581720"
                aria-label="Call Wazni Jewellery"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-[#C7A05A]
                  !text-[#071426]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:!text-[#071426]
                "
              >
                <FilledPhoneIcon className="h-[18px] w-[18px]" />
              </a>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wazni Jewellery location"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-[#C7A05A]
                  !text-[#071426]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:!text-[#071426]
                "
              >
                <FilledLocationIcon className="h-[19px] w-[19px]" />
              </a>
            </div>

            {/* Desktop policy links */}
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                style={{ color: "#AAB4C3" }}
                className="!text-[11px] !text-[#AAB4C3] !no-underline transition-colors hover:!text-[#C7A05A]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                style={{ color: "#AAB4C3" }}
                className="!text-[11px] !text-[#AAB4C3] !no-underline transition-colors hover:!text-[#C7A05A]"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-center text-[11px] !text-[#8D9AAA]">
              © 2026 Wazni Jewellery. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Filled icons 
export function FilledInstagramIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.7 2h8.6C19.45 2 22 4.55 22 7.7v8.6c0 3.15-2.55 5.7-5.7 5.7H7.7C4.55 22 2 19.45 2 16.3V7.7C2 4.55 4.55 2 7.7 2Zm-.2 2C5.57 4 4 5.57 4 7.5v9C4 18.43 5.57 20 7.5 20h9c1.93 0 3.5-1.57 3.5-3.5v-9C20 5.57 18.43 4 16.5 4h-9Zm10.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

export function FilledWhatsAppIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.55 2 2.1 6.45 2.1 11.94c0 1.75.46 3.46 1.32 4.96L2 22l5.23-1.37a9.87 9.87 0 0 0 4.8 1.22h.01c5.49 0 9.94-4.45 9.94-9.94C21.98 6.45 17.53 2 12.04 2Zm0 17.98a8 8 0 0 1-4.08-1.11l-.29-.17-3.1.81.83-3.02-.19-.31a8.03 8.03 0 1 1 6.83 3.8Zm4.4-6.03c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function FilledPhoneIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.48 15.48 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

export function FilledLocationIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a8 8 0 0 0-8 8c0 5.44 7.05 11.37 7.35 11.62a1 1 0 0 0 1.3 0C12.95 21.37 20 15.44 20 10a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
  );
}

export function FilledPlusIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M10.5 3h3v7.5H21v3h-7.5V21h-3v-7.5H3v-3h7.5V3Z" />
    </svg>
  );
}

export function FilledMinusIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 10.5h18v3H3v-3Z" />
    </svg>
  );
}