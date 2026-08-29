import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function OrderSummary({
  subtotal,
  totalQuantity,
}: {
  subtotal: number;
  totalQuantity: number;
}) {
  return (
    <aside className="overflow-hidden border border-[#C7A05A]/25 bg-white shadow-[0_20px_60px_rgba(7,20,38,0.08)]">
      {/* Gold top */}
      <div className="h-[4px] bg-[#C7A05A]" />

      {/* Heading */}
      <div className="bg-[#F7F2E9] px-6 py-7 sm:px-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B88734]">
          Your Order
        </p>

        <h2 className="mt-3 font-serif text-[31px] text-[#071426]">
          Order Summary
        </h2>

        <p className="mt-2 text-[11px] text-[#071426]/45">
          Review your selection before checkout.
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-7 sm:px-8">
        <div className="space-y-5">
          <SummaryRow
            label={`Subtotal (${totalQuantity} ${
              totalQuantity === 1
                ? "item"
                : "items"
            })`}
            value={`AED ${subtotal.toLocaleString(
              "en-AE"
            )}`}
          />

          <SummaryRow
            label="Delivery"
            value="Calculated at checkout"
            muted
          />
        </div>

        <div className="my-7 h-px bg-[#071426]/10" />

        {/* Total */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#071426]">
              Total
            </p>

            <p className="mt-1 text-[9px] text-[#071426]/40">
              Excluding delivery
            </p>
          </div>

          <p className="font-serif text-[29px] text-[#B88734]">
            AED{" "}
            {subtotal.toLocaleString(
              "en-AE"
            )}
          </p>
        </div>

        {/* Main CTA */}
        <Link
          href="/checkout"
          className="
            group mt-8 flex min-h-[58px] w-full
            items-center justify-center gap-3
            bg-[#C7A05A]
            px-6
            !text-[#071426]
            !no-underline
            text-[10px] font-bold uppercase
            tracking-[0.17em]
            transition-all duration-300
            hover:bg-[#D8B76E]
            sm:text-[11px]
          "
        >
          Proceed To Checkout

          <ArrowRight
            size={16}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        {/* Secure */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[9px] text-[#071426]/45">
          <ShieldCheck
            size={14}
            className="text-[#B88734]"
          />

          Secure checkout
        </div>
      </div>

      {/* Assistance */}
      <div className="border-t border-[#071426]/8 bg-[#071426] px-6 py-6 text-center sm:px-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C7A05A]">
          Need Assistance?
        </p>

        <p className="mx-auto mt-2 max-w-[270px] text-[10px] leading-5 text-white/60">
          Our boutique specialists can assist with your jewellery selection.
        </p>

        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 !text-[9px] font-semibold uppercase tracking-[0.14em] !text-white !no-underline transition-colors hover:!text-[#C7A05A]"
        >
          Contact Boutique

          <ChevronRight
            size={13}
          />
        </Link>
      </div>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <span className="text-[11px] text-[#071426]/55">
        {label}
      </span>

      <span
        className={`text-right text-[11px] ${
          muted
            ? "text-[#071426]/40"
            : "font-semibold text-[#071426]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
