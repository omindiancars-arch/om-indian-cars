"use client";

import { useParams, useRouter } from "next/navigation";
import { useCars } from "@/context/CarContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gauge, Milestone, Fuel, Calendar, ShieldCheck, Heart, X, CheckCircle2, MapPin, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import EMICalculator from "@/components/ui/EMICalculator";
import { calculateEMI } from "@/lib/utils";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { cars, addInquiry } = useCars();
  const [car, setCar] = useState<any>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [customerData, setCustomerData] = useState({ name: "", phone: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeMedia, setActiveMedia] = useState<any>(null);

  useEffect(() => {
    const foundCar = cars.find(c => c.id === params.id);
    if (foundCar) {
      setCar(foundCar);
      const media = [
        { type: 'image', url: foundCar.image },
        ...(foundCar.images || []).map((img: string) => ({ type: 'image', url: img })),
        ...(foundCar.videos || []).map((vid: string) => ({ type: 'video', url: vid }))
      ];
      setActiveMedia(media[0]);
    }
  }, [params.id, cars]);

  if (!car) return null;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry(car.id, car.name, customerData.name, customerData.phone);
    setIsSuccess(true);
    setShowInquiryModal(false);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const allMedia = [
    { type: 'image', url: car.image },
    ...(car.images || []).map((img: string) => ({ type: 'image', url: img })),
    ...(car.videos || []).map((vid: string) => ({ type: 'video', url: vid }))
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* 1. ELITE TOP BAR / BREADCRUMBS */}
      <div className="pt-64 md:pt-72 pb-12 px-6 max-w-7xl mx-auto w-full">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#B31B1B] hover:text-black transition-all mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Collection
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Home / Collection /</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#B31B1B]">{car.name}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-heading font-black uppercase tracking-tighter text-black leading-none mb-4">
              {car.specs.year} {car.name}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-black/40 uppercase tracking-widest text-[10px] font-black">
                <MapPin size={14} className="text-[#B31B1B]" /> {car.specs.location || "Visakhapatnam"}
              </div>
              <div className="flex items-center gap-2 text-[#00AA00] uppercase tracking-widest text-[10px] font-black">
                <CheckCircle2 size={14} /> Verified Listing
              </div>
            </div>
          </div>
          <div className="flex flex-col md:items-end">
            <p className="text-4xl md:text-6xl font-sans font-bold text-[#B31B1B] tracking-tighter mb-2 whitespace-nowrap flex items-center gap-4">
              ₹ {car.price.replace(/[₹]/g, "").trim()}
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Car Price</p>
          </div>
        </div>

        {/* 2. ELITE GALLERY SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-gray-50 border border-black/5 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMedia.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  {activeMedia.type === 'video' ? (
                    <video src={activeMedia.url} controls className="w-full h-full object-contain bg-black" />
                  ) : (
                    <img src={activeMedia.url} alt={car.name} className="w-full h-full object-cover scale-[1.2] origin-top-left" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-5 md:grid-cols-6 gap-4">
              {allMedia.map((media, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMedia(media)}
                  className={`aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden border-2 transition-all ${activeMedia.url === media.url ? 'border-[#B31B1B]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={media.url} className="w-full h-full object-cover scale-[1.2] origin-top-left" />
                </button>
              ))}
            </div>
          </div>

          {/* 3. QUICK ACTIONS SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 bg-gray-50 border border-black/5 rounded-[3.5rem] shadow-xl">
              <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-black mb-8">Elite Inquiry</h3>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center py-4 border-b border-black/5">
                  <span className="text-[10px] uppercase tracking-widest text-black/40 font-black">Transmission</span>
                  <span className="text-[11px] uppercase tracking-widest font-black text-black">{car.specs.transmission}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-black/5">
                  <span className="text-[10px] uppercase tracking-widest text-black/40 font-black">Kilometers</span>
                  <span className="text-[11px] uppercase tracking-widest font-black text-black">{car.specs.kmsDriven}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-black/5">
                  <span className="text-[10px] uppercase tracking-widest text-black/40 font-black">Fuel Type</span>
                  <span className="text-[11px] uppercase tracking-widest font-black text-black">{car.specs.fuel}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowInquiryModal(true)}
                className="w-full py-6 bg-[#B31B1B] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95"
              >
                Inquire for Best Price
              </button>
              <div className="mt-6 flex items-center justify-center gap-8">
                <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-[#B31B1B]">
                  <Heart size={14} /> Add to Fav
                </button>
                <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-[#B31B1B]">
                  <Share2 size={14} /> Share Asset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. KEY HIGHLIGHTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-32">
          {[
            { icon: Calendar, label: "Reg. Year", val: car.specs.year },
            { icon: Milestone, label: "KM Driven", val: car.specs.kmsDriven?.split(' ')[0] },
            { icon: Fuel, label: "Fuel Type", val: car.specs.fuel },
            { icon: Gauge, label: "Trans.", val: car.specs.transmission },
            { icon: ShieldCheck, label: "Owner", val: car.specs.owner },
            { icon: MapPin, label: "RTO", val: car.specs.registrationPlace || "AP31" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-8 bg-gray-50 border border-black/5 rounded-[2.5rem] group hover:bg-[#B31B1B] transition-all duration-500">
              <item.icon size={20} className="text-[#B31B1B] mb-4 group-hover:text-white transition-colors" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/30 group-hover:text-white/60 mb-1">{item.label}</span>
              <span className="text-[11px] font-black uppercase tracking-widest text-black group-hover:text-white">{item.val}</span>
            </div>
          ))}
        </div>

        {/* 5. ELITE SPECIFICATION SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 mb-32">
          <div className="lg:col-span-1 space-y-16">
            <div>
              <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-10">Technical Audit</h3>
              <div className="space-y-6">
                {[
                  { label: "Make", val: car.specs.make },
                  { label: "Model", val: car.specs.model },
                  { label: "Variant", val: car.specs.variant },
                  { label: "Color", val: car.specs.color || car.specs.exteriorColor },
                  { label: "Engine", val: car.specs.engineCapacity },
                  { label: "Fuel", val: car.specs.fuel }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-4 border-b border-black/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40">{spec.label}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-black">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-10">Ownership Audit</h3>
              <div className="space-y-6">
                {[
                  { label: "Owner", val: car.specs.owner },
                  { label: "Insurance", val: car.specs.insuranceType },
                  { label: "RTO Location", val: car.specs.registrationPlace },
                  { label: "Plate No.", val: car.specs.numberPlate }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-4 border-b border-black/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40">{spec.label}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-black">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {car.features && Object.values(car.features).some(v => v === true) && (
              <div className="mb-24">
                <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-10">Features & Comfort</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12">
                  {Object.entries(car.features)
                    .filter(([_, value]) => value === true)
                    .map(([key, _]) => (
                      <div key={key} className="flex items-center gap-4 py-2">
                        <div className="w-2 h-2 rounded-full bg-[#B31B1B]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black leading-none">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-10">Asset Description</h3>
            <p className="text-black/60 text-base leading-relaxed mb-16 uppercase tracking-widest font-medium">
              {car.description || "Experience the pinnacle of luxury with this masterfully curated pre-owned asset. Every vehicle at OM Indian Cars undergoes a rigorous 150-point technical audit to ensure showroom-quality performance and absolute peace of mind for the elite connoisseur."}
            </p>
            
            <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-10">Elite Assurance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {[
                { title: "150-Point Inspection", desc: "Rigorous technical audit by certified engineers.", show: true },
                { title: "Finance Available", desc: "Instant approval & low ROI financing options.", show: car.services?.finance },
                { title: "Exchange Program", desc: "Best value for your existing asset exchange.", show: car.services?.exchange },
                { title: "Transparent History", desc: "100% verified service and title history.", show: true },
                { title: "Elite Concierge", desc: "Hassle-free RC transfer and documentation.", show: true },
                { title: "Best Value Guarantee", desc: "Most competitive fixed prices in the market.", show: true }
              ].filter(item => item.show).map((item, i) => (
                <div key={i} className="flex gap-6 p-8 bg-gray-50 rounded-[2.5rem] border border-black/5">
                  <div className="w-12 h-12 bg-[#B31B1B] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-1">{item.title}</h4>
                    <p className="text-[9px] font-black uppercase tracking-widest text-black/30">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. INQUIRY MODAL */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowInquiryModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              className="relative w-full max-w-lg bg-white rounded-[4rem] p-16 shadow-2xl text-center"
            >
              <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-2">Request Callback</h3>
              <p className="text-black/30 text-[10px] font-black uppercase tracking-widest mb-12">Experience excellence with OM Indian Cars</p>
              
              <form onSubmit={handleInquiry} className="space-y-6">
                <input 
                  required
                  type="text" 
                  placeholder="Enter Name"
                  className="w-full bg-gray-50 border border-black/5 p-6 rounded-2xl text-black text-xs font-bold uppercase outline-none focus:border-[#B31B1B] transition-all"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                />
                <input 
                  required
                  type="tel" 
                  placeholder="Enter Phone"
                  className="w-full bg-gray-50 border border-black/5 p-6 rounded-2xl text-black text-xs font-bold uppercase outline-none focus:border-[#B31B1B] transition-all"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                />
                <button 
                  type="submit"
                  className="w-full bg-[#B31B1B] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  Confirm Callback
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
