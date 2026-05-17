"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileCheck, PhoneCall, RefreshCcw } from "lucide-react";

export default function ExchangePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-60 md:pt-64 pb-24 bg-[#CE1126] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
          >
            Car <span className="text-[#FFD700]">Exchange</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-medium text-white/80 max-w-2xl mx-auto uppercase tracking-widest"
          >
            Upgrade your ride seamlessly with our premium car exchange program.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-neutral-900 mb-6">Seamless Trade-In</h2>
              
              <div className="bg-[#CE1126]/5 p-8 rounded-3xl border border-[#CE1126]/10 mb-10">
                <p className="text-xl md:text-2xl font-black text-[#CE1126] uppercase leading-tight tracking-tight">
                  We approve cars exchange based on the condition of the car.
                </p>
              </div>

              <p className="text-neutral-600 mb-10 leading-relaxed uppercase text-[10px] tracking-widest font-bold">
                Get the best market value for your current vehicle when you exchange it for a newer model. Our transparent evaluation process ensures you receive a fair offer based on rigorous quality checks.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Transparent Evaluation", icon: <FileCheck className="text-[#CE1126]" /> },
                  { title: "Best Market Value", icon: <Lock className="text-[#CE1126]" /> },
                  { title: "Instant Exchange Offer", icon: <RefreshCcw className="text-[#CE1126]" /> },
                  { title: "Hassle-Free Process", icon: <ShieldCheck className="text-[#CE1126]" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                    {item.icon}
                    <span className="font-black uppercase tracking-widest text-[10px] text-neutral-900">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-neutral-50">
                <img 
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Car Exchange"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#FFD700] p-10 rounded-[3rem] shadow-xl hidden md:block">
                <p className="text-black font-black text-2xl uppercase leading-none">Best<br/>Value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
