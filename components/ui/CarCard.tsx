"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Milestone, Heart, X, Calendar, ShieldCheck, ArrowRight, CheckCircle2, User, Fuel, Banknote } from "lucide-react";
import { useCars, Car } from "@/context/CarContext";
import { useState } from "react";
import { calculateEMI } from "@/lib/utils";

export default function CarCard({ car, variant = 'default' }: { car: Car, variant?: 'default' | 'inventory' }) {
  const { addInquiry } = useCars();
  const [isInterested, setIsInterested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerData, setCustomerData] = useState({ name: "", phone: "" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [car.image, ...(car.images || [])].filter(Boolean);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleInterestedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry(car.id, car.name, customerData.name, customerData.phone);
    setIsInterested(true);
    setShowModal(false);
    setCustomerData({ name: "", phone: "" });
    setTimeout(() => setIsInterested(false), 3000);
  };

  return (
    <>
      <Link href={`/car/${car.id}`} className="block h-full group relative">
        <motion.div 
          className="relative bg-white border border-black/5 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden transition-all duration-700 h-full flex flex-col shadow-2xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
          whileHover={{ y: -15 }}
        >
          {/* Elite Gallery Area */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image 
                  src={images[currentImageIndex]} 
                  alt={car.name}
                  fill
                  className="object-cover scale-[1.2] origin-top-left"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Gallery Navigation */}
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md shadow-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-[#B31B1B]">
                  <ArrowRight size={16} className="rotate-180" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md shadow-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-[#B31B1B]">
                  <ArrowRight size={16} />
                </button>
              </>
            )}



            <button 
              onClick={handleInterestedClick}
              className={`absolute top-3 md:top-6 right-3 md:right-6 w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all shadow-xl z-20 ${
                isInterested ? "bg-[#B31B1B] text-white border-[#B31B1B]" : "bg-black/50 backdrop-blur-md border-white/10 text-white/40 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5" fill={isInterested ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Elite Content Area */}
          <div className="p-4 md:p-10 lg:p-12 flex-1 flex flex-col bg-white text-black">
            {/* Elite Badges */}
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              <div className="bg-[#00FF00] text-black text-[7px] md:text-[9px] font-black uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-1.5 md:gap-2 shadow-sm border border-[#00FF00]/20">
                <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={4} /> Verified
              </div>
              {car.services?.finance && (
                <div className="bg-[#B31B1B] text-white text-[7px] md:text-[9px] font-black uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-1.5 md:gap-2 shadow-sm">
                  <Banknote className="w-3 h-3 md:w-3.5 md:h-3.5" /> Finance
                </div>
              )}
              {car.services?.exchange && (
                <div className="bg-black/5 text-black text-[7px] md:text-[9px] font-black uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-1.5 md:gap-2 shadow-sm border border-black/10">
                  <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" /> Exchange
                </div>
              )}
            </div>

            <div className="mb-4 md:mb-8">
              <h3 className="text-[12px] md:text-3xl font-heading font-black uppercase tracking-tighter text-black leading-tight group-hover:text-[#B31B1B] transition-colors duration-500">
                {car.specs.year} {car.name}
              </h3>
              <p className="text-[7px] md:text-[9px] text-black/30 font-black uppercase tracking-[0.4em] mt-1 md:mt-2">{car.specs.variant || "PREMIUM ASSET"}</p>
            </div>

            {/* Professional Specs Row */}
            <div className="flex items-center justify-between py-4 md:py-6 border-y border-black/5 mb-4 md:mb-8">
              {[
                { icon: Milestone, val: car.specs.kmsDriven?.split(' ')[0] || "0", unit: "KM" },
                { icon: Fuel, val: car.specs.fuel?.split(' ')[0] || "PET", unit: "FUEL" },
                { icon: Gauge, val: car.specs.transmission?.charAt(0) || "A", unit: "MODE" }
              ].map((spec, i) => (
                <div key={i} className="flex flex-col items-center">
                  <spec.icon className="w-3 h-3 md:w-4 md:h-4 text-[#B31B1B] mb-1 md:mb-2 opacity-60" />
                  <span className="text-[9px] md:text-xs font-black text-black tracking-tighter">{spec.val}</span>
                  <span className="text-[6px] md:text-[7px] text-black/30 font-black tracking-widest mt-0.5">{spec.unit}</span>
                </div>
              ))}
            </div>

            {/* Price & Action */}
            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="text-sm md:text-4xl font-sans font-bold text-[#B31B1B] tracking-tighter whitespace-nowrap flex items-center gap-2">
                  ₹ {car.price.replace(/[₹]/g, "").trim()}
                </p>
              </div>
              <div className="w-8 h-8 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center text-black/20 group-hover:bg-[#B31B1B] group-hover:text-white transition-all duration-500">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
              </div>
            </div>
          </div>

          {/* Success Overlay */}
          <AnimatePresence>
            {isInterested && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-[#B31B1B]/95 backdrop-blur-md flex flex-col items-center justify-center text-white p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <Heart size={40} fill="white" />
                </div>
                <h4 className="text-xl font-heading font-bold uppercase tracking-widest mb-2">Interest Noted</h4>
                <p className="text-xs text-white/60 uppercase tracking-widest leading-relaxed">Our concierge will contact you shortly</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 md:p-16 overflow-hidden shadow-2xl"
            >
              <div className="relative z-10 text-center">
                <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-4">Request Callback</h3>
                <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.2em] mb-12">Experience excellence with OM Indian Cars</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-left space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-black/40 ml-4">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter Name"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-black/5 p-5 rounded-2xl text-black text-xs font-bold uppercase outline-none focus:border-[#B31B1B] transition-all"
                    />
                  </div>
                  <div className="text-left space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-black/40 ml-4">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="Enter Phone"
                      value={customerData.phone}
                      onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                      className="w-full bg-gray-50 border border-black/5 p-5 rounded-2xl text-black text-xs font-bold uppercase outline-none focus:border-[#B31B1B] transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#B31B1B] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95"
                  >
                    Confirm Callback
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
