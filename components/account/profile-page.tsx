"use client";

import {
  Save,
} from "lucide-react";

import AccountShell from "./account-shell";

import {
  mockCustomer,
} from "@/lib/account-data";

export default function ProfilePage() {
  return (
    <AccountShell title="Profile">
      <section className="border border-[#C7A05A]/20 bg-white">
        <div className="border-b border-[#071426]/8 px-6 py-6 sm:px-8">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
            Personal Details
          </p>

          <h2 className="mt-2 font-serif text-[27px]">
            Profile Information
          </h2>
        </div>

        <form className="p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <ProfileField
              label="First Name"
              defaultValue={
                mockCustomer.firstName
              }
            />

            <ProfileField
              label="Last Name"
              defaultValue={
                mockCustomer.lastName
              }
            />

            <ProfileField
              label="Email Address"
              type="email"
              defaultValue={
                mockCustomer.email
              }
            />

            <ProfileField
              label="Mobile Number"
              type="tel"
              defaultValue={
                mockCustomer.phone
              }
            />
          </div>

          <button
            type="submit"
            className="mt-7 flex min-h-[54px] items-center justify-center gap-3 bg-[#C7A05A] px-8 text-[9px] font-bold uppercase tracking-[0.16em] text-[#071426] transition-colors hover:bg-[#D7B772]"
          >
            <Save size={15} />

            Save Changes
          </button>
        </form>
      </section>
    </AccountShell>
  );
}

function ProfileField({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/50">
        {label}
      </span>

      <input
        type={type}
        defaultValue={defaultValue}
        className="h-[54px] w-full border border-[#071426]/15 px-4 text-[13px] outline-none transition-colors focus:border-[#C7A05A]"
      />
    </label>
  );
}