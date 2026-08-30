"use client";

import { useState, type ReactNode } from "react";

import { AdminHeader } from "@/components/admin/layout/admin-header";
import { AdminMobileNav } from "@/components/admin/layout/admin-mobile-nav";
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";

export function AdminDashboardShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-subtle">
      <AdminSidebar />
      <div className="min-h-screen lg:ml-[260px]">
        <div className="flex min-h-screen flex-col">
          <AdminHeader />
          <main className="flex-1 p-4 pb-24 sm:p-6 sm:pb-24 lg:p-8 lg:pb-8">
            {children}
          </main>
        </div>
      </div>
      <AdminMobileNav
        open={mobileMenuOpen}
        onOpen={() => setMobileMenuOpen(true)}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}
