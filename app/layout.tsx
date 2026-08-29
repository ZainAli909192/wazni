import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/components/shop/cart-provider";
import "./globals.css";
import Header from "@/components/layout/header";

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
        
        <CartProvider>
        <Header />
          <div className="min-h-screen">
            {children}
          </div>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
