"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "BMW", "Audi", "Mercedes", "Porsche", "Land Rover", "Jaguar", "Volvo", "Lexus", "Mini", "Jeep"
];

export default function BrandTicker() {
  return (
    <div className="w-full py-10 bg-white/5 border-y border-white/5 overflow-hidden relative">
      <motion.div 
        className="flex items-center gap-16 md:gap-32 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear"
        }}
      >
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <div key={i} className="flex items-center gap-4 text-white/20 hover:text-white/40 transition-colors cursor-default">
            <span className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter italic">
              {brand}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
