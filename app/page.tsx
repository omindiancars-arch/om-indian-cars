"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Tags, Banknote, Truck, ArrowRight, Star, Heart, CheckCircle2, Search, ChevronDown, Car as CarIcon, Gauge, Milestone, Phone } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroScene from "@/components/3d/HeroScene";
import CarCard from "@/components/ui/CarCard";
import LoadingParticles from "@/components/3d/LoadingParticles";
import BrandTicker from "@/components/ui/BrandTicker";

import { useCars } from "@/context/CarContext";
import { useSite } from "@/context/SiteContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { cars } = useCars();

  const { siteContent, isLoaded } = useSite();

  useEffect(() => {
    // Failsafe: Force stop loading after 5 seconds
    const failsafe = setTimeout(() => {
      if (loading) setLoading(false);
    }, 5000);

    // Normal flow: Stop loading when data is ready
    if (isLoaded && loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
        clearTimeout(failsafe);
      };
    }
    
    return () => clearTimeout(failsafe);
  }, [isLoaded, loading]);

  // Use reliable fallbacks
  const heroImg = siteContent.heroImage || "/hero-bg.png";
  const heroVid = siteContent.heroVideo || "/VID_20260505_052351_976.mp4";

  return (
    <main className="relative flex-1 bg-[#B31B1B] overflow-hidden text-white">
      <AnimatePresence>
        {loading && <LoadingParticles key="loader" />}
      </AnimatePresence>

      <Navbar />

      {/* 1. ELITE HERO SECTION (SPLIT SCREEN) */}
      <section className="relative min-h-[85vh] flex flex-col md:flex-row overflow-hidden pt-[24rem] md:pt-[20rem] gap-10 bg-[#B31B1B] px-10">
        {/* Left Half: Photo */}
        <div className="relative md:flex-[0.6] min-h-[50vh] md:min-h-0 group overflow-hidden rounded-[3rem] bg-black/20">
          <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-all duration-700" />
          <img 
            src={heroImg} 
            alt="Elite Showroom" 
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
            onLoad={() => console.log("Hero Image Loaded")}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/hero-bg.png";
            }}
          />
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-12">
            {/* Title removed as requested */}
          </div>
        </div>

        {/* Right Half: Video */}
        <div className="relative md:flex-[0.4] min-h-[40vh] md:min-h-0 group overflow-hidden rounded-[3rem] bg-black/20">
          <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-all duration-700" />
          <video 
            key={heroVid}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
          >
            <source src={heroVid} type="video/mp4" />
          </video>
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
            >
              <p className="text-[10px] md:text-xs text-white/80 font-black uppercase tracking-[0.4em] max-w-sm leading-relaxed mb-8">
                {siteContent.heroDescription}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Browse Collection Button Overlay */}
        <div className="absolute bottom-12 left-0 w-full z-40 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link href="/cars" className="px-16 py-7 bg-white text-[#B31B1B] rounded-full font-heading font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-black hover:text-white transition-all hover:scale-105 active:scale-95 inline-block">
              Browse Cars
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. ELITE COLLECTION GRID */}
      <section className="py-32 bg-[#B31B1B] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-[#FFD700]" />
                <span className="text-[#FFD700] text-[10px] uppercase tracking-[0.5em] font-black">Curated for Excellence</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-white leading-[0.85] mb-8">
                Elite <br />
                <span className="text-white/10">Collection</span>
              </h2>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest max-w-sm">Every vehicle in our collection undergoes a rigorous 150-point technical audit for absolute peace of mind.</p>
            </div>
            <Link href="/cars" className="px-10 py-5 border-2 border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-[#B31B1B] transition-all flex items-center gap-4">
              Explore All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
            {cars.slice(0, 6).map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <CarCard car={car} variant="inventory" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BUYER/SELLER BANNERS */}
      <section className="py-24 bg-[#901515]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { 
              title: "Sell Your Car Instantly", 
              desc: "Get the best market value with immediate payment and hassle-free documentation.",
              img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
              btn: "Get a Valuation",
              href: "/sell",
              phone: "+91 92466 20555",
              color: "bg-white text-[#B31B1B]"
            },
            { 
              title: "Buy Your Dream Car", 
              desc: "Explore our elite collection of pre-owned luxury vehicles with guaranteed quality.",
              img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
              btn: "Browse Collection",
              href: "/cars",
              color: "bg-[#FFD700] text-black"
            }
          ].map((banner, i) => (
            <div key={i} className="group relative h-[450px] rounded-[4rem] overflow-hidden shadow-2xl border border-white/5">
              <img src={banner.img} className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt={banner.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#B31B1B] via-[#B31B1B]/40 to-transparent p-12 md:p-16 flex flex-col justify-end">
                <h3 className="text-4xl font-heading font-black text-white uppercase tracking-tighter mb-4">{banner.title}</h3>
                <p className="text-white/80 text-xs uppercase tracking-widest font-black mb-6 max-w-xs leading-relaxed">{banner.desc}</p>
                
                {banner.phone && (
                  <div className="flex items-center gap-4 text-white font-black tracking-widest text-lg mb-8 bg-white/10 w-fit px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10">
                    <Phone size={20} className="text-[#FFD700]" />
                    {banner.phone}
                  </div>
                )}

                <Link href={banner.href} className={`w-fit px-10 py-5 ${banner.color} rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all inline-block`}>
                  {banner.btn}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST & TESTIMONIALS */}
      <section className="py-32 bg-[#B31B1B]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-white mb-20 leading-none">
            Voices of <br />
            <span className="text-[#FFD700]">Excellence</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Rahul Sharma", text: "The most transparent dealership experience I've ever had in Vizag. Highly recommended.", car: "Audi A6" },
              { name: "Priya Reddy", text: "Their technical audit is no joke. I felt completely safe buying my first luxury SUV here.", car: "BMW X5" },
              { name: "Suresh Babu", text: "Fast financing and smooth delivery. They really handle everything for you.", car: "Range Rover Sport" }
            ].map((test, i) => (
              <div key={i} className="p-12 bg-white/5 border border-white/10 rounded-[3.5rem] text-left group hover:bg-white transition-all duration-500">
                <div className="flex gap-1 text-[#FFD700] mb-8 group-hover:text-[#B31B1B]">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xl font-medium italic text-white/60 group-hover:text-black transition-colors mb-10 leading-relaxed">"{test.text}"</p>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white group-hover:text-black transition-colors">{test.name}</h4>
                  <p className="text-[9px] text-[#FFD700] font-black uppercase tracking-widest mt-1 group-hover:text-[#B31B1B] transition-colors">Owner of {test.car}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
