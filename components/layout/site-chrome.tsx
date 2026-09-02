"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) return <>{children}</>;

  return (
    <>
      <Header />
      <div className="min-w-0 max-w-full overflow-x-clip pb-[calc(92px+env(safe-area-inset-bottom))] lg:pb-0">
        <div className="min-h-screen min-w-0 max-w-full">{children}</div>
        <Footer />
      </div>
    </>
  );
}
