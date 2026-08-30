"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
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

export default function LoginForm() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const { login } = useStore();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

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
    setLoading(true);

    try {
      await login(
        email,
        password
      );

      const redirect =
        searchParams.get(
          "redirect"
        );

      router.push(
        redirect || "/account"
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPage
      eyebrow="Welcome Back"
      title="Sign In"
      description="Access your account, orders and saved delivery addresses."
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
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#C7A05A]"
            />

            <span className="text-[9px] text-[#071426]/55">
              Remember me
            </span>
          </label>

          <Link
            href="/account/forgot-password"
            className="!text-[9px] font-semibold !text-[#B88734] !no-underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-[56px] w-full items-center justify-center gap-2 bg-[#C7A05A] px-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#071426] transition-colors hover:bg-[#D7B772] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}

          {!loading && (
            <ArrowRight
              size={14}
            />
          )}
        </button>

        <div className="border-t border-[#071426]/10 pt-5 text-center">
          <p className="text-[10px] text-[#071426]/50">
            Don&apos;t have an
            account?
          </p>

          <Link
            href={`/account/register${
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
            className="mt-3 inline-flex h-[50px] w-full items-center justify-center border border-[#071426]/15 bg-white !text-[9px] font-semibold uppercase tracking-[0.13em] !text-[#071426] !no-underline transition-colors hover:border-[#C7A05A]"
          >
            Create Account
          </Link>
        </div>
      </form>
    </AuthPage>
  );
}

export function AuthPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F8F5EF] px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-[520px]">
        <div className="bg-white p-6 shadow-[0_20px_60px_rgba(7,20,38,.06)] sm:p-10">
          <div className="mb-8 text-center">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#B88734]">
              {eyebrow}
            </p>

            <h1 className="mt-3 font-serif text-[34px] text-[#071426] sm:text-[42px]">
              {title}
            </h1>

            <p className="mx-auto mt-3 max-w-[360px] text-[10px] leading-5 text-[#071426]/50">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}

export function AuthField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.11em] text-[#071426]/55">
        {label}

        {required && (
          <span className="ml-1 text-[#B88734]">
            *
          </span>
        )}
      </span>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B88734]">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          required={required}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={placeholder}
          autoComplete={
            autoComplete
          }
          className={`h-[54px] w-full border border-[#071426]/15 bg-white pr-4 text-[12px] text-[#071426] outline-none placeholder:text-[#071426]/25 focus:border-[#C7A05A] ${
            icon
              ? "pl-11"
              : "pl-4"
          }`}
        />
      </div>
    </label>
  );
}

export function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  show: boolean;
  onToggle: () => void;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.11em] text-[#071426]/55">
        {label}
        <span className="ml-1 text-[#B88734]">
          *
        </span>
      </span>

      <div className="relative">
        <LockKeyhole
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B88734]"
        />

        <input
          type={
            show
              ? "text"
              : "password"
          }
          value={value}
          required
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          autoComplete={
            autoComplete
          }
          className="h-[54px] w-full border border-[#071426]/15 bg-white px-11 text-[12px] text-[#071426] outline-none focus:border-[#C7A05A]"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            show
              ? "Hide password"
              : "Show password"
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#071426]/45 hover:text-[#071426]"
        >
          {show ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
    </label>
  );
}
