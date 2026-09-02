import type { Metadata } from "next";

import SiteChrome from "@/components/layout/site-chrome";
import SitePreloader from "@/components/layout/site-preloader";
import { CartProvider } from "@/components/shop/cart-provider";

import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wazni Jewellery",
  description: "Wazni Jewellery - Abu Dhabi, UAE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CartProvider>
            <SitePreloader />

            <SiteChrome>
              {children}
            </SiteChrome>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}