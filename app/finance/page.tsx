"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Banknote, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";

export default function FinancePage() {
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
            Hassle-Free <span className="text-[#FFD700]">Financing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-medium text-white/80 max-w-2xl mx-auto uppercase tracking-widest"
          >
            Drive home your dream car with our flexible and transparent financial solutions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-50 rounded-[3rem] p-12 md:p-20 shadow-xl border border-neutral-100">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-[#A10B1C] flex items-center justify-center text-white shadow-lg">
                <Banknote size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900">Finance Options</h2>
                <div className="h-1 w-12 bg-[#A10B1C] mt-2" />
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-white p-10 rounded-[2rem] border border-[#A10B1C]/10 shadow-sm">
                <p className="text-2xl md:text-4xl font-black text-[#A10B1C] leading-tight uppercase tracking-tight">
                  We provide 70 to 100 percent finance based on the cibil score.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Instant Approval", desc: "Get your loan processed within hours with minimal documentation.", icon: <CheckCircle2 className="text-[#A10B1C]" /> },
                  { title: "Flexible Tenure", desc: "Choose a repayment plan that fits your budget, up to 7 years.", icon: <TrendingUp className="text-[#A10B1C]" /> },
                  { title: "Low Interest Rates", desc: "Benefit from our tie-ups with leading banks for competitive rates.", icon: <Banknote className="text-[#A10B1C]" /> },
                  { title: "Complete Transparency", desc: "No hidden charges or processing fee surprises.", icon: <ShieldCheck className="text-[#A10B1C]" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white border border-neutral-100">
                    <div className="shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-black uppercase tracking-wider text-xs mb-2">{item.title}</h4>
                      <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
