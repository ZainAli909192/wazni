"use client";

import Link from "next/link";

import {
  House,
  LogOut,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";
import {
  useStore,
} from "@/components/providers/store-provider";

import {
  useRouter,
} from "next/navigation";
import { useEffect } from "react";

import { usePathname } from "next/navigation";

type Props = {
  title: string;

  eyebrow?: string;

  children: React.ReactNode;
};

const navigation = [
  {
    label: "Overview",

    href: "/account",

    icon: House,
  },

  {
    label: "Profile",

    href: "/account/profile",

    icon: UserRound,
  },

  {
    label: "Orders",

    href: "/account/orders",

    icon: Package,
  },

  {
    label: "Addresses",

    href: "/account/addresses",

    icon: MapPin,
  },
];

export default function AccountShell({
  title,
  eyebrow = "My Account",
  children,
}: Props) {
  const pathname = usePathname();
const router = useRouter();

const { logout, ready, isAuthenticated } =
  useStore();

useEffect(() => {
  if (ready && !isAuthenticated) {
    router.replace(`/account/login?redirect=${encodeURIComponent(pathname)}`);
  }
}, [isAuthenticated, pathname, ready, router]);

function handleLogout() {
  logout();

  router.push(
    "/account/login"
  );
}
  if (!ready || !isAuthenticated) {
    return <main className="min-h-[60vh] bg-[#FCFAF6]" aria-busy="true" />;
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] text-[#071426]">
      {/* HERO */}

      <section className="bg-[#071426]">
        <div className="mx-auto max-w-[1500px] px-5 py-11 text-center sm:px-6 lg:px-10 lg:py-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C7A05A]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#C7A05A]">
              {eyebrow}
            </p>

            <span className="h-px w-8 bg-[#C7A05A]" />
          </div>

          <h1 className="mt-4 font-serif text-[38px] text-white sm:text-[46px] lg:text-[52px]">
            {title}
          </h1>
        </div>
      </section>

      {/* MAIN */}

      <section className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid gap-7 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
          {/* SIDEBAR */}

          <aside className="self-start lg:sticky lg:top-8">
            <div className="overflow-hidden border border-[#C7A05A]/20 bg-white">
              {/* MOBILE */}

              <div className="flex overflow-x-auto border-b border-[#071426]/10 lg:hidden">
                {navigation.map(
                  ({
                    label,
                    href,
                    icon: Icon,
                  }) => {
                    const active =
                      pathname === href;

                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`flex min-w-[110px] flex-1 items-center justify-center gap-2 border-r border-[#071426]/8 px-4 py-4 !text-[9px] font-semibold uppercase tracking-[0.08em] !no-underline last:border-r-0 ${
                          active
                            ? "!text-[#B88734]"
                            : "!text-[#071426]/55"
                        }`}
                      >
                        <Icon
                          size={14}
                          strokeWidth={1.6}
                        />

                        {label}
                      </Link>
                    );
                  }
                )}
              </div>

              {/* DESKTOP */}

              <div className="hidden lg:block">
                <div className="border-b border-[#071426]/8 bg-[#F7F2E9] px-6 py-6">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
                    Customer Account
                  </p>

                  <h2 className="mt-2 font-serif text-[24px] text-[#071426]">
                    My Wazni
                  </h2>
                </div>

                <nav className="p-3">
                  {navigation.map(
                    ({
                      label,
                      href,
                      icon: Icon,
                    }) => {
                      const active =
                        pathname === href;

                      return (
                        <Link
                          key={href}
                          href={href}
                          className={`flex min-h-[52px] items-center gap-3 px-4 !text-[11px] font-medium !no-underline transition-all ${
                            active
                              ? "bg-[#071426] !text-[#C7A05A]"
                              : "!text-[#071426]/65 hover:bg-[#F8F3E9] hover:!text-[#B88734]"
                          }`}
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.5}
                          />

                          {label}
                        </Link>
                      );
                    }
                  )}

                <button
  type="button"
  onClick={handleLogout}
  className="flex w-full items-center gap-3 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/55 transition-colors hover:bg-[#FAF7F1] hover:text-[#B88734]"
>
  <LogOut size={15} />

  Logout
</button>
                </nav>
              </div>
            </div>
          </aside>

          <div>{children}</div>
        </div>
      </section>
    </main>
  );
}
