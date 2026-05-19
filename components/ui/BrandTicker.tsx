"use client";

import { motion } from "framer-motion";

export default function BrandTicker() {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <img 
        src="/banner-stripe.png" 
        alt="OM Indian Cars Strip" 
        className="h-20 md:h-24 w-auto object-contain max-w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect'
        }}
      />
    </div>
  );
}
