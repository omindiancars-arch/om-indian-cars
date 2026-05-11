"use client";

import { motion } from "framer-motion";

export default function LoadingParticles() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#B31B1B] backdrop-blur-md">
      <div className="relative w-64 h-32 flex items-center justify-center">
        {/* Car Silhouette SVG */}
        <motion.svg
          viewBox="0 0 400 150"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(255,153,51,0.8)]"
          initial="hidden"
          animate="visible"
        >
          {/* A simple luxury car outline path */}
          <motion.path
            d="M 50 100 L 50 80 Q 50 60 70 50 L 150 40 Q 200 30 250 40 L 330 50 Q 350 60 350 80 L 350 100"
            fill="transparent"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
              opacity: { duration: 0.5 }
            }}
          />
          {/* Wheels */}
          <motion.circle
            cx="100" cy="100" r="20"
            fill="transparent" stroke="url(#gradient)" strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
          />
          <motion.circle
            cx="300" cy="100" r="20"
            fill="transparent" stroke="url(#gradient)" strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.4 }}
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9933" /> {/* Saffron */}
              <stop offset="50%" stopColor="#000000" /> {/* Black */}
              <stop offset="100%" stopColor="#138808" /> {/* Green */}
            </linearGradient>
          </defs>
        </motion.svg>
        
        {/* Glow behind */}
        <motion.div
          className="absolute inset-0 bg-primary-saffron/10 blur-3xl rounded-full"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <motion.p
        className="absolute bottom-1/4 text-primary-saffron tracking-widest font-heading uppercase text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Initializing Showroom...
      </motion.p>
    </div>
  );
}
