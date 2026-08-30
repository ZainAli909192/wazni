"use client";

import Link from "next/link";

import { useStore } from "@/components/providers/store-provider";
import OrderDetails from "./order-details";

export default function OrderDetailsLoader({ id }: { id: string }) {
  const { ready, orders } = useStore();
  const order = orders.find((item) => item.id === id);

  if (!ready) return <main className="min-h-[60vh] bg-[#FCFAF6]" aria-busy="true" />;

  if (!order) {
    return (
      <main className="min-h-[60vh] bg-[#FCFAF6] px-5 py-20 text-center">
        <h1 className="font-serif text-3xl text-[#071426]">Order not found</h1>
        <Link href="/account/orders" className="mt-6 inline-flex bg-[#C7A05A] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#071426]">Back to My Orders</Link>
      </main>
    );
  }

  return <OrderDetails order={{
    id: order.id,
    date: order.date,
    status: order.status,
    total: order.total,
    items: order.items.map((item) => ({ name: item.name, image: item.image, quantity: item.quantity, price: item.price })),
  }} />;
}
