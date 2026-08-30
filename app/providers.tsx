"use client";

import StoreProvider from "@/components/providers/store-provider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}