"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  ArrowRight,
  Check,
  MapPin,
  PackageCheck,
} from "lucide-react";
import { useStore } from "@/components/providers/store-provider";

export default function OrderConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, isAuthenticated, orders } = useStore();
  const orderId = searchParams.get("order");
  const order = orders.find((item) => item.id === orderId);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) router.replace("/account/login");
    else if (!order) router.replace("/account/orders");
  }, [isAuthenticated, order, ready, router]);

  if (!ready || !isAuthenticated || !order) {
    return <main className="min-h-[60vh] bg-[#FCFAF6]" aria-busy="true" />;
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] text-[#071426]">
      <section className="relative overflow-hidden bg-[#071426] px-5 py-16 text-center sm:py-20 lg:py-24">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C7A05A]/10" />

        <div className="relative mx-auto max-w-[700px]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C7A05A] text-[#071426]">
            <Check
              size={27}
              strokeWidth={2}
            />
          </div>

          <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#C7A05A]">
            Order Confirmed
          </p>

          <h1 className="mt-4 font-serif text-[39px] leading-tight text-white sm:text-[48px] lg:text-[56px]">
            Thank You For Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-[500px] text-[11px] leading-6 text-white/55 sm:text-[12px]">
            Your Wazni jewellery order has been received.
            Confirmation details will be sent to your email.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 lg:py-12">
        <div className="overflow-hidden border border-[#C7A05A]/25 bg-white shadow-[0_20px_60px_rgba(7,20,38,0.06)]">
          <div className="grid sm:grid-cols-3">
            <ConfirmationStat
              label="Order Number"
              value={order.id}
            />

            <ConfirmationStat
              label="Order Status"
              value="Confirmed"
            />

            <ConfirmationStat
              label="Payment"
              value={order.paymentMethod === "card" ? "Paid by Card" : order.paymentMethod}
              last
            />
          </div>

          <div className="border-t border-[#071426]/8 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <InfoBlock
                icon={
                  <PackageCheck
                    size={20}
                  />
                }
                title="What Happens Next?"
              >
                Our team will prepare your jewellery and
                keep you updated as your order progresses.
              </InfoBlock>

              <InfoBlock
                icon={<MapPin size={20} />}
                title="Delivery"
              >
                Delivery details and timing will be
                confirmed with you before dispatch.
              </InfoBlock>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#071426]/8 pt-7 sm:flex-row sm:justify-center">
              <Link
                href="/jewellery"
                className="
                  flex min-h-[54px] items-center
                  justify-center gap-2
                  bg-[#C7A05A] px-8
                  !text-[10px] font-semibold uppercase
                  tracking-[0.15em]
                  !text-[#071426]
                  !no-underline
                  transition-colors
                  hover:bg-[#D7B772]
                "
              >
                Continue Shopping
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/account/orders"
                className="
                  flex min-h-[54px] items-center
                  justify-center
                  border border-[#071426]/15
                  px-8
                  !text-[10px] font-semibold uppercase
                  tracking-[0.15em]
                  !text-[#071426]
                  !no-underline
                  transition-colors
                  hover:border-[#C7A05A]
                "
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ConfirmationStat({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-5 py-6 text-center ${
        !last
          ? "border-b border-[#071426]/8 sm:border-b-0 sm:border-r"
          : ""
      }`}
    >
      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#B88734]">
        {label}
      </p>

      <p className="mt-2 font-serif text-[19px]">
        {value}
      </p>
    </div>
  );
}

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#C7A05A]/15 bg-[#FAF7F1] p-5">
      <span className="text-[#B88734]">
        {icon}
      </span>

      <h3 className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em]">
        {title}
      </h3>

      <p className="mt-2 text-[10px] leading-5 text-[#071426]/50">
        {children}
      </p>
    </div>
  );
}
