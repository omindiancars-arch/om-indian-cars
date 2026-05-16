"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileCheck, PhoneCall } from "lucide-react";

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-[#A10B1C] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
          >
            Elite <span className="text-[#FFD700]">Insurance</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-medium text-white/80 max-w-2xl mx-auto uppercase tracking-widest"
          >
            Comprehensive protection for your luxury assets with industry-leading coverage.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-neutral-900 mb-6">Tailored Insurance Solutions</h2>
              
              <div className="bg-[#A10B1C]/5 p-8 rounded-3xl border border-[#A10B1C]/10 mb-10">
                <p className="text-xl md:text-2xl font-black text-[#A10B1C] uppercase leading-tight tracking-tight">
                  We provide all kind of insurances based in your requirement.
                </p>
              </div>

              <p className="text-neutral-600 mb-10 leading-relaxed uppercase text-[10px] tracking-widest font-bold">
                We partner with top-tier insurance providers to ensure your vehicle is protected against all unforeseen events. From zero-depreciation covers to return-to-invoice benefits, we handle the complexity for you.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Instant Policy Issuance", icon: <FileCheck className="text-[#A10B1C]" /> },
                  { title: "Cashless Claims Settlement", icon: <Lock className="text-[#A10B1C]" /> },
                  { title: "24/7 Claim Support", icon: <PhoneCall className="text-[#A10B1C]" /> },
                  { title: "Zero Depreciation Covers", icon: <ShieldCheck className="text-[#A10B1C]" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                    {item.icon}
                    <span className="font-black uppercase tracking-widest text-[10px]">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-neutral-50">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Insurance Support"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#FFD700] p-10 rounded-[3rem] shadow-xl hidden md:block">
                <p className="text-black font-black text-2xl uppercase leading-none">Safe &<br/>Secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
