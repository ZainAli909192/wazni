import OrderConfirmation from "@/components/order/order-confirmation";
import { Suspense } from "react";

export default function Confirmation() {
  return <Suspense fallback={<main className="min-h-[60vh] bg-[#FCFAF6]" />}><OrderConfirmation /></Suspense>;
}
