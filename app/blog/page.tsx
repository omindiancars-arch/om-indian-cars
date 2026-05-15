"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useBlogs, Blog } from "@/context/BlogContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const { blogs } = useBlogs();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-64 pb-24 px-6 bg-gray-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#CE1126] mb-6 block"
          >
            Insights & Lifestyle
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-black mb-8"
          >
            The OM <br className="md:hidden" /><span className="text-[#CE1126]">Journal</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-black/40 text-xs md:text-sm font-black uppercase tracking-widest max-w-2xl mx-auto leading-relaxed"
          >
            Exploring the world of luxury assets, automotive excellence, and the lifestyle of the elite connoisseur.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((blog, idx) => (
              <BlogCard key={blog.id} blog={blog} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-black/5">
            <p className="text-black/30 font-black uppercase tracking-widest text-[10px]">No stories published yet. Stay tuned.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

function BlogCard({ blog, index }: { blog: Blog, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${blog.id}`}>
        <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl border border-black/5">
          <img 
            src={blog.image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop"} 
            alt={blog.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-black shadow-lg">
              {blog.category || "Luxury"}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-6 text-[8px] font-black uppercase tracking-widest text-black/40">
            <span className="flex items-center gap-2"><Calendar size={12} className="text-[#CE1126]" /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><Clock size={12} className="text-[#CE1126]" /> {blog.readTime || "5 MIN READ"}</span>
          </div>
          
          <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-black group-hover:text-[#CE1126] transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          <p className="text-black/60 text-xs leading-relaxed line-clamp-3 uppercase tracking-widest font-medium">
            {blog.excerpt || blog.content.substring(0, 150) + "..."}
          </p>
          
          <div className="pt-4 flex items-center gap-2 text-[#CE1126] text-[9px] font-black uppercase tracking-[0.3em] group-hover:gap-4 transition-all">
            Read Article <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
