"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Check,
  ChevronLeft,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import {
  products,
} from "@/lib/shop-data";
import { useCart } from "@/components/shop/cart-provider";
import { useStore } from "@/components/providers/store-provider";

type PaymentMethod =
  | "card"
  | "tamara"
  | "tabby"
  ;

export default function PaymentPage() {
  const router = useRouter();
  const isCompletingOrder = useRef(false);
  const { items: cartLines, hydrated, clearCart } = useCart();
  const { ready, isAuthenticated, checkout, setPaymentMethod: savePaymentMethod, placeOrder, clearCheckout } = useStore();
  const items = useMemo(() => cartLines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ product, quantity: line.quantity }] : [];
  }), [cartLines]);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.product.price *
            item.quantity,
        0
      ),
    [items]
  );

  useEffect(() => {
    if (!ready || !hydrated) return;
    if (isCompletingOrder.current) return;
    if (!isAuthenticated) router.replace("/account/login?redirect=%2Fpayment");
    else if (!items.length) router.replace("/bag");
    else if (checkout.deliveryMethod === "delivery" && !checkout.selectedAddress) router.replace("/checkout");
  }, [checkout.deliveryMethod, checkout.selectedAddress, hydrated, isAuthenticated, items.length, ready, router]);

  function handlePayment() {
    if (isCompletingOrder.current) return;
    isCompletingOrder.current = true;

    savePaymentMethod(paymentMethod);
    const order = placeOrder(items.map(({ product, quantity }) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      sku: product.sku,
      price: product.price,
      quantity,
    })), subtotal);
    router.push(`/order-confirmation?order=${encodeURIComponent(order.id)}`);
    clearCart();
    clearCheckout();
  }

  if (!ready || !hydrated || !isAuthenticated || !items.length) {
    return <main className="min-h-[60vh] bg-[#FCFAF6]" aria-busy="true" />;
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] text-[#071426]">
    
    {/* progress  */}

      <div className="border-b border-[#071426]/10 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-10">
          <PaymentProgress />
        </div>
      </div>


{/* Main  */}

      <section className="mx-auto max-w-[1250px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
        
        {/* payment field  */}

          <div>
            <section className="overflow-hidden border border-[#C7A05A]/20 bg-white">
              <div className="border-b border-[#071426]/8 px-6 py-6 sm:px-7">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
                  Choose Payment
                </p>

                <h2 className="mt-2 font-serif text-[28px] text-[#071426]">
                  Payment Method
                </h2>

                <p className="mt-2 text-[10px] text-[#071426]/45">
                  Select how you would like to pay.
                </p>
              </div>

              <div className="p-5 sm:p-7">
                {/* PAYMENT METHODS */}

                <div className="grid gap-3 sm:grid-cols-3">
                  <PaymentOption
                    active={
                      paymentMethod === "card"
                    }
                    title="Card"
                    description="Credit / Debit"
                    icon={
                      <CreditCard
                        size={21}
                      />
                    }
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                  />

                  <PaymentOption
                    active={
                      paymentMethod === "tamara"
                    }
                    title="Tamara"
                    description="Pay later"
                    icon={
                      <WalletCards
                        size={21}
                      />
                    }
                    onClick={() =>
                      setPaymentMethod("tamara")
                    }
                  />

                  <PaymentOption
                    active={
                      paymentMethod === "tabby"
                    }
                    title="Tabby"
                    description="Pay in installments"
                    icon={
                      <WalletCards
                        size={21}
                      />
                    }
                    onClick={() =>
                      setPaymentMethod("tabby")
                    }
                  />
                </div>

                {/* ===========================================
                    CARD FORM
                ============================================ */}

                {paymentMethod === "card" && (
                  <div className="mt-6 border border-[#071426]/10 bg-[#FBFAF7] p-5 sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#B88734]">
                          Card Details
                        </p>

                        <h3 className="mt-1 font-serif text-[22px] text-[#071426]">
                          Pay securely by card
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071426] text-[#C7A05A]">
                        <CreditCard
                          size={19}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {/* CARD NUMBER */}

                      <PaymentField
                        label="Card Number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        inputMode="numeric"
                        required
                      />

                      {/* CARD HOLDER */}

                      <PaymentField
                        label="Cardholder Name"
                        name="cardHolder"
                        placeholder="Name as shown on card"
                        required
                      />

                      {/* EXPIRY + CVV */}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <PaymentField
                          label="Expiry Date"
                          name="expiry"
                          placeholder="MM / YY"
                          inputMode="numeric"
                          required
                        />

                        <PaymentField
                          label="CVV"
                          name="cvv"
                          placeholder="123"
                          inputMode="numeric"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex items-start gap-3 border-t border-[#071426]/8 pt-5">
                      <ShieldCheck
                        size={17}
                        className="mt-[1px] shrink-0 text-[#B88734]"
                      />

                      <p className="text-[9px] leading-5 text-[#071426]/45">
                        For production, these fields should be
                        replaced by the secure hosted fields of
                        the selected payment gateway.
                      </p>
                    </div>
                  </div>
                )}

                {/* ===========================================
                    TAMARA
                ============================================ */}

                {paymentMethod === "tamara" && (
                  <InstallmentPanel
                    title="Pay with Tamara"
                    text="Continue securely with Tamara to review your available pay-later options before completing the order."
                  />
                )}

                {/* ===========================================
                    TABBY
                ============================================ */}

                {paymentMethod === "tabby" && (
                  <InstallmentPanel
                    title="Pay with Tabby"
                    text="Continue securely with Tabby to see the available installment options for your purchase."
                  />
                )}

                {/* MOBILE TOTAL / PAY CTA */}

                <div className="mt-6 border-t border-[#071426]/10 pt-6 lg:hidden">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.12em]">
                        Total
                      </p>

                      <p className="mt-1 text-[8px] text-[#071426]/40">
                        Final payable amount
                      </p>
                    </div>

                    <p className="font-serif text-[27px] text-[#B88734]">
                      AED{" "}
                      {subtotal.toLocaleString(
                        "en-AE"
                      )}
                    </p>
                  </div>

                  <PayButton
                    method={paymentMethod}
                    amount={subtotal}
                    onPay={handlePayment}
                  />
                </div>
              </div>
            </section>

            {/* BACK */}

            <Link
              href="/checkout"
              className="
                group mt-5 inline-flex min-h-[48px]
                items-center justify-center gap-2
                border border-[#071426]/15
                bg-white px-5
                !text-[9px] font-semibold uppercase
                tracking-[0.14em]
                !text-[#071426]
                !no-underline
                transition-all duration-300
                hover:border-[#C7A05A]
                hover:!text-[#B88734]
              "
            >
              <ChevronLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />

              Back To Checkout
            </Link>
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================== */}

          <aside className="hidden self-start border border-[#C7A05A]/25 bg-white shadow-[0_20px_60px_rgba(7,20,38,0.06)] lg:sticky lg:top-8 lg:block">
            <div className="h-[4px] bg-[#C7A05A]" />

            <div className="bg-[#F7F2E9] px-6 py-6">
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
                Final Review
              </p>

              <h2 className="mt-2 font-serif text-[28px]">
                Your Order
              </h2>
            </div>

            {/* PRODUCTS */}

            <div className="px-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 border-b border-[#071426]/8 py-4"
                >
                  <div className="relative h-[68px] w-[68px] shrink-0 bg-[#F8F5EF]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="68px"
                      className="object-contain p-1.5"
                    />

                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#071426] px-1 text-[8px] text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[14px] leading-5">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.05em] text-[#071426]/40">
                      {item.product.material}
                    </p>

                    <p className="mt-2 text-[11px] font-semibold text-[#B88734]">
                      AED{" "}
                      {(
                        item.product.price *
                        item.quantity
                      ).toLocaleString(
                        "en-AE"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}

            <div className="p-6">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em]">
                    Total
                  </p>

                  <p className="mt-1 text-[8px] text-[#071426]/40">
                    Final payable amount
                  </p>
                </div>

                <p className="font-serif text-[28px] text-[#B88734]">
                  AED{" "}
                  {subtotal.toLocaleString(
                    "en-AE"
                  )}
                </p>
              </div>

              <PayButton
                method={paymentMethod}
                amount={subtotal}
                onPay={handlePayment}
              />

              <div className="mt-4 flex items-center justify-center gap-2 text-[8px] text-[#071426]/40">
                <LockKeyhole
                  size={12}
                  className="text-[#B88734]"
                />

                Secure encrypted payment
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

// payment option 

function PaymentOption({
  active,
  title,
  description,
  icon,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative min-h-[115px] border p-4 text-left transition-all duration-300 ${
        active
          ? "border-[#C7A05A] bg-[#F8F3E9]"
          : "border-[#071426]/12 bg-white hover:border-[#C7A05A]/50"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          active
            ? "bg-[#071426] text-[#C7A05A]"
            : "bg-[#F4F1EA] text-[#071426]/55"
        }`}
      >
        {icon}
      </div>

      <p className="mt-3 text-[11px] font-semibold text-[#071426]">
        {title}
      </p>

      <p className="mt-1 text-[9px] text-[#071426]/45">
        {description}
      </p>

      {active && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#C7A05A] text-[#071426]">
          <Check
            size={11}
            strokeWidth={2}
          />
        </span>
      )}
    </button>
  );
}

// payments options 

function PaymentField({
  label,
  name,
  placeholder,
  inputMode,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "email";
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
        required={required}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete="off"
        className="
          h-[54px] w-full
          border border-[#071426]/15
          bg-white px-4
          text-[13px] text-[#071426]
          outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A]
          transition-colors
          placeholder:text-[#071426]/28
          focus:border-[#C7A05A]
        "
      />
    </label>
  );
}

// instalment plan 

function InstallmentPanel({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mt-6 border border-[#C7A05A]/20 bg-[#F8F3E9] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071426] text-[#C7A05A]">
        <WalletCards size={20} />
      </div>

      <h3 className="mt-4 font-serif text-[22px] text-[#071426]">
        {title}
      </h3>

      <p className="mt-2 max-w-[560px] text-[10px] leading-5 text-[#071426]/50">
        {text}
      </p>

      <div className="mt-4 flex items-center gap-2 text-[9px] text-[#071426]/45">
        <ShieldCheck
          size={14}
          className="text-[#B88734]"
        />

        You will continue securely with the selected provider.
      </div>
    </div>
  );
}

// pay button 

function PayButton({
  method,
  amount,
  onPay,
}: {
  method: PaymentMethod;
  amount: number;
  onPay: () => void;
}) {
  const label =
    method === "card"
      ? `Pay AED ${amount.toLocaleString(
          "en-AE"
        )}`
      : method === "tamara"
        ? "Continue With Tamara"
        : "Continue With Tabby";

  return (
    <button
      type="button"
      onClick={onPay}
      className="
        group mt-7 flex min-h-[58px]
        w-full items-center
        justify-center gap-3
        bg-[#C7A05A]
        px-5
        !text-[10px] font-bold uppercase
        tracking-[0.16em]
        !text-[#071426]
        !no-underline
        transition-all duration-300
        hover:bg-[#D7B772]
      "
    >
      {method === "card" && (
        <CreditCard
          size={16}
          strokeWidth={1.6}
        />
      )}

      {label}

      <ArrowRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
}
// progress 

function PaymentProgress() {
  const steps = [
    {
      number: 1,
      label: "Bag",
      completed: true,
    },
    {
      number: 2,
      label: "Checkout",
      completed: true,
    },
    {
      number: 3,
      label: "Payment",
      completed: false,
    },
    {
      number: 4,
      label: "Confirmation",
      completed: false,
    },
  ];

  return (
    <div className="mx-auto flex max-w-[650px] items-center">
      {steps.map((step, index) => {
        const active =
          step.number === 3;

        return (
          <div
            key={step.label}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] ${
                  step.completed || active
                    ? "bg-[#C7A05A] text-[#071426]"
                    : "border border-[#071426]/20 text-[#071426]/40"
                }`}
              >
                {step.completed ? (
                  <Check
                    size={12}
                  />
                ) : (
                  step.number
                )}
              </span>

              <span
                className={`mt-2 hidden text-[8px] uppercase tracking-[0.1em] sm:block ${
                  active
                    ? "text-[#071426]"
                    : "text-[#071426]/40"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index !==
              steps.length - 1 && (
              <span
                className={`mx-3 h-px flex-1 ${
                  step.completed
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
