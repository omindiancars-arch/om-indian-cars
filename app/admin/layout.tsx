"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Car, MessageSquare, LogOut, Home, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, isLoading, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#B31B1B] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Cars", href: "/admin/cars", icon: Car },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#B31B1B] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col bg-[#B31B1B]">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/omindlogo.png"
              alt="OM Indian Cars Logo"
              className="w-16 h-16 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-widest uppercase leading-tight text-white">Admin</span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/40 font-bold">Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest text-[10px] font-black relative group",
                  isActive
                    ? "bg-white text-[#B31B1B] shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav" 
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#B31B1B] rounded-full" 
                  />
                )}
                <item.icon size={18} strokeWidth={isActive ? 3 : 2} className={cn("transition-transform group-hover:scale-110", isActive && "scale-110")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-all uppercase tracking-widest text-[10px] font-bold"
          >
            <Home size={18} />
            View Site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-all uppercase tracking-widest text-[10px] font-bold w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 border-b border-white/10 flex items-center justify-between px-10 bg-[#B31B1B]/80 backdrop-blur-xl z-40 sticky top-0">
          <h1 className="font-heading text-2xl uppercase tracking-[0.4em] font-black text-white drop-shadow-sm">
            {navItems.find(item => item.href === pathname)?.name || "Admin"}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end mr-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">{user?.name || 'Administrator'}</span>
              <span className="text-[8px] text-white/40 uppercase tracking-widest font-bold">{user?.role || 'Portal'} Active</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group">
              <span className="text-xs font-black text-white group-hover:scale-110 transition-transform">
                {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
              </span>
            </div>
            <button 
              onClick={logout}
              className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#B31B1B] text-white flex items-center justify-center transition-all group"
              title="Logout"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10 bg-[rgba(0,0,0,0.1)]">
          {children}
        </div>
      </main>
    </div>
  );
}
