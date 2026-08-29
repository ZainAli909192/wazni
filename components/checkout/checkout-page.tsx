"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ArrowRight,
  Check,
  ChevronLeft,
  CreditCard,
  MapPin,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import {
  products,
  type Product,
} from "@/lib/shop-data";

type CheckoutItem = {
  product: Product;
  quantity: number;
};

type DeliveryMethod = "delivery" | "pickup";

const emirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

export default function CheckoutPage() {
  const checkoutItems: CheckoutItem[] = [
    {
      product:
        products.find(
          (item) =>
            item.slug === "diamond-halo-ring"
        ) ?? products[0],
      quantity: 1,
    },
    {
      product:
        products.find(
          (item) =>
            item.slug === "rose-gold-diamond-ring"
        ) ?? products[1],
      quantity: 1,
    },
  ];

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");

  const subtotal = useMemo(
    () =>
      checkoutItems.reduce(
        (total, item) =>
          total +
          item.product.price * item.quantity,
        0
      ),
    [checkoutItems]
  );

  const totalQuantity = checkoutItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#FCFAF6] text-[#071426]">
      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <div className="border-b border-[#071426]/10 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-10">
          <CheckoutProgress activeStep={2} />
        </div>
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#071426]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#C7A05A]/15" />
        <div className="absolute -bottom-40 left-[20%] h-80 w-80 rotate-45 border border-[#C7A05A]/10" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-11 text-center sm:px-6 lg:px-10 lg:py-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C7A05A]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#C7A05A]">
              Secure Checkout
            </p>

            <span className="h-px w-8 bg-[#C7A05A]" />
          </div>

          <h1 className="mt-4 font-serif text-[38px] text-white sm:text-[46px] lg:text-[52px]">
            Complete Your Order
          </h1>

          <p className="mx-auto mt-3 max-w-[520px] text-[11px] leading-6 text-white/55 sm:text-[12px]">
            Enter your contact and delivery details before
            proceeding to secure payment.
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
<div className="mx-auto max-w-[1050px]">
            {/* =================================================
              LEFT
          ================================================== */}

          <div className="space-y-5">
            {/* CONTACT */}

            <CheckoutSection
              number="01"
              eyebrow="Your Details"
              title="Contact Information"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First Name"
                  name="firstName"
                  placeholder="First name"
                  required
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  placeholder="Last name"
                  required
                />

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />

                <Field
                  label="Mobile Number"
                  name="phone"
                  type="tel"
                  placeholder="+971"
                  required
                />
              </div>
            </CheckoutSection>

            {/* DELIVERY METHOD */}

            <CheckoutSection
              number="02"
              eyebrow="How Would You Like It?"
              title="Delivery Method"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <DeliveryOption
                  active={
                    deliveryMethod === "delivery"
                  }
                  icon={<Truck size={23} />}
                  title="Home Delivery"
                  description="Have your jewellery delivered to your address."
                  onClick={() =>
                    setDeliveryMethod("delivery")
                  }
                />

                <DeliveryOption
                  active={
                    deliveryMethod === "pickup"
                  }
                  icon={<Store size={22} />}
                  title="Boutique Pickup"
                  description="Collect your order directly from Wazni."
                  onClick={() =>
                    setDeliveryMethod("pickup")
                  }
                />
              </div>
            </CheckoutSection>

            {/* ADDRESS */}

            {deliveryMethod === "delivery" ? (
              <CheckoutSection
                number="03"
                eyebrow="Where Should We Deliver?"
                title="Delivery Address"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <SelectField
                      label="Country"
                      name="country"
                      options={[
                        "United Arab Emirates",
                      ]}
                      required
                    />
                  </div>

                  <SelectField
                    label="Emirate"
                    name="emirate"
                    options={emirates}
                    placeholder="Select emirate"
                    required
                  />

                  <Field
                    label="Area"
                    name="area"
                    placeholder="Area / neighbourhood"
                    required
                  />

                  <div className="sm:col-span-2">
                    <Field
                      label="Street / Building"
                      name="street"
                      placeholder="Street name, building or villa"
                      required
                    />
                  </div>

                  <Field
                    label="Apartment / Villa"
                    name="unit"
                    placeholder="Apartment, floor or villa number"
                  />

                  <Field
                    label="Landmark"
                    name="landmark"
                    placeholder="Nearby landmark"
                  />

                  <div className="sm:col-span-2">
                    <TextArea
                      label="Delivery Notes"
                      name="notes"
                      placeholder="Any information that may help with delivery..."
                    />
                  </div>
                </div>
              </CheckoutSection>
            ) : (
              <CheckoutSection
                number="03"
                eyebrow="Collection Point"
                title="Wazni Boutique"
              >
                <div className="border border-[#C7A05A]/25 bg-[#F8F3E9] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C7A05A] text-[#071426]">
                      <MapPin
                        size={20}
                        fill="currentColor"
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-[22px] text-[#071426]">
                        Wazni Jewellery
                      </h3>

                      <p className="mt-2 text-[12px] leading-6 text-[#071426]/60">
                        Al Maqta&apos; St - Rabdan - RB2
                        <br />
                        Abu Dhabi, UAE
                      </p>

                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Wazni+Jewellery%2C+Al+Maqta%27+St+-+Rabdan+-+RB2+-+Abu+Dhabi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 !text-[9px] font-semibold uppercase tracking-[0.14em] !text-[#B88734] !no-underline"
                      >
                        Get Directions
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </CheckoutSection>
            )}

            {/* BACK */}

       {/* Checkout form  */}

<div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
  {/* RETURN TO BAG */}
  <Link
    href="/bag"
    className="
      group
      flex h-[58px] w-full
      items-center justify-center
      gap-3
      border border-[#071426]/20
      bg-white
      px-6
      !text-[10px] font-semibold uppercase
      tracking-[0.16em]
      !text-[#071426]
      !no-underline
      transition-all duration-300
      hover:border-[#C7A05A]
      hover:bg-[#FAF7F1]
      hover:!text-[#B88734]
      sm:text-[11px]
    "
  >
    <ChevronLeft
      size={16}
      strokeWidth={1.7}
      className="
        transition-transform duration-300
        group-hover:-translate-x-1
      "
    />

    <span>Return To Bag</span>

    <ShoppingBag
      size={16}
      strokeWidth={1.6}
    />
  </Link>

  {/* CONTINUE TO PAYMENT */}
  <Link
    href="/payment"
    className="
      group
      flex h-[58px] w-full
      items-center justify-center
      gap-3
      border border-[#C7A05A]
      bg-[#C7A05A]
      px-6
      !text-[10px] font-bold uppercase
      tracking-[0.17em]
      !text-[#071426]
      !no-underline
      transition-all duration-300
      hover:border-[#D8B66D]
      hover:bg-[#D8B66D]
      sm:text-[11px]
    "
  >
    <span>Continue To Payment</span>

    <CreditCard
      size={17}
      strokeWidth={1.6}
    />

    <ArrowRight
      size={16}
      strokeWidth={1.7}
      className="
        transition-transform duration-300
        group-hover:translate-x-1
      "
    />
  </Link>
</div>
          </div>

        </div>
      </section>
    </main>
  );
}

// progress 

function CheckoutProgress({
  activeStep,
}: {
  activeStep: number;
}) {
  const steps = [
    {
      number: 1,
      label: "Bag",
    },
    {
      number: 2,
      label: "Checkout",
    },
    {
      number: 3,
      label: "Payment",
    },
    {
      number: 4,
      label: "Confirmation",
    },
  ];

  return (
    <div className="mx-auto flex max-w-[650px] items-center justify-between">
      {steps.map((step, index) => {
        const completed =
          step.number < activeStep;

        const active =
          step.number === activeStep;

        return (
          <div
            key={step.label}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold ${
                  completed || active
                    ? "bg-[#C7A05A] text-[#071426]"
                    : "border border-[#071426]/20 text-[#071426]/40"
                }`}
              >
                {completed ? (
                  <Check
                    size={13}
                    strokeWidth={2}
                  />
                ) : (
                  step.number
                )}
              </span>

              <span
                className={`mt-2 hidden text-[8px] font-semibold uppercase tracking-[0.11em] sm:block ${
                  active
                    ? "text-[#071426]"
                    : "text-[#071426]/35"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <span
                className={`mx-2 h-px flex-1 sm:mx-4 ${
                  step.number < activeStep
                    ? "bg-[#C7A05A]"
                    : "bg-[#071426]/12"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================
   SECTION
========================================================== */

function CheckoutSection({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-[#C7A05A]/20 bg-white">
      <div className="flex items-center gap-4 border-b border-[#071426]/8 px-5 py-5 sm:px-7">
        <span className="font-serif text-[24px] text-[#C7A05A]">
          {number}
        </span>

        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-serif text-[23px] text-[#071426] sm:text-[26px]">
            {title}
          </h2>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {children}
      </div>
    </section>
  );
}

/* ==========================================================
   FIELDS
========================================================== */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/55">
        {label}

        {required && (
          <span className="ml-1 text-[#B88734]">
            *
          </span>
        )}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="
          h-[52px] w-full
          border border-[#071426]/15
          bg-white px-4
          text-[13px] text-[#071426]
          outline-none
          transition-colors
          placeholder:text-[#071426]/30
          focus:border-[#C7A05A]
        "
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/55">
        {label}

        {required && (
          <span className="ml-1 text-[#B88734]">
            *
          </span>
        )}
      </span>

      <select
        name={name}
        required={required}
        defaultValue=""
        className="
          h-[52px] w-full
          border border-[#071426]/15
          bg-white px-4
          text-[13px] text-[#071426]
          outline-none
          transition-colors
          focus:border-[#C7A05A]
        "
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/55">
        {label}
      </span>

      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="
          w-full resize-none
          border border-[#071426]/15
          bg-white p-4
          text-[13px] text-[#071426]
          outline-none
          transition-colors
          placeholder:text-[#071426]/30
          focus:border-[#C7A05A]
        "
      />
    </label>
  );
}

// delivery options 

function DeliveryOption({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative min-h-[135px] border p-5 text-left transition-all ${
        active
          ? "border-[#C7A05A] bg-[#F8F3E9]"
          : "border-[#071426]/12 bg-white hover:border-[#C7A05A]/50"
      }`}
    >
      {active && (
        <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#C7A05A] text-[#071426]">
          <Check
            size={12}
            strokeWidth={2}
          />
        </span>
      )}

      <span
        className={
          active
            ? "text-[#B88734]"
            : "text-[#071426]/55"
        }
      >
        {icon}
      </span>

      <p className="mt-4 text-[12px] font-semibold text-[#071426]">
        {title}
      </p>

      <p className="mt-2 max-w-[250px] text-[10px] leading-5 text-[#071426]/45">
        {description}
      </p>
    </button>
  );
}
