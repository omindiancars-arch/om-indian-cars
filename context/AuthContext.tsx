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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Auth session error:", error.message);
        // Clear local storage / session if refresh token is invalid
        supabase.auth.signOut();
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
    });

    // Listen for auth changes
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
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsLoading(false);
      throw error;
    }

    const role = email.toLowerCase().endsWith("@omindiancars.com") ? "admin" : "user";
    if (role === "admin") router.push("/admin");
    else router.push("/");
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    const role = email.toLowerCase().endsWith("@omindiancars.com") ? "admin" : "user";
    if (role === "admin") router.push("/admin");
    else router.push("/");
  };

  const logout = async () => {
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
