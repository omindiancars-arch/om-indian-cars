"use client";

import Link from "next/link";
import { Phone, MapPin, Mail, ArrowRight, ShieldCheck, Star } from "lucide-react";

const Facebook = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-16 relative z-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C50403]/5 -skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-[#C50403]/5 skew-x-12 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Info */}
          <div className="flex flex-col gap-10">
            <Link href="/" className="inline-block">
              <img src="/omindlogo.png" alt="OM Indian Cars" className="h-20 w-auto object-contain" />
            </Link>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed max-w-xs">
              India's premier luxury used car dealership, bringing world-class automotive excellence to the heart of Visakhapatnam.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C50403] hover:border-[#C50403] transition-all cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C50403] hover:border-[#C50403] transition-all cursor-pointer">
                <Facebook size={18} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-10">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C50403]">Quick Links</h4>
            <div className="flex flex-col gap-5">
              {["Buy a Car", "Sell Your Car", "Finance", "Insurance", "Blog", "About Us"].map((link) => (
                <Link key={link} href={link === "Buy a Car" ? "/cars" : link === "Sell Your Car" ? "/sell" : link === "Finance" ? "/finance" : link === "Insurance" ? "/insurance" : link === "Blog" ? "/blog" : "/about"} className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-10">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C50403]">Our Services</h4>
            <div className="flex flex-col gap-5">
              {["150-Point Audit", "Showroom Exchange", "RC Transfer", "Luxury Detailing", "Concierge Support"].map((link) => (
                <Link key={link} href="#" className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-10">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C50403]">Get in Touch</h4>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#C50403]" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">
                  49-58-1, Akkayyapalem Main Rd, beside Port Stadium,<br /> Northeast Layout, Visakhapatnam, AP 530013
                </p>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#C50403]" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  +91 92466 20555
                </p>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#C50403]" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  concierge@omindiancars.com
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
            © 2026 OM INDIAN CARS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
