"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingParticles from "@/components/3d/LoadingParticles";

export default function GlobalPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We wait for the entire window to load (all assets, images, etc.)
    const handleLoad = () => {
      // Small delay for smooth transition and to show off the animation
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999]"
        >
          <LoadingParticles />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
