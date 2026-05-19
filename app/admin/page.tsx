"use client";

import { useCars } from "@/context/CarContext";
import { Car, MessageSquare, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

import Link from "next/link";

export default function AdminDashboard() {
  const { cars, inquiries } = useCars();

  const stats = [
    { label: "Total Cars", value: cars.length, icon: Car, color: "text-white" },
    { label: "Total Inquiries", value: inquiries.length, icon: MessageSquare, color: "text-white" },
    { label: "Conversion Rate", value: "12%", icon: TrendingUp, color: "text-white" },
    { label: "Active Users", value: "48", icon: Users, color: "text-white" },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col gap-6 relative group overflow-hidden shadow-2xl backdrop-blur-sm"
          >
            <div className={`p-4 rounded-2xl bg-white text-[#C50403] shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} strokeWidth={3} />
            </div>
            <div>
              <p className="text-white text-[10px] uppercase tracking-[0.4em] font-black mb-2">{stat.label}</p>
              <h3 className="text-4xl font-heading font-black text-white tracking-tighter drop-shadow-lg">{stat.value}</h3>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16 transition-transform group-hover:scale-110" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Inquiries */}
        <section className="bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-heading text-xl uppercase tracking-[0.4em] font-black text-white">Lead Stream</h2>
            <Link href="/admin/inquiries" className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black hover:text-white transition-colors">View All</Link>
          </div>
          <div className="space-y-8">
            {inquiries.length > 0 ? (
              inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between py-6 border-b border-white/5 last:border-0 group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-[#C50403] transition-all">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-[11px] text-white mb-1 leading-none">{inquiry.customerName}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-2">{inquiry.customerPhone}</p>
                      <p className="text-[9px] text-white/20 uppercase tracking-widest">Interested in <span className="text-white/60">{inquiry.carName}</span></p>
                    </div>
                  </div>
                  <span className="text-[8px] text-white/20 uppercase tracking-widest font-bold">{inquiry.timestamp}</span>
                </div>
              ))
            ) : (
              <p className="text-white/20 text-center py-20 uppercase tracking-[0.5em] text-[10px] font-black">Waiting for lead data...</p>
            )}
          </div>
        </section>

        {/* Inventory Overview */}
        <section className="bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-heading text-xl uppercase tracking-[0.4em] font-black text-white">Active Collection</h2>
            <Link href="/admin/cars" className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black hover:text-white transition-colors">Manage All</Link>
          </div>
          <div className="space-y-8">
            {cars.slice(0, 5).map((car) => (
              <div key={car.id} className="flex items-center justify-between py-6 border-b border-white/5 last:border-0 group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-12 bg-black/20 rounded-xl border border-white/10 relative overflow-hidden">
                    <img src={car.image} alt={car.name} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-[11px] text-white mb-1">{car.name}</p>
                    <p className="text-[10px] text-white font-black tracking-widest">{car.price}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white/10 text-white text-[8px] uppercase tracking-[0.3em] font-black border border-white/20 rounded-full group-hover:bg-white group-hover:text-[#C50403] transition-all">Verified</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
