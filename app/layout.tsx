import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
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
        <div className="min-h-screen">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}