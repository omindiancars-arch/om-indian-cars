"use client";

import { motion } from "framer-motion";

export default function BrandTicker() {
  return (
    <div className="flex justify-center items-center">
      <img 
        src="/brand-lettering.png" 
        alt="OM Indian Cars" 
        className="h-20 md:h-24 w-auto object-contain max-w-full mix-blend-multiply"
      />
    </div>
  );
}
