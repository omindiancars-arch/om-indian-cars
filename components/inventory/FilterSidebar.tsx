"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, X, RotateCcw } from "lucide-react";
import { cn } from "@/utils/cn";

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  clearFilters: () => void;
  availableBrands: string[];
}

export default function FilterSidebar({ filters, setFilters, clearFilters, availableBrands }: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["price", "brand"]);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => 
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const updateFilter = (category: string, value: any) => {
    setFilters({ ...filters, [category]: value });
  };

  const toggleMultiSelect = (category: string, value: string) => {
    const current = filters[category] || [];
    const updated = current.includes(value) 
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    updateFilter(category, updated);
  };

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-black uppercase tracking-tighter text-[#C4141A]">Filter Assets</h2>
        <button 
          onClick={clearFilters}
          className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-black text-black/40 hover:text-[#C4141A] transition-colors"
        >
          <RotateCcw size={12} /> Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <FilterGroup 
          title="Price Range" 
          isExpanded={expandedGroups.includes("price")} 
          onToggle={() => toggleGroup("price")}
          activeCount={filters.priceRange ? 1 : 0}
        >
          <div className="space-y-4 pt-4">
            {[
              { label: "Under ₹ 5 Lakh", min: 0, max: 500000 },
              { label: "₹ 5 - 10 Lakh", min: 500000, max: 1000000 },
              { label: "₹ 10 - 20 Lakh", min: 1000000, max: 2000000 },
              { label: "₹ 20 Lakh +", min: 2000000, max: 99999999 }
            ].map(range => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="price"
                  checked={filters.priceRange?.label === range.label}
                  onChange={() => updateFilter("priceRange", range)}
                  className="sr-only"
                />
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center",
                  filters.priceRange?.label === range.label ? "border-[#C4141A]" : "border-black/10 group-hover:border-black/20"
                )}>
                  {filters.priceRange?.label === range.label && <div className="w-2 h-2 rounded-full bg-[#C4141A]" />}
                </div>
                <span className={cn(
                  "text-[10px] uppercase tracking-widest font-black transition-colors",
                  filters.priceRange?.label === range.label ? "text-[#C4141A]" : "text-black/60 group-hover:text-black"
                )}>{range.label}</span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Brands */}
        <FilterGroup 
          title="Brands + Models" 
          isExpanded={expandedGroups.includes("brand")} 
          onToggle={() => toggleGroup("brand")}
          activeCount={filters.brands?.length || 0}
        >
          <div className="space-y-3 pt-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {availableBrands.map(brand => (
              <label key={brand} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={filters.brands?.includes(brand)}
                    onChange={() => toggleMultiSelect("brands", brand)}
                    className="sr-only"
                  />
                  <div className={cn(
                    "w-5 h-5 rounded border-2 transition-all flex items-center justify-center",
                    filters.brands?.includes(brand) ? "border-[#C4141A] bg-[#C4141A]" : "border-black/10 group-hover:border-black/20"
                  )}>
                    {filters.brands?.includes(brand) && <X size={12} className="text-white" />}
                  </div>
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest font-black transition-colors",
                    filters.brands?.includes(brand) ? "text-[#C4141A]" : "text-black/60 group-hover:text-black"
                  )}>{brand}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Year */}
        <FilterGroup 
          title="Year" 
          isExpanded={expandedGroups.includes("year")} 
          onToggle={() => toggleGroup("year")}
          activeCount={filters.years?.length || 0}
        >
          <div className="grid grid-cols-2 gap-3 pt-4">
            {["2024", "2023", "2022", "2021", "2020", "2019", "Older"].map(year => (
              <button
                key={year}
                onClick={() => toggleMultiSelect("years", year)}
                className={cn(
                  "py-3 px-4 rounded-xl border text-[9px] uppercase font-black tracking-widest transition-all",
                  filters.years?.includes(year) 
                    ? "bg-[#C4141A] border-[#C4141A] text-white shadow-lg" 
                    : "bg-black/[0.02] border-black/[0.05] text-black/40 hover:bg-black/[0.04]"
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* Fuel Type */}
        <FilterGroup 
          title="Fuel Type" 
          isExpanded={expandedGroups.includes("fuel")} 
          onToggle={() => toggleGroup("fuel")}
          activeCount={filters.fuels?.length || 0}
        >
          <div className="flex flex-wrap gap-2 pt-4">
            {["Petrol", "Diesel", "Electric", "Hybrid"].map(fuel => (
              <button
                key={fuel}
                onClick={() => toggleMultiSelect("fuels", fuel)}
                className={cn(
                  "py-2 px-5 rounded-full border text-[8px] uppercase font-black tracking-[0.2em] transition-all",
                  filters.fuels?.includes(fuel) 
                    ? "bg-[#C4141A] border-[#C4141A] text-white shadow-lg" 
                    : "bg-black/[0.02] border-black/[0.05] text-black/40 hover:bg-black/[0.04]"
                )}
              >
                {fuel}
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* Transmission */}
        <FilterGroup 
          title="Transmission" 
          isExpanded={expandedGroups.includes("transmission")} 
          onToggle={() => toggleGroup("transmission")}
          activeCount={filters.transmissions?.length || 0}
        >
          <div className="grid grid-cols-2 gap-3 pt-4">
            {["Automatic", "Manual"].map(t => (
              <button
                key={t}
                onClick={() => toggleMultiSelect("transmissions", t)}
                className={cn(
                  "py-3 px-4 rounded-xl border text-[9px] uppercase font-black tracking-widest transition-all",
                  filters.transmissions?.includes(t) 
                    ? "bg-[#C4141A] border-[#C4141A] text-white shadow-lg" 
                    : "bg-black/[0.02] border-black/[0.05] text-black/40 hover:bg-black/[0.04]"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </FilterGroup>
      </div>
    </aside>
  );
}

function FilterGroup({ title, children, isExpanded, onToggle, activeCount }: any) {
  return (
    <div className="border-b border-black/[0.05] pb-6">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <span className={cn(
            "text-[10px] uppercase tracking-[0.3em] font-black transition-colors",
            isExpanded ? "text-[#C4141A]" : "text-black/60 group-hover:text-black"
          )}>
            {title}
          </span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#C4141A] text-white text-[9px] flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {isExpanded ? <ChevronDown size={16} className="text-black/20" /> : <ChevronRight size={16} className="text-black/20" />}
      </button>
      {isExpanded && children}
    </div>
  );
}
