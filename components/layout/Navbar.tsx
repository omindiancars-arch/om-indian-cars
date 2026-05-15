"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";



export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user, isAuthenticated, logout } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 150);
  });

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-[100] flex flex-col"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full bg-[#B31B1B] overflow-hidden shadow-sm relative">
        <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10">
          <img 
            src="/omindlogo.png" 
            alt="OM Logo" 
            className="h-10 md:h-16 w-auto object-contain" 
          />
        </div>
        <div className="w-full">
          <img 
            src="/WhatsApp Image 2026-01-03 at 7.12.45 PM.jpeg" 
            alt="OM Indian Cars Brand" 
            className="w-full h-auto object-cover md:object-contain max-h-[120px] md:max-h-[90px] transition-all duration-700"
          />
        </div>
      </div>

      {/* SERVICE TICKER - Scrolling below the stripe */}
      <div className="w-full bg-[#B31B1B] py-2 overflow-hidden border-y border-white/10 shadow-lg">
        <motion.div 
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear"
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">Buy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">Sell</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">Finance</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">Insurance</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Navbar */}
      <div className={cn(
        "w-full px-6 md:px-10 py-3 md:py-5 flex items-center justify-between transition-all duration-500 backdrop-blur-2xl border-b",
        isScrolled 
          ? "bg-black/80 border-white/5 py-3 shadow-2xl" 
          : "bg-[#B31B1B] border-transparent shadow-sm"
      )}>
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative">
            <img
              src="/omindlogo.png"
              alt="OM Indian Cars"
              className={cn(
                "object-contain transition-all duration-500", 
                isScrolled ? "h-10 md:h-12" : "h-14 md:h-20"
              )}
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] ml-20 mr-auto text-white/80">
          {[
            { name: "Buy", href: "/cars" },
            { name: "Sell", href: "/sell" },
            { name: "Blog", href: "/blog" },
            { name: "About Us", href: "/about" },
            { name: "Contact Us", href: "/contact", highlight: true },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "transition-all relative group py-2 px-4 rounded-lg",
                item.highlight 
                  ? "text-white bg-[#B31B1B] animate-[pulse_1.5s_infinite] font-black shadow-[0_0_15px_rgba(179,27,27,0.3)]" 
                  : "hover:text-[#B31B1B]"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Action Icons & Contact */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden xl:flex flex-col items-end mr-4">
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest",
              isScrolled ? "text-[#FFD700]" : "text-[#B31B1B]"
            )}>Contact Number</span>
            <a 
              href="tel:+919246620555" 
              className={cn(
                "text-[12px] font-black transition-colors tracking-tighter px-3 py-1 rounded-lg",
                isScrolled 
                  ? "text-[#FFD700] bg-white/10 animate-pulse" 
                  : "text-white bg-[#B31B1B] animate-[pulse_1.5s_infinite] shadow-[0_0_15px_rgba(179,27,27,0.5)]"
              )}
            >+91 92466 20555</a>
          </div>
          
          <div className="hidden md:flex items-center gap-5 text-white/40">
            <div className="relative flex items-center">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-full mr-4 overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="SEARCH CARS..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchValue.trim()) {
                          router.push(`/cars?search=${encodeURIComponent(searchValue.trim())}`);
                          setShowSearch(false);
                          setSearchValue("");
                        }
                      }}
                      className={cn(
                        "w-full px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none border transition-all",
                        isScrolled 
                          ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20" 
                          : "bg-black/5 border-black/10 text-black placeholder:text-black/40 focus:bg-white"
                      )}
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Search 
                size={20} 
                className={cn(
                  "cursor-pointer transition-colors",
                  showSearch ? "text-[#B31B1B]" : "hover:text-[#B31B1B]"
                )}
                onClick={() => setShowSearch(!showSearch)}
              />
            </div>
            <Heart size={20} className="cursor-pointer hover:text-[#B31B1B] transition-colors" />
            {isAuthenticated ? (
              <div 
                onClick={() => logout()}
                className="cursor-pointer hover:text-[#B31B1B] transition-colors flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#B31B1B] text-white flex items-center justify-center text-[10px] font-black">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <Link href="/login">
                <User size={20} className="cursor-pointer hover:text-[#B31B1B] transition-colors" />
              </Link>
            )}
          </div>
          
          <Link 
            href="/cars" 
            className={cn(
              "hidden sm:flex px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95",
              isScrolled 
                ? "bg-white text-[#B31B1B] hover:bg-[#FFD700] hover:text-black" 
                : "bg-white text-[#B31B1B] hover:bg-black hover:text-white"
            )}
          >
            Explore cars
          </Link>
          
          <button 
            className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Premium Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-t border-white/5 flex flex-col p-10 gap-8 shadow-2xl z-[90]"
          >
            <div className="flex flex-col gap-6">
              {[
                { name: "Buy", href: "/cars" },
                { name: "Sell", href: "/sell" },
                { name: "Blog", href: "/blog" },
                { name: "Our Legacy", href: "/about" },
                { name: "Get in Touch", href: "/contact" },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-lg font-black uppercase tracking-[0.2em] text-white/80 hover:text-[#FFD700] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="h-[1px] w-full bg-white/5 my-2" />
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Account</span>
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-xl font-black text-[#B31B1B] text-left uppercase tracking-wider"
                >
                  Logout ({user?.name})
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="text-xl font-black text-white uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>

            <div className="h-[1px] w-full bg-white/5 my-2" />

            <Link 
              href="/cars"
              className="w-full py-6 bg-white text-[#B31B1B] text-center rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl"
              onClick={() => setIsOpen(false)}
            >
              Browse Cars
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
