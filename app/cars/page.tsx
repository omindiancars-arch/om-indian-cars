"use client";

import { useCars } from "@/context/CarContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarCard from "@/components/ui/CarCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowLeft, X, ChevronDown } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import FilterSidebar from "@/components/inventory/FilterSidebar";
import { parsePrice, parseKms } from "@/utils/carFilters";

export default function InventoryPage() {
  const { cars } = useCars();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: null as any,
    brands: [] as string[],
    years: [] as string[],
    fuels: [] as string[],
    transmissions: [] as string[],
  });

  useEffect(() => {
    const make = searchParams.get("make");
    const year = searchParams.get("year");
    if (make || year) {
      setFilters(prev => ({
        ...prev,
        brands: make ? [make] : prev.brands,
        years: year ? [year] : prev.years
      }));
    }
  }, [searchParams]);

  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    cars.forEach(car => { if (car.specs.make) brands.add(car.specs.make); });
    return Array.from(brands).sort();
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      if (searchTerm && !car.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filters.priceRange) {
        const price = parsePrice(car.price);
        if (price < filters.priceRange.min || price > filters.priceRange.max) return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(car.specs.make || "")) return false;
      if (filters.years.length > 0) {
        const year = car.specs.year || "";
        if (filters.years.includes("Older")) {
          const yearNum = parseInt(year);
          if (yearNum >= 2019 && !filters.years.includes(year)) return false;
        } else if (!filters.years.includes(year)) return false;
      }
      if (filters.fuels.length > 0 && !filters.fuels.includes(car.specs.fuel || "")) return false;
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(car.specs.transmission || "")) return false;
      return true;
    });
  }, [cars, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({ priceRange: null, brands: [], years: [], fuels: [], transmissions: [] });
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-[24rem] md:pt-[22rem] pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <Link 
          href="/"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#B31B1B] hover:text-black transition-all mb-12 group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Home
        </Link>

        {/* ELITE HEADER */}
        <div className="mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#B31B1B]" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40">Elite Collection</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black uppercase tracking-tighter text-black leading-none">
                Inventory
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-[400px] group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#B31B1B] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="SEARCH ASSETS..."
                  className="w-full bg-gray-50 border border-black/5 py-6 pl-16 pr-8 text-[11px] font-black uppercase tracking-widest outline-none focus:border-[#B31B1B] focus:bg-white transition-all rounded-2xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden w-full flex items-center justify-center gap-4 bg-black text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px]"
              >
                <SlidersHorizontal size={18} /> Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* ELITE SIDEBAR */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-40 h-fit">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              clearFilters={clearFilters}
              availableBrands={availableBrands}
            />
          </aside>

          {/* ELITE GRID */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-black/5">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
                Found <span className="text-black">{filteredCars.length}</span> Premium Assets
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 cursor-pointer hover:text-black transition-colors">
                Sort By: Newest First <ChevronDown size={14} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-12">
              <AnimatePresence mode="popLayout">
                {filteredCars.map((car, idx) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredCars.length === 0 && (
              <div className="py-40 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <X size={40} className="text-black/10" />
                </div>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-black mb-4">No Assets Found</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-10">Adjust your filters to explore our collection</p>
                <button onClick={clearFilters} className="px-12 py-6 bg-[#B31B1B] text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">
                  Reset Collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* MOBILE FILTERS */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200]"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 w-full h-[90vh] bg-white z-[210] rounded-t-[4rem] p-12 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-heading font-black uppercase tracking-tighter text-black">Filter Assets</h2>
                <button onClick={() => setShowMobileFilters(false)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <X size={24} />
                </button>
              </div>
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                clearFilters={clearFilters}
                availableBrands={availableBrands}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
