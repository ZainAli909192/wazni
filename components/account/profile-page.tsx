"use client";

import {
  Save,
} from "lucide-react";
import { useState } from "react";

import AccountShell from "./account-shell";

import { useStore } from "@/components/providers/store-provider";

export default function ProfilePage() {
  const { user, saveProfile } = useStore();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    const data = new FormData(event.currentTarget);
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveProfile({
        firstName: String(data.get("firstName") ?? ""),
        lastName: String(data.get("lastName") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
      });
      setMessage("Profile updated successfully.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  }

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

        <form className="p-6 sm:p-8" onSubmit={handleSubmit}>
          {message && <p className="mb-5 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[10px] text-emerald-700">{message}</p>}
          {error && <p className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-[10px] text-red-700">{error}</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            <ProfileField
              label="First Name"
              name="firstName"
              defaultValue={
                user?.firstName ?? ""
              }
            />

            <ProfileField
              label="Last Name"
              name="lastName"
              defaultValue={
                user?.lastName ?? ""
              }
            />

            <ProfileField
              label="Email Address"
              name="email"
              type="email"
              defaultValue={
                user?.email ?? ""
              }
            />

            <ProfileField
              label="Mobile Number"
              name="phone"
              type="tel"
              defaultValue={
                user?.phone ?? ""
              }
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-7 flex min-h-[54px] items-center justify-center gap-3 bg-[#C7A05A] px-8 text-[9px] font-bold uppercase tracking-[0.16em] text-[#071426] transition-colors hover:bg-[#D7B772]"
          >
            <Save size={15} />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>
    </AccountShell>
  );
}

function ProfileField({
  label,
  name,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
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
        name={name}
        defaultValue={defaultValue}
        required
        className="h-[54px] w-full border border-[#071426]/15 px-4 text-[13px] outline-none transition-colors focus:border-[#C7A05A]"
      />
    </label>
  );
}
