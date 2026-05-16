"use client";

import { Search, ChevronDown } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCars } from "@/context/CarContext";
import { motion, AnimatePresence } from "framer-motion";

export default function EliteSearch() {
  const router = useRouter();
  const { cars } = useCars();
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const makes = useMemo(() => {
    const set = new Set<string>();
    cars.forEach(car => { if (car.specs.make) set.add(car.specs.make); });
    return Array.from(set).sort();
  }, [cars]);

  const years = useMemo(() => {
    const set = new Set<string>();
    cars.forEach(car => { if (car.specs.year) set.add(car.specs.year); });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [cars]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (year) params.set("year", year);
    router.push(`/cars?${params.toString()}`);
  };

  const Dropdown = ({ label, value, options, onSelect, type }: any) => (
    <div className="flex-1 w-full relative group">
      <label className="absolute -top-3 left-6 px-3 bg-white text-[9px] font-black uppercase tracking-[0.2em] text-[#CE1126] z-10 border border-black/5 rounded-full">
        {label}
      </label>
      <div 
        onClick={() => setActiveDropdown(activeDropdown === type ? null : type)}
        className="w-full h-16 md:h-20 flex items-center justify-between px-8 bg-gray-50 rounded-2xl md:rounded-full text-black font-heading font-bold text-xs md:text-sm uppercase tracking-wider cursor-pointer hover:bg-white hover:shadow-lg transition-all border border-black/5"
      >
        <span className={value ? "text-black" : "text-black/60"}>
          {value || `Any ${label}`}
        </span>
        <ChevronDown size={18} className={`text-[#CE1126] transition-transform duration-300 ${activeDropdown === type ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {activeDropdown === type && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white border border-black/5 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden z-[200] max-h-[300px] overflow-y-auto p-4"
          >
            <div 
              onClick={() => { onSelect(""); setActiveDropdown(null); }}
              className="p-4 hover:bg-[#CE1126]/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
            >
              Any {label}
            </div>
            {options.map((opt: string) => (
              <div 
                key={opt}
                onClick={() => { onSelect(opt); setActiveDropdown(null); }}
                className={`p-4 hover:bg-[#CE1126]/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${value === opt ? 'bg-[#CE1126]/5 text-[#CE1126]' : 'text-black/60'}`}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-6 relative z-50">
      <div className="bg-white/95 backdrop-blur-xl p-5 md:p-6 rounded-[2.5rem] md:rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.2)] flex flex-col md:flex-row items-center gap-5 md:gap-6 border border-white/20">
        
        <Dropdown 
          label="Make" 
          value={make} 
          options={makes} 
          onSelect={setMake} 
          type="make"
        />

        <Dropdown 
          label="Year" 
          value={year} 
          options={years} 
          onSelect={setYear} 
          type="year"
        />

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="w-full md:w-24 h-16 md:h-20 rounded-2xl md:rounded-full bg-[#CE1126] text-white flex items-center justify-center shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <Search size={28} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
