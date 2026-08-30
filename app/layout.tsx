import type { Metadata } from "next";

import SiteChrome from "@/components/layout/site-chrome";
import { CartProvider } from "@/components/shop/cart-provider";

import Providers from "./providers";
import {ConnectMenu }from "@/components/layout/connect-menu"; 
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
          <ConnectMenu />
          <CartProvider>
            <SiteChrome>{children}</SiteChrome>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
