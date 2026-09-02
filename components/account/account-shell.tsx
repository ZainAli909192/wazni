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

async function handleLogout() {
  await logout();
  router.push(
    "/account/login"
  );
}
  if (!ready || !isAuthenticated) {
    return <main className="min-h-[60vh] bg-[#FCFAF6]" aria-busy="true" />;
  }

  return (
    <main className="min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-[#FCFAF6] text-[#071426]">
      {/* HERO */}

      

      {/* MAIN */}

      <section className="mx-auto w-full min-w-0 max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid min-w-0 gap-7 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
          {/* SIDEBAR */}

          <aside className="min-w-0 max-w-full self-start lg:sticky lg:top-8">
            <div className="max-w-full overflow-hidden border border-[#C7A05A]/20 bg-white">
              {/* MOBILE */}

              <div className="grid w-full min-w-0 grid-cols-4 overflow-hidden border-b border-[#071426]/10 lg:hidden">
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
                        aria-current={active ? "page" : undefined}
                        className={`flex min-w-0 flex-col items-center justify-center gap-1.5 border-r border-[#071426]/8 px-1 py-3.5 !text-[8px] font-semibold uppercase tracking-[0.02em] !no-underline last:border-r-0 sm:flex-row sm:gap-2 sm:px-2 sm:text-[9px] sm:tracking-[0.06em] ${
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

          <div className="min-w-0 max-w-full overflow-x-clip">{children}</div>
        </div>
      </section>
    </main>
  );
}
