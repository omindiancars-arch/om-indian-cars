"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lock, User, Eye, EyeOff, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, isLoading: authLoading } = useAuth();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "signup" || m === "login") {
      setMode(m);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
      router.push("/");
    } catch (error) {
      console.error("Auth error:", error);
      alert(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#CE1126]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-black/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-black/40 hover:text-black transition-colors uppercase tracking-widest text-[10px] font-bold mb-12"
        >
          <ArrowLeft size={14} /> Back to Showroom
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 border border-black/5 p-10 md:p-12 shadow-2xl rounded-[3rem]"
        >
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src="/omindlogo.png" alt="Logo" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="font-heading text-2xl uppercase tracking-tighter font-black mb-2 text-black">
              {mode === "login" ? "Account Access" : "Join The Elite"}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-bold">
              {mode === "login" ? "Welcome back to OM Indian Cars" : "Create your personal profile"}
            </p>
          </div>

          <div className="flex bg-black/5 p-1 mb-8 rounded-xl">
            <button 
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-3 text-[9px] uppercase tracking-widest font-black transition-all rounded-lg ${mode === "login" ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"}`}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 text-[9px] uppercase tracking-widest font-black transition-all rounded-lg ${mode === "signup" ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div 
                  key="name-field"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
                    <input 
                      required={mode === "signup"}
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full bg-white border border-black/10 p-4 pl-12 text-xs uppercase tracking-widest focus:border-[#CE1126] outline-none transition-colors text-black rounded-xl"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold ml-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-black/10 p-4 pl-12 text-xs uppercase tracking-widest focus:border-[#CE1126] outline-none transition-colors text-black rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full bg-white border border-black/10 p-4 pl-12 pr-12 text-xs uppercase tracking-widest focus:border-[#CE1126] outline-none transition-colors text-black rounded-xl"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#CE1126] text-white py-6 rounded-xl font-heading font-black uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50 shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <>
                  {mode === "login" ? "Enter Showroom" : "Register Now"} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-black/5 text-center">
            <p className="text-[10px] text-black/20 uppercase tracking-widest leading-loose">
              Become a member of the OM Indian Cars elite community.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#CE1126]/20 border-t-[#CE1126] rounded-full animate-spin" />
    </div>}>
      <LoginContent />
    </Suspense>
  );
}
