"use client";

import { motion } from "framer-motion";

export default function BrandTicker() {
  return (
    <div className="flex justify-center items-center">
      <img 
        src="/banner-stripe.png" 
        alt="OM Indian Cars Strip" 
        className="h-20 md:h-24 w-auto object-contain max-w-full brightness-[0.78] saturate-[1.2] contrast-[1.1]"
      />
    </div>
  );
}
