"use client";

import { motion } from "framer-motion";

export default function BrandTicker() {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <img 
        src="/banner-stripe.png" 
        alt="OM Indian Cars Strip" 
        className="h-20 md:h-24 w-auto object-contain max-w-full brightness-[0.82] contrast-[1.2] saturate-[1.2]"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      />
    </div>
  );
}
