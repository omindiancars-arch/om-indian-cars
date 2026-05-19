"use client";

import { useState, useEffect } from "react";
import { calculateEMI } from "@/lib/utils";

export default function EMICalculator({ price }: { price: string }) {
  const [downPayment, setDownPayment] = useState(20); // percentage
  const [tenure, setTenure] = useState(60); // months
  const [interestRate, setInterestRate] = useState(8.5);
  const [emi, setEmi] = useState("");

  const principalAmount = parseInt(price.replace(/[^\d]/g, ""));
  const loanAmount = principalAmount * (1 - downPayment / 100);

  useEffect(() => {
    const calculatedEmi = calculateEMI(`₹${loanAmount}`, interestRate, tenure);
    setEmi(calculatedEmi);
  }, [loanAmount, tenure, interestRate]);

  return (
    <div className="bg-[#C50403]/5 border border-[#C50403]/10 rounded-[2.5rem] p-8 md:p-12">
      <div className="mb-10">
        <h3 className="text-2xl font-heading font-bold uppercase tracking-tighter text-[#C50403] mb-2">Finance Estimate</h3>
        <p className="text-[10px] uppercase tracking-widest text-[#C50403]/40 font-bold">Customize your luxury payment plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sliders */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-[#C50403]">
              <span>Down Payment ({downPayment}%)</span>
              <span>₹{(principalAmount * (downPayment / 100)).toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="80" 
              value={downPayment} 
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#C50403]/10 rounded-lg appearance-none cursor-pointer accent-[#C50403]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-[#C50403]">
              <span>Tenure ({tenure / 12} Years)</span>
              <span>{tenure} Months</span>
            </div>
            <input 
              type="range" 
              min="12" 
              max="84" 
              step="12"
              value={tenure} 
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#C50403]/10 rounded-lg appearance-none cursor-pointer accent-[#C50403]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-[#C50403]">
              <span>Interest Rate</span>
              <span>{interestRate}%</span>
            </div>
            <input 
              type="range" 
              min="7" 
              max="15" 
              step="0.1"
              value={interestRate} 
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#C50403]/10 rounded-lg appearance-none cursor-pointer accent-[#C50403]"
            />
          </div>
        </div>

        {/* Result Card */}
        <div className="bg-[#C50403] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] -mr-16 -mt-16" />
          
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 relative z-10">Estimated Monthly Installment</p>
          <h4 className="text-4xl md:text-5xl font-sans font-bold text-white mb-2 relative z-10 leading-none">
            {emi}
          </h4>
          <p className="text-white/20 text-[8px] uppercase tracking-widest relative z-10">*Subject to bank approval and credit score</p>
          
          <div className="mt-10 pt-8 border-t border-white/10 w-full grid grid-cols-2 gap-4 relative z-10">
            <div>
              <p className="text-white/40 text-[8px] uppercase tracking-widest font-bold mb-1">Loan Amount</p>
              <p className="text-white text-xs font-bold">₹{loanAmount.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-white/40 text-[8px] uppercase tracking-widest font-bold mb-1">Down Payment</p>
              <p className="text-white text-xs font-bold">₹{(principalAmount * (downPayment / 100)).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
