"use client";

import {
  ArrowRight,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  AuthPage,
  PasswordField,
} from "./login-form";

export default function ResetPasswordForm() {
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirm,
    setShowConfirm,
  ] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AuthPage
      eyebrow="Account Recovery"
      title="Create New Password"
      description="Choose a new secure password for your Wazni account."
    >
      <form className="space-y-5">
        <PasswordField
          label="New Password"
          value={password}
          onChange={setPassword}
          show={showPassword}
          onToggle={() =>
            setShowPassword(
              (current) => !current
            )
          }
        />

        <PasswordField
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          show={showConfirm}
          onToggle={() =>
            setShowConfirm(
              (current) => !current
            )
          }
        />

        <button
          type="submit"
          className="group flex min-h-[56px] w-full items-center justify-center gap-3 bg-[#C7A05A] text-[10px] font-bold uppercase tracking-[0.17em] text-[#071426] hover:bg-[#D7B772]"
        >
          Update Password

          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </form>
    </AuthPage>
  );
}
