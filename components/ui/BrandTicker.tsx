"use client";

import { motion } from "framer-motion";

export default function BrandTicker() {
  return (
    <div className="w-full bg-[#CE1126] overflow-hidden relative border-b border-white/10 flex justify-center items-center">
      <img 
        src="/banner-stripe.png" 
        alt="OM Indian Cars Strip" 
        className="h-20 md:h-28 w-full object-cover md:object-contain"
      />
    </div>
  );
}
