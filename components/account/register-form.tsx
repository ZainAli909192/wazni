"use client";

import {
  ArrowRight,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import Link from "next/link";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  useStore,
} from "@/components/providers/store-provider";

import {
  AuthField,
  AuthPage,
  PasswordField,
} from "./login-form";

export default function RegisterForm() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const { register } =
    useStore();

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [accepted, setAccepted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (!accepted) {
      setError(
        "Please accept the terms and conditions."
      );
      return;
    }

    setLoading(true);

    try {
      await register({
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      const redirect =
        searchParams.get(
          "redirect"
        );

      router.push(
        redirect || "/account"
      );
    } catch {
      setError(
        "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPage
      eyebrow="Join Wazni"
      title="Create Account"
      description="Create your account to manage orders, addresses and checkout faster."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && (
          <div className="border border-red-200 bg-red-50 px-4 py-3 text-[10px] text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            label="First Name"
            value={firstName}
            onChange={
              setFirstName
            }
            placeholder="First name"
            icon={
              <UserRound
                size={15}
              />
            }
            autoComplete="given-name"
            required
          />

          <AuthField
            label="Last Name"
            value={lastName}
            onChange={
              setLastName
            }
            placeholder="Last name"
            icon={
              <UserRound
                size={15}
              />
            }
            autoComplete="family-name"
            required
          />
        </div>

        <AuthField
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          icon={
            <Mail size={15} />
          }
          autoComplete="email"
          required
        />

        <AuthField
          label="Mobile Number"
          type="tel"
          value={phone}
          onChange={setPhone}
          placeholder="+971 50 123 4567"
          icon={
            <Phone size={15} />
          }
          autoComplete="tel"
          required
        />

        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          show={showPassword}
          onToggle={() =>
            setShowPassword(
              (current) =>
                !current
            )
          }
          autoComplete="new-password"
        />

        <PasswordField
          label="Confirm Password"
          value={
            confirmPassword
          }
          onChange={
            setConfirmPassword
          }
          show={
            showConfirmPassword
          }
          onToggle={() =>
            setShowConfirmPassword(
              (current) =>
                !current
            )
          }
          autoComplete="new-password"
        />

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) =>
              setAccepted(
                event.target
                  .checked
              )
            }
            className="mt-[2px] h-4 w-4 accent-[#C7A05A]"
          />

          <span className="text-[9px] leading-5 text-[#071426]/55">
            I agree to the Terms
            & Conditions and
            Privacy Policy.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex h-[56px] w-full items-center justify-center gap-2 bg-[#C7A05A] px-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#071426] transition-colors hover:bg-[#D7B772] disabled:opacity-60"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}

          {!loading && (
            <ArrowRight
              size={14}
            />
          )}
        </button>

        <div className="border-t border-[#071426]/10 pt-5 text-center">
          <p className="text-[10px] text-[#071426]/50">
            Already have an
            account?
          </p>

          <Link
            href={`/account/login${
              searchParams.get(
                "redirect"
              )
                ? `?redirect=${encodeURIComponent(
                    searchParams.get(
                      "redirect"
                    )!
                  )}`
                : ""
            }`}
            className="mt-3 inline-flex h-[50px] w-full items-center justify-center border border-[#071426]/15 !text-[9px] font-semibold uppercase tracking-[0.13em] !text-[#071426] !no-underline hover:border-[#C7A05A]"
          >
            Sign In
          </Link>
        </div>
      </form>
    </AuthPage>
  );
}