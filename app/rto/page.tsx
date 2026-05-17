"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, FileCheck, CheckCircle } from "lucide-react";

export default function RTOPage() {
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
            RTO <span className="text-[#FFD700]">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-medium text-white/80 max-w-2xl mx-auto uppercase tracking-widest"
          >
            Hassle-free vehicle registration and RTO assistance.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-neutral-900 mb-6">About RTO Details</h2>
              
              <div className="bg-[#CE1126]/5 p-8 rounded-3xl border border-[#CE1126]/10 mb-10">
                <p className="text-xl md:text-2xl font-black text-[#CE1126] uppercase leading-tight tracking-tight">
                  About RTO details: We handle all your documentation, transfer of ownership, and RTO compliances.
                </p>
              </div>

              <p className="text-neutral-600 mb-10 leading-relaxed uppercase text-[10px] tracking-widest font-bold">
                Navigating through Regional Transport Office (RTO) procedures can be time-consuming. Let our experts manage your paperwork efficiently, ensuring total compliance and peace of mind.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "RC Transfer", icon: <FileText className="text-[#CE1126]" /> },
                  { title: "NOC Issuance", icon: <CheckCircle className="text-[#CE1126]" /> },
                  { title: "Registration Renewal", icon: <FileCheck className="text-[#CE1126]" /> },
                  { title: "HPA/HPT Deletion", icon: <ShieldCheck className="text-[#CE1126]" /> },
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
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover" 
                  alt="RTO Services"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#FFD700] p-10 rounded-[3rem] shadow-xl hidden md:block">
                <p className="text-black font-black text-2xl uppercase leading-none">Fast &<br/>Easy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
