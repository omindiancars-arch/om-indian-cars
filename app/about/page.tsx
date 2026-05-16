"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, Star, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-[24rem] md:pt-[22rem] pb-24 px-6 md:px-12 max-w-[1800px] mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[#CE1126]/5 -z-10 blur-[120px] rounded-full" />
        
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-[#CE1126]" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#CE1126]">Our Legacy</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter text-black leading-[0.85] mb-10">
              Cars with <br />
              <span className="text-[#CE1126]">Trust</span>
            </h1>
            <p className="text-lg text-black/60 max-w-xl leading-relaxed mb-12">
              At OM Indian Cars, we bring you certified pre-owned vehicles with unbeatable value, trusted service, and smooth documentation. Serving customers across Vizag with honesty and reliability.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="text-4xl font-heading font-black text-black mb-2">20+</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Years of Trust</p>
              </div>
              <div>
                <h3 className="text-4xl font-heading font-black text-black mb-2">5000+</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Happy Owners</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80" 
                alt="Honda City" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                <p className="text-white text-sm font-medium italic">"Quality is not an act, it is a habit."</p>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-[#CE1126] text-white p-10 rounded-[3rem] shadow-2xl hidden md:block">
              <Award size={40} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Vizag's Most Trusted <br /> Dealership</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-black mb-6">The OM Promise</h2>
            <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.4em]">Built on three pillars of integrity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "Absolute Transparency",
                desc: "No hidden histories. No tampered odometers. Every document and detail is verified and presented with total honesty."
              },
              {
                icon: Star,
                title: "150-Point Audit",
                desc: "Every vehicle undergoes a rigorous technical examination by our certified engineers before earning a place in our collection."
              },
              {
                icon: Users,
                title: "Customer First",
                desc: "Our relationship doesn't end with a sale. We provide comprehensive after-sales support and concierge services."
              }
            ].map((value, i) => (
              <div key={i} className="p-12 bg-white rounded-[3.5rem] shadow-xl hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#CE1126]/5 flex items-center justify-center text-[#CE1126] mb-8 group-hover:bg-[#CE1126] group-hover:text-white transition-all">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-heading font-black uppercase tracking-tight text-black mb-4">{value.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 order-2 md:order-1">
              <div className="space-y-12">
                {[
                  { step: "01", title: "Global Sourcing", desc: "We handpick only the finest pre-owned luxury vehicles with verifiable service records." },
                  { step: "02", title: "Rigorous Testing", desc: "Our 150-point technical audit covers everything from engine health to interior finesse." },
                  { step: "03", title: "Certification", desc: "Only vehicles that pass all tests receive the OM Certified seal of approval." },
                  { step: "04", title: "The Delivery", desc: "A cinematic handover experience as you drive away in your new pride and joy." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <span className="text-2xl font-heading font-black text-[#CE1126]/20">{item.step}</span>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-widest text-black mb-2">{item.title}</h4>
                      <p className="text-sm text-black/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 order-1 md:order-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-[2px] bg-[#CE1126]" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#CE1126]">How We Work</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter text-black leading-none mb-10">
                The Path to <br />
                <span className="text-black/10">Ownership</span>
              </h2>
              <p className="text-black/60 leading-relaxed mb-12">
                We've streamlined the luxury car buying process to be as smooth as the vehicles we sell. From the first test drive to the final documentation, we handle everything.
              </p>
              <button className="px-12 py-6 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#CE1126] transition-all flex items-center gap-4">
                Explore Collection <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#CE1126] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-8 relative z-10">Ready to find <br /> your next asset?</h2>
          <p className="text-white/60 text-sm uppercase tracking-[0.4em] font-black mb-12 relative z-10">Your dream car is waiting in our showroom</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
            <button className="px-12 py-6 bg-white text-[#CE1126] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all shadow-xl">
              View Inventory
            </button>
            <button className="px-12 py-6 bg-black/20 border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
              Contact Concierge
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
