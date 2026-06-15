"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCars } from "@/context/CarContext";

export default function ContactPage() {
  const { addInquiry } = useCars();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Using a generic ID for contact requests that don't belong to a specific car
    addInquiry(
      "CONTACT_REQUEST", 
      "General Showroom Inquiry", 
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
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-[#C4141A] transition-all mb-12 group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Home
        </Link>

        <header className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#C4141A]" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40">Concierge Desk</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-black leading-none mb-8">
            Contact <span className="text-black/10">Us.</span>
          </h1>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black/30 max-w-xl">
            Experience absolute technical clarity and professional efficiency. Our evaluation and sales teams are standing by.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 space-y-16">
            {[
              { 
                icon: MapPin, 
                title: "Our Showroom", 
                val: "49-58-1, Akkayyapalem Main Rd, beside Port Stadium,\nNortheast Layout, Visakhapatnam, AP 530013",
                href: "https://www.google.com/maps/search/?api=1&query=OM+INDIAN+CARS+Visakhapatnam"
              },
              { 
                icon: Phone, 
                title: "Direct Concierge", 
                val: "+91 92466 20555",
                href: "tel:+919246620555"
              },
              { 
                icon: Mail, 
                title: "Official Inquiry", 
                val: "concierge@omindiancars.com",
                href: "mailto:concierge@omindiancars.com"
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="w-16 h-16 rounded-[2rem] bg-gray-50 border border-black/5 flex items-center justify-center shrink-0 group-hover:bg-[#C4141A] group-hover:text-white transition-all duration-500">
                  <item.icon size={24} className="text-[#C4141A] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">{item.title}</h3>
                  <a 
                    href={item.href} 
                    target={item.href.startsWith('http') ? "_blank" : undefined}
                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="text-sm font-black uppercase tracking-widest text-black leading-relaxed whitespace-pre-line hover:text-[#C4141A] transition-colors"
                  >
                    {item.val}
                  </a>
                </div>
              </div>
            ))}

            <div className="pt-12">
              <div className="aspect-video w-full rounded-[3rem] overflow-hidden border border-black/5 shadow-2xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.222378377755!2d83.23847557602498!3d17.7340026394551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39691b00000001%3A0xc00f3c051a82f348!2sOM%20INDIAN%20CARS!5e0!3m2!1sen!2sin!4v1715082000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full bg-gray-50 rounded-[4rem] p-16 flex flex-col items-center justify-center text-center border border-black/5"
              >
                <div className="w-24 h-24 bg-[#C4141A] rounded-full flex items-center justify-center text-white mb-8 shadow-2xl">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-black mb-4">Message Logged</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-12">Our concierge will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 border border-black/5 p-12 md:p-20 rounded-[4rem] space-y-10 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30 ml-4">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="ENTER NAME"
                      className="w-full bg-white border border-black/5 p-6 rounded-2xl text-black text-xs font-black uppercase outline-none focus:border-[#C4141A] transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30 ml-4">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="ENTER PHONE"
                      className="w-full bg-white border border-black/5 p-6 rounded-2xl text-black text-xs font-black uppercase outline-none focus:border-[#C4141A] transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/30 ml-4">Inquiry Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="HOW CAN WE ASSIST YOU?"
                    className="w-full bg-white border border-black/5 p-8 rounded-[2.5rem] text-black text-xs font-black uppercase outline-none focus:border-[#C4141A] transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-8 bg-[#C4141A] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-black transition-all shadow-xl shadow-red-900/20 active:scale-[0.98]"
                >
                  Send Inquiry <Send size={18} className="inline ml-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
