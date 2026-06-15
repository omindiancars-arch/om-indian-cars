"use client";

import { useState } from "react";
import { useBlogs, Blog } from "@/context/BlogContext";
import { Plus, Trash2, Edit2, X, Search, Upload, Loader2, Calendar, User, AlignLeft, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadFile } from "@/lib/supabase";

export default function AdminBlogs() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    author: "OM Editorial",
    date: new Date().toISOString().split('T')[0],
    category: "Market Insights",
    readTime: "5 MIN READ",
    status: 'published' as 'published' | 'draft'
  });

  const handleReset = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "",
      author: "OM Editorial",
      date: new Date().toISOString().split('T')[0],
      category: "Market Insights",
      readTime: "5 MIN READ",
      status: 'published'
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateBlog(editingId, formData);
    } else {
      await addBlog(formData);
    }
    handleReset();
  };

  const handleEdit = (blog: Blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      image: blog.image,
      author: blog.author,
      date: blog.date,
      category: blog.category || "Market Insights",
      readTime: blog.readTime || "5 MIN READ",
      status: blog.status || 'published'
    });
    setEditingId(blog.id);
    setIsAdding(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const path = `blog_${Date.now()}_${file.name}`;
        const url = await uploadFile(file, path);
        setFormData(prev => ({ ...prev, image: url }));
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH STORIES..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest text-white placeholder:text-white/60 focus:border-white/60 outline-none transition-all rounded-xl"
          />
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-3 bg-white text-[#C4141A] px-10 py-5 rounded-2xl font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          <Plus size={18} strokeWidth={4} /> Create Story
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 overflow-x-auto rounded-3xl backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white">
              <th className="px-8 py-8 font-black">Story Title</th>
              <th className="px-8 py-8 font-black">Category</th>
              <th className="px-8 py-8 font-black">Published Date</th>
              <th className="px-8 py-8 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} className="group hover:bg-white/10 transition-all duration-300">
                <td className="px-8 py-10">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-16 bg-black/40 border border-white/20 overflow-hidden rounded-xl shadow-lg">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black uppercase tracking-widest text-[12px] text-white group-hover:text-white transition-colors line-clamp-1">{blog.title}</span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white font-black mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">By {blog.author}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-10">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-white rounded-lg">{blog.category}</span>
                </td>
                <td className="px-8 py-10 text-white/60 text-[10px] font-black uppercase tracking-widest">
                  {new Date(blog.date).toLocaleDateString()}
                </td>
                <td className="px-8 py-10 text-right">
                  <div className="flex justify-end gap-4">
                    <button 
                      onClick={() => handleEdit(blog)}
                      className="p-4 bg-white/5 hover:bg-white text-white hover:text-[#C4141A] rounded-xl transition-all shadow-lg"
                    >
                      <Edit2 size={18} strokeWidth={3} />
                    </button>
                    <button 
                      onClick={() => deleteBlog(blog.id)}
                      className="p-4 bg-white/5 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg"
                    >
                      <Trash2 size={18} strokeWidth={3} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBlogs.length === 0 && (
          <div className="py-24 text-center uppercase tracking-[0.4em] text-white/20 text-[10px] font-black">
            No stories found in the archives
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={handleReset}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white border border-[#C4141A]/10 p-12 rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10 shrink-0">
                <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-tighter font-black text-[#C4141A]">
                  {editingId ? "Refine Story" : "New Journal Entry"}
                </h2>
                <button onClick={handleReset} className="text-[#C4141A]/20 hover:text-[#C4141A] transition-colors">
                  <X size={40} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-8 custom-scrollbar space-y-16">
                {/* Media Section */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C4141A] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#C4141A]/10 flex items-center justify-center text-[#C4141A]">01</span> Cover Media
                    <div className="h-[1px] flex-1 bg-[#C4141A]/10" />
                  </h3>
                  <div className="relative aspect-video max-w-2xl mx-auto bg-[#C4141A]/5 border-2 border-dashed border-[#C4141A]/10 rounded-3xl flex flex-col items-center justify-center group hover:bg-[#C4141A]/10 transition-all cursor-pointer overflow-hidden">
                    {formData.image ? (
                      <>
                        <img src={formData.image} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-[10px] text-white font-black uppercase tracking-widest">Update Cover</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="text-[#C4141A]/20 mb-4" size={32} />
                        <p className="text-[10px] text-[#C4141A]/20 font-black uppercase tracking-widest">Upload Cover Image</p>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                        <Loader2 className="text-[#C4141A] animate-spin" size={32} />
                      </div>
                    )}
                  </div>
                </section>

                {/* Content Section */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C4141A] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#C4141A]/10 flex items-center justify-center text-[#C4141A]">02</span> Story Content
                    <div className="h-[1px] flex-1 bg-[#C4141A]/10" />
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#C4141A] font-black">Title</label>
                      <input 
                        required
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="THE FUTURE OF LUXURY AUTOMOTIVE..."
                        className="w-full bg-[#C4141A]/5 border border-[#C4141A]/10 p-6 rounded-2xl text-xs uppercase tracking-widest text-[#C4141A] font-black focus:border-[#C4141A] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#C4141A] font-black">Excerpt (Brief Summary)</label>
                      <textarea 
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        rows={2}
                        className="w-full bg-[#C4141A]/5 border border-[#C4141A]/10 p-6 rounded-2xl text-xs uppercase tracking-widest text-[#C4141A] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#C4141A] font-black">Full Article Body</label>
                      <textarea 
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        rows={12}
                        className="w-full bg-[#C4141A]/5 border border-[#C4141A]/10 p-6 rounded-2xl text-xs uppercase tracking-widest text-[#C4141A] outline-none transition-all"
                      />
                    </div>
                  </div>
                </section>

                {/* Metadata Section */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C4141A] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#C4141A]/10 flex items-center justify-center text-[#C4141A]">03</span> Publication Meta
                    <div className="h-[1px] flex-1 bg-[#C4141A]/10" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#C4141A] font-black">Author</label>
                      <input 
                        type="text" 
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="w-full bg-[#C4141A]/5 border border-[#C4141A]/10 p-4 rounded-xl text-[10px] uppercase tracking-widest text-[#C4141A] font-black outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#C4141A] font-black">Category</label>
                      <input 
                        type="text" 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-[#C4141A]/5 border border-[#C4141A]/10 p-4 rounded-xl text-[10px] uppercase tracking-widest text-[#C4141A] font-black outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#C4141A] font-black">Date</label>
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-[#C4141A]/5 border border-[#C4141A]/10 p-4 rounded-xl text-[10px] uppercase tracking-widest text-[#C4141A] font-black outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#C4141A] font-black">Read Time</label>
                      <input 
                        type="text" 
                        value={formData.readTime}
                        onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                        className="w-full bg-[#C4141A]/5 border border-[#C4141A]/10 p-4 rounded-xl text-[10px] uppercase tracking-widest text-[#C4141A] font-black outline-none"
                      />
                    </div>
                  </div>
                </section>

                <div className="flex gap-4 pt-8">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#C4141A] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95"
                  >
                    {editingId ? "Save Changes" : "Publish Story"}
                  </button>
                  <button 
                    type="button"
                    onClick={handleReset}
                    className="px-10 border border-black/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
