"use client";

import { motion } from "framer-motion";

export default function BrandTicker() {
  return (
    <div className="flex justify-center items-center">
      <img 
        src="/banner-stripe.png" 
        alt="OM Indian Cars Strip" 
        className="h-20 md:h-24 w-auto object-contain max-w-full"
      />
    </div>
  );
}
