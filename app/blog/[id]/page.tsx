"use client";

import { useParams, useRouter } from "next/navigation";
import { useBlogs } from "@/context/BlogContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { blogs } = useBlogs();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const foundBlog = blogs.find(b => b.id === params.id);
    if (foundBlog) {
      setBlog(foundBlog);
    }
  }, [params.id, blogs]);

  if (!blog) return null;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Header Area */}
      <div className="pt-64 pb-20 px-6 max-w-5xl mx-auto w-full text-center">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#B31B1B] hover:text-black transition-all mb-12 mx-auto group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Journal
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B31B1B] mb-6 block">
            {blog.category || "LUXURY LIFESTYLE"}
          </span>
          <h1 className="text-4xl md:text-7xl font-heading font-black uppercase tracking-tighter text-black leading-[1.1] mb-10">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-black/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B31B1B] text-white flex items-center justify-center text-[10px]">
                {blog.author?.charAt(0).toUpperCase() || "O"}
              </div>
              <span>By {blog.author || "OM Editor"}</span>
            </div>
            <div className="flex items-center gap-2"><Calendar size={14} className="text-[#B31B1B]" /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div className="flex items-center gap-2"><Clock size={14} className="text-[#B31B1B]" /> {blog.readTime || "5 MIN READ"}</div>
          </div>
        </motion.div>
      </div>

      {/* Featured Image */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-video rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl border border-black/5"
        >
          <img 
            src={blog.image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop"} 
            className="w-full h-full object-cover"
            alt={blog.title}
          />
        </motion.div>
      </section>

      {/* Content Area */}
      <section className="px-6 max-w-4xl mx-auto w-full mb-32">
        <div className="flex flex-col md:flex-row gap-20">
          {/* Share Sidebar */}
          <aside className="md:w-12 shrink-0 flex md:flex-col gap-6 md:pt-4 border-b md:border-b-0 pb-10 md:pb-0 mb-10 md:mb-0">
            <span className="text-[8px] font-black uppercase tracking-widest text-black/20 md:[writing-mode:vertical-lr] mb-4">Share Story</span>
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:bg-[#B31B1B] hover:text-white hover:border-[#B31B1B] transition-all">
              <Facebook size={18} />
            </button>
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:bg-[#B31B1B] hover:text-white hover:border-[#B31B1B] transition-all">
              <Twitter size={18} />
            </button>
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:bg-[#B31B1B] hover:text-white hover:border-[#B31B1B] transition-all">
              <Linkedin size={18} />
            </button>
          </aside>

          {/* Main Content */}
          <article className="flex-1 prose prose-xl prose-black max-w-none">
            <div className="text-black/70 text-lg md:text-xl leading-[1.8] uppercase tracking-widest font-medium whitespace-pre-wrap">
              {blog.content}
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
