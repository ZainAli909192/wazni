"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ArrowRight,
  Ban,
  CalendarDays,
  Eye,
  Package,
  X,
} from "lucide-react";

import AccountShell from "./account-shell";

import {
  type CustomerOrder,
} from "@/lib/account-data";
import { useStore } from "@/components/providers/store-provider";

export default function OrdersPage() {
  const { orders: storedOrders, cancelOrder: cancelStoredOrder } = useStore();
  const orders: CustomerOrder[] = storedOrders.map((order) => ({
    id: order.id,
    date: order.date,
    status: order.status,
    total: order.total,
    items: order.items.map((item) => ({
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
    })),
  }));

  const [cancelOrder, setCancelOrder] =
    useState<CustomerOrder | null>(null);

  async function confirmCancellation() {
    if (!cancelOrder) return;

    try {
      await cancelStoredOrder(cancelOrder.id);
      setCancelOrder(null);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to cancel this order.");
    }
  }

  return (
    <AccountShell title="My Orders">
      <div className="space-y-5">
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          orders.map((order) => {
            const cancellable =
              order.status === "Confirmed" ||
              order.status === "Processing";

            return (
              <article
                key={order.id}
                className="overflow-hidden border border-[#C7A05A]/20 bg-white transition-all hover:border-[#C7A05A]/45 hover:shadow-[0_16px_45px_rgba(7,20,38,0.05)]"
              >
                {/* HEADER */}

                <div className="flex flex-col gap-4 border-b border-[#071426]/8 bg-[#FAF7F1] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div>
                    <div className="flex items-center gap-2">
                      <Package
                        size={14}
                        className="text-[#B88734]"
                      />

                      <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#B88734]">
                        Order
                      </p>
                    </div>

                    <p className="mt-2 text-[13px] font-semibold text-[#071426]">
                      {order.id}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-[9px] text-[#071426]/42">
                      <CalendarDays size={12} />
                      {order.date}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <OrderStatus
                      status={order.status}
                    />

                    <p className="font-serif text-[23px] text-[#B88734]">
                      AED{" "}
                      {order.total.toLocaleString(
                        "en-AE"
                      )}
                    </p>
                  </div>
                </div>

                {/* PRODUCTS */}

                <div className="divide-y divide-[#071426]/8 px-5 sm:px-7">
                  {order.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex gap-4 py-5"
                    >
                      <div className="relative h-[82px] w-[82px] shrink-0 bg-[#F8F5EF]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="82px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="min-w-0 flex-1 self-center">
                        <p className="font-serif text-[16px] text-[#071426]">
                          {item.name}
                        </p>

                        <p className="mt-2 text-[9px] text-[#071426]/45">
                          Quantity:{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <p className="self-center text-[12px] font-semibold text-[#B88734]">
                        AED{" "}
                        {item.price.toLocaleString(
                          "en-AE"
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}

                <div className="flex flex-col gap-3 border-t border-[#071426]/8 bg-[#FCFAF6] px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                  <Link
                    href={`/account/orders/${encodeURIComponent(
                      order.id
                    )}`}
                    className="group flex min-h-[44px] items-center justify-center gap-2 border border-[#071426]/15 bg-white px-5 !text-[9px] font-semibold uppercase tracking-[0.12em] !text-[#071426] !no-underline transition-all hover:border-[#C7A05A] hover:!text-[#B88734]"
                  >
                    <Eye size={14} />

                    View Order

                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  {cancellable && (
                    <button
                      type="button"
                      onClick={() =>
                        setCancelOrder(order)
                      }
                      className="flex min-h-[44px] items-center justify-center gap-2 border border-[#C96C6C]/30 bg-white px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A94E4E] transition-all hover:border-[#A94E4E] hover:bg-[#FFF7F7]"
                    >
                      <Ban size={14} />

                      Cancel Order
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {cancelOrder && (
        <CancelOrderModal
          order={cancelOrder}
          onClose={() =>
            setCancelOrder(null)
          }
          onConfirm={
            confirmCancellation
          }
        />
      )}
    </AccountShell>
  );
}

/* =========================================================
   CANCEL MODAL
========================================================= */

function CancelOrderModal({
  order,
  onClose,
  onConfirm,
}: {
  order: CustomerOrder;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [reason, setReason] =
    useState("Changed my mind");

  const [note, setNote] =
    useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071426]/55 px-4 backdrop-blur-[3px]">
      <div className="w-full max-w-[540px] overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,.18)]">
        <div className="flex items-center justify-between border-b border-[#071426]/10 bg-[#FAF7F1] px-6 py-5">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#B88734]">
              Order Cancellation
            </p>

            <h2 className="mt-1 font-serif text-[25px] text-[#071426]">
              Cancel Order
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#071426]/50 transition-colors hover:bg-white hover:text-[#071426]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-[11px] leading-6 text-[#071426]/55">
            Are you sure you want to
            cancel order{" "}
            <strong className="text-[#071426]">
              {order.id}
            </strong>
            ?
          </p>

          <label className="mt-5 block">
            <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/50">
              Reason
            </span>

            <select
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value
                )
              }
              className="h-[52px] w-full border border-[#071426]/15 bg-white px-4 text-[12px] outline-none focus:border-[#C7A05A] focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
            >
              <option>
                Changed my mind
              </option>

              <option>
                Ordered by mistake
              </option>

              <option>
                Need to change product
              </option>

              <option>
                Delivery timing
              </option>

              <option>
                Other
              </option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/50">
              Additional Note
            </span>

            <textarea
              value={note}
              onChange={(event) =>
                setNote(
                  event.target.value
                )
              }
              rows={4}
              placeholder="Optional note..."
              className="w-full resize-none border border-[#071426]/15 p-4 text-[12px] outline-none placeholder:text-[#071426]/25 focus:border-[#C7A05A] focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
            />
          </label>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[52px] border border-[#071426]/15 bg-white text-[9px] font-semibold uppercase tracking-[0.14em] text-[#071426] transition-colors hover:border-[#C7A05A]"
            >
              Keep Order
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="min-h-[52px] bg-[#A94E4E] px-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#8F4242]"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderStatus({
  status,
}: {
  status: CustomerOrder["status"];
}) {
  const styles = {
    Confirmed:
      "bg-[#F3E9D6] text-[#B88734]",

    Processing:
      "bg-[#E7EFF7] text-[#41698E]",

    Delivered:
      "bg-[#E5F2EA] text-[#4E7E5F]",

    Cancelled:
      "bg-[#F9E7E7] text-[#A94E4E]",
  };

  return (
    <span
      className={`px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.11em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function EmptyOrders() {
  return (
    <div className="border border-[#C7A05A]/20 bg-white px-5 py-20 text-center">
      <Package
        size={35}
        className="mx-auto text-[#B88734]"
      />

      <h2 className="mt-5 font-serif text-[29px]">
        No orders yet
      </h2>

      <p className="mx-auto mt-3 max-w-[380px] text-[11px] leading-6 text-[#071426]/45">
        Your Wazni orders will
        appear here after your first
        purchase.
      </p>

      <Link
        href="/jewellery"
        className="mt-6 inline-flex min-h-[50px] items-center bg-[#C7A05A] px-7 !text-[9px] font-semibold uppercase tracking-[0.14em] !text-[#071426] !no-underline"
      >
        Explore Jewellery
      </Link>
    </div>
  );
}
