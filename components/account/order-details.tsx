"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  CreditCard,
  MapPin,
  Truck,
} from "lucide-react";

import AccountShell from "./account-shell";

import type {
  CustomerOrder,
} from "@/lib/account-data";

export default function OrderDetails({
  order,
}: {
  order: CustomerOrder;
}) {
  const timeline = getTimeline(
    order.status
  );

  return (
    <AccountShell title="Order Details">
      <div className="space-y-5">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 !text-[9px] font-semibold uppercase tracking-[0.13em] !text-[#071426] !no-underline hover:!text-[#B88734]"
        >
          <ArrowLeft size={14} />

          Back To Orders
        </Link>

        {/* ORDER HEADER */}

        <section className="overflow-hidden border border-[#C7A05A]/20 bg-white">
          <div className="flex flex-col gap-5 bg-[#071426] px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#C7A05A]">
                Order Number
              </p>

              <h2 className="mt-2 font-serif text-[26px]">
                {order.id}
              </h2>

              <div className="mt-3 flex items-center gap-2 text-[9px] text-white/50">
                <CalendarDays size={12} />

                {order.date}
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[8px] uppercase tracking-[0.15em] text-white/45">
                Order Total
              </p>

              <p className="mt-2 font-serif text-[29px] text-[#C7A05A]">
                AED{" "}
                {order.total.toLocaleString(
                  "en-AE"
                )}
              </p>
            </div>
          </div>

          {/* STATUS TIMELINE */}

          <div className="px-5 py-7 sm:px-8">
            <p className="mb-6 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#B88734]">
              Order Progress
            </p>

            <div className="grid grid-cols-4">
              {timeline.map(
                (step, index) => (
                  <div
                    key={step.label}
                    className="relative text-center"
                  >
                    {index !==
                      timeline.length -
                        1 && (
                      <div
                        className={`absolute left-1/2 top-[14px] h-px w-full ${
                          step.complete
                            ? "bg-[#C7A05A]"
                            : "bg-[#071426]/12"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
                        step.complete
                          ? "bg-[#C7A05A] text-[#071426]"
                          : "border border-[#071426]/20 bg-white text-[#071426]/35"
                      }`}
                    >
                      {step.complete ? (
                        <Check
                          size={12}
                        />
                      ) : (
                        <span className="text-[8px]">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-3 text-[7px] font-semibold uppercase tracking-[0.08em] sm:text-[8px] ${
                        step.complete
                          ? "text-[#071426]"
                          : "text-[#071426]/35"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ITEMS */}

        <section className="border border-[#C7A05A]/20 bg-white">
          <div className="border-b border-[#071426]/8 px-6 py-5 sm:px-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#B88734]">
              Order Items
            </p>

            <h2 className="mt-1 font-serif text-[24px]">
              Your Jewellery
            </h2>
          </div>

          <div className="divide-y divide-[#071426]/8 px-5 sm:px-8">
            {order.items.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 py-5"
              >
                <div className="relative h-[90px] w-[90px] shrink-0 bg-[#F8F5EF]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="90px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="min-w-0 flex-1 self-center">
                  <h3 className="font-serif text-[17px]">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-[9px] text-[#071426]/45">
                    Quantity:{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="self-center text-[13px] font-semibold text-[#B88734]">
                  AED{" "}
                  {item.price.toLocaleString(
                    "en-AE"
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DETAILS */}

        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard
            icon={<MapPin size={19} />}
            title="Delivery Address"
          >
            Rabdan
            <br />
            Abu Dhabi, UAE
          </InfoCard>

          <InfoCard
            icon={
              <CreditCard size={19} />
            }
            title="Payment"
          >
            Paid
            <br />
            Credit / Debit Card
          </InfoCard>

          <InfoCard
            icon={<Truck size={19} />}
            title="Delivery"
          >
            Home Delivery
            <br />
            UAE
          </InfoCard>
        </div>
      </div>
    </AccountShell>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#C7A05A]/20 bg-white p-5">
      <span className="text-[#B88734]">
        {icon}
      </span>

      <h3 className="mt-3 text-[9px] font-semibold uppercase tracking-[0.13em]">
        {title}
      </h3>

      <p className="mt-2 text-[10px] leading-5 text-[#071426]/50">
        {children}
      </p>
    </div>
  );
}

function getTimeline(
  status: CustomerOrder["status"]
) {
  if (status === "Cancelled") {
    return [
      {
        label: "Confirmed",
        complete: true,
      },
      {
        label: "Cancelled",
        complete: true,
      },
      {
        label: "Processing",
        complete: false,
      },
      {
        label: "Delivered",
        complete: false,
      },
    ];
  }

  const positions = {
    Confirmed: 1,
    Processing: 2,
    Delivered: 4,
  };

  const active =
    positions[
      status as keyof typeof positions
    ] ?? 1;

  return [
    {
      label: "Confirmed",
      complete: active >= 1,
    },
    {
      label: "Processing",
      complete: active >= 2,
    },
    {
      label: "Prepared",
      complete: active >= 3,
    },
    {
      label: "Delivered",
      complete: active >= 4,
    },
  ];
}
