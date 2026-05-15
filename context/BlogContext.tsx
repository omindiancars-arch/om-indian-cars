"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image: string;
  author: string;
  date: string;
  category?: string;
  readTime?: string;
  status?: 'published' | 'draft';
  created_at?: string;
}

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, "id">) => Promise<void>;
  updateBlog: (id: string, blog: Partial<Blog>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  isLoaded: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const INITIAL_BLOGS: Blog[] = [
  {
    id: "1",
    title: "The Art of Selecting a Premium Pre-Owned Asset",
    content: "When it comes to luxury vehicles, the distinction between 'used' and 'pre-owned' lies in the details. At OM Indian Cars, we believe that every vehicle has a story, and our job is to ensure that story is one of excellence and prestige. Choosing a premium asset requires more than just looking at the odometer; it requires a deep understanding of maintenance history, technical integrity, and the emotional resonance of the brand.\n\nOur 150-point technical audit is designed to uncover the hidden truths of every car, ensuring that when you drive away, you're not just driving a car, but a legacy of automotive perfection.",
    excerpt: "Discover the secrets to choosing a pre-owned luxury car that maintains its value and prestige.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    author: "OM Editorial",
    date: new Date().toISOString(),
    category: "Buying Guide",
    readTime: "4 MIN READ",
    status: 'published'
  },
  {
    id: "2",
    title: "Market Trends: Why Luxury Cars are a Smart Investment",
    content: "The automotive market in India is evolving rapidly. While mass-market cars depreciated significantly, premium luxury assets from brands like BMW, Mercedes-Benz, and Audi are showing remarkable resilience in value. This shift is driven by a growing class of connoisseurs who value engineering over utility.\n\nIn this article, we explore why investing in a high-quality pre-owned luxury car can often be a smarter financial move than buying a new mid-range vehicle, especially when considering the depreciation curves of elite brands.",
    excerpt: "Analyzing the current trends in the Indian luxury car market and the investment potential of premium brands.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    author: "Market Analyst",
    date: new Date().toISOString(),
    category: "Market Insights",
    readTime: "6 MIN READ",
    status: 'published'
  }
];

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          const saved = localStorage.getItem('om_indian_cars_blogs');
          if (saved) {
            setBlogs(JSON.parse(saved));
          } else {
            setBlogs(INITIAL_BLOGS);
          }
        }
      } catch (error) {
        console.warn("Supabase blog load failed. Using local storage.", error);
        const saved = localStorage.getItem('om_indian_cars_blogs');
        if (saved) {
          setBlogs(JSON.parse(saved));
        } else {
          setBlogs(INITIAL_BLOGS);
        }
      } finally {
        setIsLoaded(true);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('om_indian_cars_blogs', JSON.stringify(blogs));
    }
  }, [blogs, isLoaded]);

  const addBlog = async (blogData: Omit<Blog, "id">) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          ...blogData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      setBlogs(prev => [data, ...prev]);
    } catch (error) {
      console.error("Failed to add blog to Supabase:", error);
      const newBlog = { 
        ...blogData, 
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      };
      setBlogs(prev => [newBlog, ...prev]);
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', id);

      if (error) throw error;
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...blogData } : b));
    } catch (error) {
      console.error("Failed to update blog:", error);
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...blogData } : b));
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, isLoaded }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
}
