"use client";

import { useState } from "react";
import { useSite, HeroSpec, Testimonial } from "@/context/SiteContext";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSettings() {
  const { 
    heroSpecs, testimonials, siteContent,
    addHeroSpec, updateHeroSpec, deleteHeroSpec,
    addTestimonial, updateTestimonial, deleteTestimonial,
    updateSiteContent
  } = useSite();

  const [activeTab, setActiveTab] = useState<"global" | "hero" | "testimonials">("global");

  // Hero Spec Modal State
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [editingSpecId, setEditingSpecId] = useState<string | null>(null);
  const [specForm, setSpecForm] = useState({ label: "", val: "" });

  // Testimonial Modal State
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [testForm, setTestForm] = useState({ name: "", carBought: "", text: "", rating: 5 });

  const handleSpecSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpecId) {
      updateHeroSpec(editingSpecId, specForm);
    } else {
      addHeroSpec(specForm);
    }
    setIsAddingSpec(false);
    setEditingSpecId(null);
    setSpecForm({ label: "", val: "" });
  };

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestId) {
      updateTestimonial(editingTestId, testForm);
    } else {
      addTestimonial(testForm);
    }
    setIsAddingTest(false);
    setEditingTestId(null);
    setTestForm({ name: "", carBought: "", text: "", rating: 5 });
  };

  return (
    <div className="space-y-12">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[
          { id: "global", label: "Global Content" },
          { id: "hero", label: "Hero Specs" },
          { id: "testimonials", label: "Client Voice" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-10 py-6 font-heading font-black uppercase tracking-[0.3em] text-[10px] transition-all relative ${
              activeTab === tab.id ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "global" && siteContent && (
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading text-xl uppercase tracking-[0.4em] font-black text-white">Brand Parameters</h3>
          </div>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); }} 
            className="space-y-12 bg-white/5 border border-white/10 p-12 rounded-[3rem] shadow-2xl backdrop-blur-sm"
          >
            <div className="space-y-8">
              <h4 className="text-white text-[9px] uppercase tracking-[0.5em] font-black">01 Cinematic Messaging</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest text-white font-black">Hero Subtitle</label>
                  <input type="text" value={siteContent.heroSubtitle} onChange={(e) => updateSiteContent({ heroSubtitle: e.target.value })} className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-xs uppercase tracking-widest text-white focus:border-white/40 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest text-white font-black">Hero Title</label>
                  <input type="text" value={siteContent.heroTitle} onChange={(e) => updateSiteContent({ heroTitle: e.target.value })} className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-xs uppercase tracking-widest text-white focus:border-white/40 outline-none transition-all" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-widest text-white font-black">Hero Description</label>
                  <input type="text" value={siteContent.heroDescription} onChange={(e) => updateSiteContent({ heroDescription: e.target.value })} className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-xs uppercase tracking-widest text-white focus:border-white/40 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:col-span-2">
                  <div className="space-y-6">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-white font-black">Hero Portrait Asset</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // 50MB Size Limit Check
                            if (file.size > 50 * 1024 * 1024) {
                              alert("File is too large (Max 50MB). Please compress your video or image.");
                              return;
                            }
                            try {
                              const { uploadFile } = await import("@/lib/supabase");
                              const url = await uploadFile(file, `hero/portrait-${Date.now()}`);
                              updateSiteContent({ heroImage: url });
                            } catch (err) {
                              console.error("Upload failed:", err);
                              alert("Upload failed. Check your Supabase storage quotas.");
                            }
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full h-64 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group-hover:bg-white/10 group-hover:border-white/30 transition-all border-dashed overflow-hidden">
                        {siteContent.heroImage ? (
                          <img src={siteContent.heroImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" alt="Preview" />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-white text-[#A10B1C] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
                            <Plus size={32} strokeWidth={3} />
                          </div>
                        )}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <p className="text-white font-black uppercase tracking-[0.3em] text-xs mb-2">Update Portrait Asset</p>
                          <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Cloud Upload: Max 50MB</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-white font-black">Cinematic Hero Backdrop</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="video/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // 50MB Size Limit Check
                            if (file.size > 50 * 1024 * 1024) {
                              alert("Video is too large (Max 50MB). Please use a shorter or compressed clip.");
                              return;
                            }
                            try {
                              const { uploadFile } = await import("@/lib/supabase");
                              const url = await uploadFile(file, `hero/video-${Date.now()}`);
                              updateSiteContent({ heroVideo: url });
                            } catch (err) {
                              console.error("Upload failed:", err);
                              alert("Upload failed. Check your Supabase storage quotas.");
                            }
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full h-64 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group-hover:bg-white/10 group-hover:border-white/30 transition-all border-dashed overflow-hidden">
                        {siteContent.heroVideo ? (
                          <video src={siteContent.heroVideo} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" muted loop autoPlay />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-white text-[#A10B1C] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
                            <Plus size={32} strokeWidth={3} />
                          </div>
                        )}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <p className="text-white font-black uppercase tracking-[0.3em] text-xs mb-2">Update Cinematic Backdrop</p>
                          <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Cloud Streaming Enabled</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            <div className="space-y-8">
              <h4 className="text-white text-[9px] uppercase tracking-[0.5em] font-black">02 Connection Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest text-white font-black">Phone Number</label>
                  <input type="text" value={siteContent.contactPhone} onChange={(e) => updateSiteContent({ contactPhone: e.target.value })} className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-xs uppercase tracking-widest text-white focus:border-white/40 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest text-white font-black">Email Address</label>
                  <input type="email" value={siteContent.contactEmail} onChange={(e) => updateSiteContent({ contactEmail: e.target.value })} className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-xs uppercase tracking-widest text-white focus:border-white/40 outline-none transition-all" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-widest text-white font-black">Showroom Address</label>
                  <textarea rows={3} value={siteContent.contactAddress} onChange={(e) => updateSiteContent({ contactAddress: e.target.value })} className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-xs uppercase tracking-widest text-white focus:border-white/40 outline-none transition-all resize-none" />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex items-center gap-4 text-[9px] text-white/20 uppercase tracking-[0.3em] font-black">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]" /> Syncing with cloud storage...
            </div>
          </form>
        </div>
      )}

      {activeTab === "hero" && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="font-heading text-xl uppercase tracking-[0.4em] font-black text-white">Cinematic Specs</h3>
            <button 
              onClick={() => {
                setSpecForm({ label: "", val: "" });
                setEditingSpecId(null);
                setIsAddingSpec(true);
              }}
              className="flex items-center gap-3 bg-white text-[#A10B1C] px-8 py-4 rounded-xl font-heading font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl"
            >
              <Plus size={16} strokeWidth={3} /> Inject Spec
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 overflow-x-auto rounded-[3rem] shadow-2xl backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white">
                  <th className="px-10 py-10 font-black">Parameter</th>
                  <th className="px-10 py-10 font-black">Value Metric</th>
                  <th className="px-10 py-10 font-black text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {heroSpecs.map((spec) => (
                  <tr key={spec.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="px-10 py-10 font-black uppercase tracking-widest text-[11px] text-white">{spec.label}</td>
                    <td className="px-10 py-10 text-[11px] uppercase tracking-widest text-white font-black">{spec.val}</td>
                    <td className="px-10 py-10 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => {
                            setSpecForm({ label: spec.label, val: spec.val });
                            setEditingSpecId(spec.id);
                            setIsAddingSpec(true);
                          }}
                          className="p-3 bg-white/5 hover:bg-white text-white/40 hover:text-[#A10B1C] rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteHeroSpec(spec.id)}
                          className="p-3 bg-white/5 hover:bg-red-500 text-white/40 hover:text-white rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {heroSpecs.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-24 text-center uppercase tracking-[0.4em] text-white/20 text-[10px] font-black">No metrics currently defined</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "testimonials" && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="font-heading text-xl uppercase tracking-[0.4em] font-black text-white">Client Experience</h3>
            <button 
              onClick={() => {
                setTestForm({ name: "", carBought: "", text: "", rating: 5 });
                setEditingTestId(null);
                setIsAddingTest(true);
              }}
              className="flex items-center gap-3 bg-white text-[#A10B1C] px-8 py-4 rounded-xl font-heading font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl"
            >
              <Plus size={16} strokeWidth={3} /> Post Review
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 overflow-x-auto rounded-[3rem] shadow-2xl backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white">
                  <th className="px-10 py-10 font-black">Collector</th>
                  <th className="px-10 py-10 font-black">Asset Acquired</th>
                  <th className="px-10 py-10 font-black">Testimony</th>
                  <th className="px-10 py-10 font-black text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {testimonials.map((test) => (
                  <tr key={test.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="px-10 py-10 font-black uppercase tracking-widest text-[11px] text-white">{test.name}</td>
                    <td className="px-10 py-10 text-[11px] uppercase tracking-widest text-white font-black">{test.carBought}</td>
                    <td className="px-10 py-10 text-[11px] text-white/60 max-w-xs truncate font-medium">{test.text}</td>
                    <td className="px-10 py-10 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => {
                            setTestForm({ name: test.name, carBought: test.carBought, text: test.text, rating: test.rating });
                            setEditingTestId(test.id);
                            setIsAddingTest(true);
                          }}
                          className="p-3 bg-white/5 hover:bg-white text-white/40 hover:text-[#A10B1C] rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteTestimonial(test.id)}
                          className="p-3 bg-white/5 hover:bg-red-500 text-white/40 hover:text-white rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {testimonials.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-24 text-center uppercase tracking-[0.4em] text-white/20 text-[10px] font-black">The voice of our clients will resonate here</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hero Spec Modal */}
      <AnimatePresence>
        {isAddingSpec && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsAddingSpec(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white border border-white/20 p-12 rounded-[3rem] shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-heading text-2xl uppercase tracking-tighter font-black text-black">
                  {editingSpecId ? "Modify Spec" : "Inject Spec"}
                </h2>
                <button onClick={() => setIsAddingSpec(false)} className="text-black/20 hover:text-black transition-colors"><X size={28} /></button>
              </div>
              <form onSubmit={handleSpecSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-black">Metric Label</label>
                  <input required type="text" value={specForm.label} onChange={(e) => setSpecForm({...specForm, label: e.target.value})} placeholder="E.G. ENGINE" className="w-full bg-black/5 border border-black/10 p-5 rounded-xl text-xs uppercase tracking-widest focus:border-black/40 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-black">Metric Value</label>
                  <input required type="text" value={specForm.val} onChange={(e) => setSpecForm({...specForm, val: e.target.value})} placeholder="E.G. V8 TWIN TURBO" className="w-full bg-black/5 border border-black/10 p-5 rounded-xl text-xs uppercase tracking-widest focus:border-black/40 outline-none transition-all" />
                </div>
                <button type="submit" className="w-full bg-[#A10B1C] text-white py-6 rounded-xl font-heading font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3">
                  <Check size={20} /> AUTHORIZE METRIC
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {isAddingTest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsAddingTest(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white border border-white/20 p-12 rounded-[3rem] shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-heading text-2xl uppercase tracking-tighter font-black text-black">
                  {editingTestId ? "Edit Testimony" : "New Testimony"}
                </h2>
                <button onClick={() => setIsAddingTest(false)} className="text-black/20 hover:text-black transition-colors"><X size={28} /></button>
              </div>
              <form onSubmit={handleTestSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-black/40 font-black">Collector Name</label>
                    <input required type="text" value={testForm.name} onChange={(e) => setTestForm({...testForm, name: e.target.value})} placeholder="RAHUL SHARMA" className="w-full bg-black/5 border border-black/10 p-5 rounded-xl text-xs uppercase tracking-widest focus:border-black/40 outline-none transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-black/40 font-black">Asset Acquired</label>
                    <input required type="text" value={testForm.carBought} onChange={(e) => setTestForm({...testForm, carBought: e.target.value})} placeholder="TATA SAFARI" className="w-full bg-black/5 border border-black/10 p-5 rounded-xl text-xs uppercase tracking-widest focus:border-black/40 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-black">Review Testimony</label>
                  <textarea required rows={4} value={testForm.text} onChange={(e) => setTestForm({...testForm, text: e.target.value})} placeholder="WRITE THE TESTIMONY HERE..." className="w-full bg-black/5 border border-black/10 p-5 rounded-xl text-xs uppercase tracking-widest focus:border-black/40 outline-none transition-all resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#A10B1C] text-white py-6 rounded-xl font-heading font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3">
                  <Check size={20} /> PUBLISH VOICE
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
