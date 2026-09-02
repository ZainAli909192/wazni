"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SitePreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#071426]/35 backdrop-blur-md" />

      <div className="relative z-10 flex items-center justify-center rounded-lg border border-[#C7A05A]/20 bg-[#FCFAF6] p-4 shadow-lg sm:p-6 lg:p-8">
        <Image
          src="/logo_gif.gif"
          alt="Wazni Jewellery"
          width={420}
          height={240}
          priority
          unoptimized
          className="h-auto w-[260px] object-contain sm:w-[320px] lg:w-[420px]"
        />
      </div>
    </div>
  );
}