"use client";

import { useCars } from "@/context/CarContext";
import { MessageSquare, Trash2, Calendar, User, Car as CarIcon, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminInquiries() {
  const { inquiries, clearInquiries } = useCars();

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <p className="text-white text-[10px] uppercase tracking-[0.3em] font-black">
          {inquiries.length} Real-time Submissions Capture
        </p>
        {inquiries.length > 0 && (
          <button 
            onClick={clearInquiries}
            className="text-white/80 hover:text-white text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2 transition-colors border-b border-white/10 pb-1"
          >
            <Trash2 size={14} /> Reset Analytics
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry, i) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-10 hover:border-white/30 transition-all shadow-2xl backdrop-blur-sm"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Customer Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <User size={14} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Prospect</span>
                  </div>
                  <div>
                    <p className="font-heading text-2xl uppercase tracking-tighter font-black leading-none text-white mb-2">{inquiry.customerName}</p>
                    <p className="text-[11px] text-white/60 uppercase tracking-[0.2em] font-black">{inquiry.customerPhone}</p>
                  </div>
                </div>

                {/* Car Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <CarIcon size={14} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Asset Interest</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-heading text-xl uppercase tracking-widest font-black text-white">{inquiry.carName}</p>
                    <ExternalLink size={14} className="text-white/20" />
                  </div>
                </div>

                {/* Date Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar size={14} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Timestamp</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-black uppercase tracking-widest">{inquiry.timestamp}</p>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-white text-[#C50403] px-8 py-4 text-[10px] uppercase tracking-widest font-black rounded-xl hover:scale-105 transition-all shadow-xl">
                  MARK AS PROCESSED
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-32 flex flex-col items-center justify-center gap-6 text-center backdrop-blur-sm">
            <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center text-white/20 mb-4 border border-white/10 rotate-12">
              <MessageSquare size={48} />
            </div>
            <h3 className="font-heading text-3xl uppercase tracking-tighter font-black text-white">No Lead Flow</h3>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold max-w-xs leading-loose">Waiting for premium customer inquiries to populate the dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
}
