"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Master Admin Credentials in Code
const MASTER_ADMIN_EMAIL = "admin@omindiancars.com";
const MASTER_ADMIN_PASSWORDS = ["OMindian@2510", "OMindain@2510"];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Check local storage for master admin session
    try {
      const storedUser = localStorage.getItem("om_admin_session");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
        return;
      }
    } catch {
      // ignore localStorage errors in SSR
    }

    // 2. Check active Supabase session
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          // Clear stale/corrupt local tokens silently
          supabase.auth.signOut({ scope: "local" }).catch(() => {});
        }
        
        if (session) {
          const role = session.user.email?.toLowerCase().endsWith("@omindiancars.com") ? "admin" : "user";
          setUser({
            id: session.user.id,
            name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "User",
            email: session.user.email || "",
            role
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    // Listen for Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const role = session.user.email?.toLowerCase().endsWith("@omindiancars.com") ? "admin" : "user";
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
          role
        });
      } else {
        // If not a master admin session, clear user
        try {
          if (!localStorage.getItem("om_admin_session")) {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check Master Admin in code
    if (
      cleanEmail === MASTER_ADMIN_EMAIL.toLowerCase() &&
      MASTER_ADMIN_PASSWORDS.includes(cleanPass)
    ) {
      const adminUser: User = {
        id: "master-admin-01",
        name: "Administrator",
        email: MASTER_ADMIN_EMAIL,
        role: "admin",
      };
      localStorage.setItem("om_admin_session", JSON.stringify(adminUser));
      setUser(adminUser);
      setIsLoading(false);
      router.push("/admin");
      return;
    }

    // Fallback to Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: cleanPass });
    if (error) {
      setIsLoading(false);
      throw error;
    }

    const role = cleanEmail.endsWith("@omindiancars.com") ? "admin" : "user";
    if (role === "admin") router.push("/admin");
    else router.push("/");
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const { error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPass,
      options: {
        data: { full_name: name }
      }
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    const role = cleanEmail.endsWith("@omindiancars.com") ? "admin" : "user";
    if (role === "admin") router.push("/admin");
    else router.push("/");
  };

  const logout = async () => {
    try {
      localStorage.removeItem("om_admin_session");
    } catch {
      // ignore
    }
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

