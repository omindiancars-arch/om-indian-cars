"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function LoadingParticles() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to play sound on mount
    const playSound = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.4;
          await audioRef.current.play();
        } catch (err) {
          console.log("Autoplay blocked, waiting for interaction", err);
        }
      }
    };

    playSound();
    
    // Also try to play on any user interaction if blocked
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener('click', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#C4141A]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      
      {/* Sound Element */}
      <audio 
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/1539/1539-preview.mp3"
        preload="auto"
      />

      <div className="relative w-full max-w-[500px] flex flex-col items-center justify-center">
        {/* Animated Glow */}
        <motion.div
          className="absolute w-[180%] h-[180%] bg-[#C4141A]/15 blur-[80px] md:blur-[120px] rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Brand Logo */}
        <motion.div 
          className="w-full relative z-10 px-8 md:px-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/OMINDCARS_LOGO_TRANSPARENT.png"
            alt="OM Indian Cars"
            className="w-full max-w-[300px] h-auto object-contain drop-shadow-[0_0_30px_rgba(206,17,38,0.5)]"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <div className="mt-8 md:mt-12 flex flex-col items-center gap-6">
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#C4141A] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
          
          <div className="flex flex-col items-center gap-2">
            <motion.p
              className="text-white font-black uppercase tracking-[0.6em] text-[10px] md:text-xs text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              LOADING...
            </motion.p>
            <motion.div 
              className="h-[1px] w-12 bg-[#C4141A]/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Text in background - Hidden on very small screens for better alignment */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 overflow-hidden pointer-events-none hidden sm:block">
        <h2 className="text-[12vw] md:text-[15vw] font-black text-white/[0.03] leading-none uppercase -mb-2 md:-mb-4 select-none">
          PREOWNED CARS
        </h2>
      </div>
    </div>
  );
}
