import Link from "next/link";

import {
  ArrowRight,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

import AccountShell from "./account-shell";

import {
  mockCustomer,
  mockOrders,
} from "@/lib/account-data";

export default function AccountDashboard() {
  return (
    <AccountShell
      title={`Welcome, ${mockCustomer.firstName}`}
    >
      <div className="space-y-5">
        {/* Welcome */}

        <div className="border border-[#C7A05A]/20 bg-white p-6 sm:p-8">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
            Account Overview
          </p>

          <h2 className="mt-2 font-serif text-[28px] text-[#071426]">
            Welcome Back
          </h2>

          <p className="mt-3 max-w-[620px] text-[11px] leading-6 text-[#071426]/50">
            Manage your profile, review your
            orders and update your delivery
            addresses from your Wazni account.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-4 sm:grid-cols-3">
          <DashboardCard
            icon={<Package size={22} />}
            title="Orders"
            value={`${mockOrders.length}`}
            link="/account/orders"
          />

          <DashboardCard
            icon={<MapPin size={22} />}
            title="Addresses"
            value="2"
            link="/account/addresses"
          />

          <DashboardCard
            icon={<UserRound size={22} />}
            title="Profile"
            value="View"
            link="/account/profile"
          />
        </div>

        {/* Latest order */}

        <div className="border border-[#C7A05A]/20 bg-white">
          <div className="flex items-center justify-between border-b border-[#071426]/8 px-6 py-5">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#B88734]">
                Recent Purchase
              </p>

              <h2 className="mt-1 font-serif text-[23px]">
                Latest Order
              </h2>
            </div>

            <Link
              href="/account/orders"
              className="!text-[9px] font-semibold uppercase tracking-[0.12em] !text-[#B88734] !no-underline"
            >
              View All
            </Link>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold">
                  {mockOrders[0].id}
                </p>

                <p className="mt-2 text-[10px] text-[#071426]/45">
                  {mockOrders[0].date}
                </p>
              </div>

              <div>
                <span className="inline-flex bg-[#F3E9D6] px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#B88734]">
                  {mockOrders[0].status}
                </span>
              </div>

              <p className="font-serif text-[21px] text-[#B88734]">
                AED{" "}
                {mockOrders[0].total.toLocaleString(
                  "en-AE"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AccountShell>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="group border border-[#C7A05A]/20 bg-white p-5 !text-[#071426] !no-underline transition-all hover:border-[#C7A05A]/60 hover:shadow-[0_15px_40px_rgba(7,20,38,.06)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E9D6] text-[#B88734]">
        {icon}
      </div>

      <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#071426]/45">
        {title}
      </p>

      <div className="mt-2 flex items-end justify-between">
        <p className="font-serif text-[27px]">
          {value}
        </p>

        <ArrowRight
          size={15}
          className="text-[#B88734] transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}