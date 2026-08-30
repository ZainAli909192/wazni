"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowRight,
  ChevronLeft,
  Mail,
} from "lucide-react";

import {
  AuthField,
  AuthPage,
} from "./login-form";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  return (
    <AuthPage
      eyebrow="Account Recovery"
      title="Forgot Password"
      description="Enter your registered email address and we will send you password reset instructions."
    >
      <form className="space-y-5">
        <AuthField
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="name@example.com"
          icon={<Mail size={17} />}
        />

        <button
          type="submit"
          className="group flex min-h-[56px] w-full items-center justify-center gap-3 bg-[#C7A05A] text-[10px] font-bold uppercase tracking-[0.17em] text-[#071426] transition-colors hover:bg-[#D7B772]"
        >
          Send Reset Link

          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

        <Link
          href="/account/login"
          className="flex min-h-[52px] w-full items-center justify-center gap-2 border border-[#071426]/15 !text-[9px] font-semibold uppercase tracking-[0.14em] !text-[#071426] !no-underline hover:border-[#C7A05A] hover:!text-[#B88734]"
        >
          <ChevronLeft size={14} />

          Back To Sign In
        </Link>
      </form>
    </AuthPage>
  );
}
