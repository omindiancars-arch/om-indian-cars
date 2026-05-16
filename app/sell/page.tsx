"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Search, ChevronRight, HandCoins, Zap } from "lucide-react";
import { useState } from "react";
import { useCars } from "@/context/CarContext";

export default function SellPage() {
  const { addInquiry } = useCars();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carModel: "",
    year: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry(
      "SELL_REQUEST", 
      `SELL: ${formData.carModel} (${formData.year})`, 
      formData.name, 
      formData.phone
    );
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-[24rem] md:pt-[20rem] pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Link 
          href="/"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-[#A10B1C] transition-all mb-12 group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Home
        </Link>
        <header className="mb-24 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#A10B1C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40">Evaluation Terminal</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-black leading-none mb-8">
            Sell Your <span className="text-black/10">Legacy.</span>
          </h1>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black/30 max-w-xl mx-auto md:mx-0">
            Experience absolute technical clarity and professional efficiency. Transition your premium automotive asset with the market leaders.
          </p>
        </header>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-50 rounded-[4rem] p-16 md:p-32 flex flex-col items-center justify-center text-center border border-black/5 shadow-2xl"
          >
            <div className="w-24 h-24 bg-[#A10B1C] rounded-full flex items-center justify-center text-white mb-8 shadow-2xl">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-4">Request Logged</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-12 max-w-sm">Our evaluation team will contact you within 24 hours to schedule a showroom inspection.</p>
            <button onClick={() => setSubmitted(false)} className="px-12 py-6 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
              Initiate New Valuation
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Form Area */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-gray-50 border border-black/5 p-12 md:p-20 rounded-[4rem] space-y-16 shadow-xl">
                <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">01</span>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-black">Collector Identification</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-black/30 ml-4">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="ENTER NAME"
                        className="w-full bg-white border border-black/5 p-6 rounded-2xl text-black text-xs font-black uppercase outline-none focus:border-[#A10B1C] transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-black/30 ml-4">Contact Phone</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="ENTER NUMBER"
                        className="w-full bg-white border border-black/5 p-6 rounded-2xl text-black text-xs font-black uppercase outline-none focus:border-[#A10B1C] transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">02</span>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-black">Asset Specifications</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-black/30 ml-4">Make & Model</label>
                      <input 
                        required
                        type="text" 
                        placeholder="E.G. AUDI Q7"
                        className="w-full bg-white border border-black/5 p-6 rounded-2xl text-black text-xs font-black uppercase outline-none focus:border-[#A10B1C] transition-all"
                        value={formData.carModel}
                        onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-black/30 ml-4">Reg. Year</label>
                      <input 
                        required
                        type="number" 
                        placeholder="2024"
                        className="w-full bg-white border border-black/5 p-6 rounded-2xl text-black text-xs font-black uppercase outline-none focus:border-[#A10B1C] transition-all"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-8 bg-[#A10B1C] text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-black transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-4 group"
                >
                  Send Enquiry <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>

            {/* Elite Benefits */}
            <div className="lg:col-span-5 space-y-12">
              {[
                { icon: ShieldCheck, title: "Instant Evaluation", desc: "Get a professional market appraisal within minutes of showroom arrival." },
                { icon: HandCoins, title: "Immediate Liquidity", desc: "Absolute transparency and instant payment upon asset verification." },
                { icon: MapPin, title: "Our Showroom", desc: "49-58-1, Akkayyapalem Main Rd, beside Port Stadium, Northeast Layout, Visakhapatnam, AP 530013" }
              ].map((benefit, i) => (
                <div key={i} className="p-10 bg-white border border-black/5 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#A10B1C] mb-6 group-hover:bg-[#A10B1C] group-hover:text-white transition-all">
                    <benefit.icon size={28} />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-3">{benefit.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}

              <div className="pt-12 p-10 bg-black text-white rounded-[3rem] relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-xl font-heading font-black uppercase tracking-tighter mb-4">Elite Promise</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed mb-8">
                    49-58-1, Akkayyapalem Main Rd, beside Port Stadium,<br /> Northeast Layout, Visakhapatnam, AP 530013
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-relaxed mb-8">
                    "Every asset we acquire is treated with absolute professional dignity. At OM Indian Cars, we don't just buy cars; we transition legacies."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[#A10B1C]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#A10B1C]">Management Office</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A10B1C]/10 blur-[50px] -mr-16 -mt-16 group-hover:bg-[#A10B1C]/20 transition-all" />
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
