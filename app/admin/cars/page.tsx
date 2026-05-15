"use client";

import { useState, useEffect } from "react";
import { useCars, Car } from "@/context/CarContext";
import { Plus, Trash2, Edit2, X, Check, Search, Upload, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadFile } from "@/lib/supabase";

export default function AdminCars() {
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    images: [] as string[],
    videos: [] as string[],
    description: "",
    // Specs
    make: "",
    model: "",
    variant: "",
    year: new Date().getFullYear().toString(),
    makeMonth: "January",
    owner: "1st",
    color: "",
    fuel: "Petrol",
    transmission: "Automatic",
    insuranceType: "Comprehensive",
    registrationPlace: "",
    numberPlate: "",
    kmsDriven: "",
    engineCapacity: "",
    location: "",
    postingDate: new Date().toISOString().split('T')[0],
    // Features
    powerSteering: false,
    cruiseControl: false,
    navigationSystem: false,
    adjustableSteering: false,
    airConditioning: "Automatic",
    powerWindows: "Front & Rear",
    sunroof: false,
    alloyWheels: false,
    adjustableMirror: "Electric",
    bluetooth: false,
    amFmRadio: false,
    usbCompatibility: false,
    auxCompatibility: false,
    abs: false,
    antiTheftDevice: false,
    rearParkingCamera: false,
    parkingSensors: false,
    lockSystem: "Remote Central",
    numberOfAirbags: "2",
    // Condition
    battery: "New",
    tyre: "New",
    serviceHistory: "Available",
    vehicleCertified: "Yes",
    accidental: "No",
    // Services
    finance: false,
    exchange: false,
    showOnHome: true
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleReset = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      images: [],
      videos: [],
      description: "",
      make: "",
      model: "",
      variant: "",
      year: new Date().getFullYear().toString(),
      makeMonth: "January",
      owner: "1st",
      color: "",
      fuel: "Petrol",
      transmission: "Automatic",
      insuranceType: "Comprehensive",
      registrationPlace: "",
      numberPlate: "",
      kmsDriven: "",
      engineCapacity: "",
      location: "",
      postingDate: new Date().toISOString().split('T')[0],
      powerSteering: false,
      cruiseControl: false,
      navigationSystem: false,
      adjustableSteering: false,
      airConditioning: "Automatic",
      powerWindows: "Front & Rear",
      sunroof: false,
      alloyWheels: false,
      adjustableMirror: "Electric",
      bluetooth: false,
      amFmRadio: false,
      usbCompatibility: false,
      auxCompatibility: false,
      abs: false,
      antiTheftDevice: false,
      rearParkingCamera: false,
      parkingSensors: false,
      lockSystem: "Remote Central",
      numberOfAirbags: "2",
      battery: "New",
      tyre: "New",
      serviceHistory: "Available",
      vehicleCertified: "Yes",
      accidental: "No",
      finance: false,
      exchange: false,
      showOnHome: true
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const carData = {
      name: formData.name.trim() || `${formData.make} ${formData.model} ${formData.variant}`.trim(),
      price: formData.price,
      image: formData.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      images: formData.images,
      videos: formData.videos,
      description: formData.description,
      specs: {
        make: formData.make,
        model: formData.model,
        variant: formData.variant,
        year: formData.year,
        makeMonth: formData.makeMonth,
        owner: formData.owner,
        color: formData.color,
        fuel: formData.fuel,
        transmission: formData.transmission,
        insuranceType: formData.insuranceType,
        registrationPlace: formData.registrationPlace,
        numberPlate: formData.numberPlate,
        kmsDriven: formData.kmsDriven,
        engineCapacity: formData.engineCapacity,
        location: formData.location,
        postingDate: formData.postingDate
      },
      features: {
        powerSteering: formData.powerSteering,
        cruiseControl: formData.cruiseControl,
        navigationSystem: formData.navigationSystem,
        adjustableSteering: formData.adjustableSteering,
        airConditioning: formData.airConditioning,
        powerWindows: formData.powerWindows,
        sunroof: formData.sunroof,
        alloyWheels: formData.alloyWheels,
        adjustableMirror: formData.adjustableMirror,
        bluetooth: formData.bluetooth,
        amFmRadio: formData.amFmRadio,
        usbCompatibility: formData.usbCompatibility,
        auxCompatibility: formData.auxCompatibility,
        abs: formData.abs,
        antiTheftDevice: formData.antiTheftDevice,
        rearParkingCamera: formData.rearParkingCamera,
        parkingSensors: formData.parkingSensors,
        lockSystem: formData.lockSystem,
        numberOfAirbags: formData.numberOfAirbags
      },
      condition: {
        battery: formData.battery,
        tyre: formData.tyre,
        serviceHistory: formData.serviceHistory,
        vehicleCertified: formData.vehicleCertified,
        accidental: formData.accidental
      },
      services: {
        finance: formData.finance,
        exchange: formData.exchange
      },
      showOnHome: formData.showOnHome
    };

    if (editingId) {
      updateCar(editingId, carData);
    } else {
      addCar(carData);
    }
    handleReset();
  };

  const handleEdit = (car: Car) => {
    setFormData({
      name: car.name,
      price: car.price,
      image: car.image,
      images: car.images || [],
      videos: car.videos || [],
      description: car.description || "",
      // Specs
      make: car.specs.make || "",
      model: car.specs.model || "",
      variant: car.specs.variant || "",
      year: car.specs.year || "",
      makeMonth: car.specs.makeMonth || "January",
      owner: car.specs.owner || "1st",
      color: car.specs.color || "",
      fuel: car.specs.fuel,
      transmission: car.specs.transmission,
      insuranceType: car.specs.insuranceType || "Comprehensive",
      registrationPlace: car.specs.registrationPlace || "",
      numberPlate: car.specs.numberPlate || "",
      kmsDriven: car.specs.kmsDriven || "",
      engineCapacity: car.specs.engineCapacity || "",
      location: car.specs.location || "",
      postingDate: car.specs.postingDate || new Date().toISOString().split('T')[0],
      // Features
      powerSteering: car.features?.powerSteering || false,
      cruiseControl: car.features?.cruiseControl || false,
      navigationSystem: car.features?.navigationSystem || false,
      adjustableSteering: car.features?.adjustableSteering || false,
      airConditioning: car.features?.airConditioning || "Automatic",
      powerWindows: car.features?.powerWindows || "Front & Rear",
      sunroof: car.features?.sunroof || false,
      alloyWheels: car.features?.alloyWheels || false,
      adjustableMirror: car.features?.adjustableMirror || "Electric",
      bluetooth: car.features?.bluetooth || false,
      amFmRadio: car.features?.amFmRadio || false,
      usbCompatibility: car.features?.usbCompatibility || false,
      auxCompatibility: car.features?.auxCompatibility || false,
      abs: car.features?.abs || false,
      antiTheftDevice: car.features?.antiTheftDevice || false,
      rearParkingCamera: car.features?.rearParkingCamera || false,
      parkingSensors: car.features?.parkingSensors || false,
      lockSystem: car.features?.lockSystem || "Remote Central",
      numberOfAirbags: car.features?.numberOfAirbags || "2",
      // Condition
      battery: car.condition?.battery || "New",
      tyre: car.condition?.tyre || "New",
      serviceHistory: car.condition?.serviceHistory || "Available",
      vehicleCertified: car.condition?.vehicleCertified || "Yes",
      accidental: car.condition?.accidental || "No",
      // Services
      finance: car.services?.finance || false,
      exchange: car.services?.exchange || false,
      showOnHome: car.showOnHome ?? true
    });
    setEditingId(car.id);
    setIsAdding(true);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (file.size > MAX_SIZE) {
          return { error: `File "${file.name}" exceeds 50MB limit.` };
        }
        try {
          const path = `gallery_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
          const url = await uploadFile(file, path);
          return { url, type: file.type };
        } catch (err) {
          return { error: `Failed to upload "${file.name}"` };
        }
      });

      const results = await Promise.all(uploadPromises);
      
      const newImages: string[] = [];
      const newVideos: string[] = [];
      const errors: string[] = [];

      results.forEach(res => {
        if (!res) return;
        
        if ('error' in res && res.error) {
          errors.push(res.error);
        } else if ('url' in res && res.type && res.type.startsWith('image/')) {
          newImages.push(res.url);
        } else if ('url' in res && res.type && res.type.startsWith('video/')) {
          newVideos.push(res.url);
        }
      });

      if (errors.length > 0) {
        alert(`Some files failed to upload:\n${errors.join('\n')}`);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages],
        videos: [...prev.videos, ...newVideos]
      }));
    } catch (error) {
      console.error("Batch upload failed:", error);
      alert("An error occurred during bulk upload. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset input value so same files can be re-selected if needed
      e.target.value = '';
    }
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("Main image exceeds 50MB limit.");
        return;
      }
      setIsUploading(true);
      try {
        const path = `main_${Date.now()}_${file.name}`;
        const url = await uploadFile(file, path);
        setFormData(prev => ({ ...prev, image: url }));
      } catch (error) {
        console.error("Main image upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH ASSETS..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest text-white placeholder:text-white/60 focus:border-white/60 outline-none transition-all rounded-xl"
          />
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-3 bg-white text-[#B31B1B] px-10 py-5 rounded-2xl font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          <Plus size={18} strokeWidth={4} /> Post New Car
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 overflow-x-auto rounded-3xl backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white">
              <th className="px-8 py-8 font-black">Premium Asset</th>
              <th className="px-8 py-8 font-black">Market Price</th>
              <th className="px-8 py-8 font-black">Key Specs</th>
              <th className="px-8 py-8 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredCars.map((car) => (
              <tr key={car.id} className="group hover:bg-white/10 transition-all duration-300">
                <td className="px-8 py-10">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-16 bg-black/40 border border-white/20 overflow-hidden rounded-xl shadow-lg relative">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.12] transition-all duration-500 origin-top-left" />
                      <div className="absolute bottom-0.5 right-0.5 w-4 h-4 z-10 pointer-events-none drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
                        <img src="/omindlogo.png" alt="OM Logo" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black uppercase tracking-widest text-[12px] text-white group-hover:text-white transition-colors">{car.name}</span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white font-black mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">{car.specs.location || 'Visakhapatnam'}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-10">
                  <span className="text-white font-bold tracking-widest text-sm drop-shadow-sm">₹ {car.price.replace(/[₹]/g, "").trim()}</span>
                </td>
                <td className="px-8 py-10">
                  <div className="flex gap-3">
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-white rounded-lg group-hover:bg-white/20 transition-all">{car.specs.fuel}</span>
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-white rounded-lg group-hover:bg-white/20 transition-all">{car.specs.transmission}</span>
                  </div>
                </td>
                <td className="px-8 py-10 text-right">
                  <div className="flex justify-end gap-4">
                    <button 
                      onClick={() => handleEdit(car)}
                      className="p-4 bg-white/5 hover:bg-white text-white hover:text-[#B31B1B] rounded-xl transition-all hover:scale-110 hover:rotate-3 shadow-lg active:scale-95"
                    >
                      <Edit2 size={18} strokeWidth={3} />
                    </button>
                    <button 
                      onClick={() => deleteCar(car.id)}
                      className="p-4 bg-white/5 hover:bg-red-500 text-white rounded-xl transition-all hover:scale-110 hover:-rotate-3 shadow-lg active:scale-95"
                    >
                      <Trash2 size={18} strokeWidth={3} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCars.length === 0 && (
          <div className="py-24 text-center uppercase tracking-[0.4em] text-white/20 text-[10px] font-black">
            No assets found in current collection
          </div>
        )}
      </div>

      {/* Add/Edit Modal Overlay */}
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
              className="relative w-full max-w-5xl bg-white border border-[#B31B1B]/10 p-12 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10 shrink-0">
                <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-tighter font-black text-[#B31B1B]">
                  {editingId ? "Refine Asset" : "Post New Car"}
                </h2>
                <button onClick={handleReset} className="text-[#B31B1B]/20 hover:text-[#B31B1B] transition-colors">
                  <X size={40} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-8 custom-scrollbar space-y-20">
                {/* Image Upload Section */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#B31B1B] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#B31B1B]/10 flex items-center justify-center text-[#B31B1B]">01</span> Media Gallery
                    <div className="h-[1px] flex-1 bg-[#B31B1B]/10" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-[#B31B1B] font-black">Display Photo *</label>
                      <div className="relative aspect-video bg-[#B31B1B]/5 border-2 border-dashed border-[#B31B1B]/10 rounded-2xl flex flex-col items-center justify-center group hover:bg-[#B31B1B]/10 hover:border-[#B31B1B]/30 transition-all cursor-pointer overflow-hidden">
                        {formData.image ? (
                          <>
                            <img src={formData.image} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-[10px] text-white font-black uppercase tracking-widest">Update Photo</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="text-[#B31B1B]/20 mb-4" size={32} />
                            <p className="text-[10px] text-[#B31B1B]/20 font-black uppercase tracking-widest">Click to upload</p>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleMainImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={isUploading}
                        />
                        {isUploading && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                            <Loader2 className="text-[#B31B1B] animate-spin" size={32} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 md:col-span-2">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-[#B31B1B] font-black">
                        Media Library ({formData.images.length + formData.videos.length})
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {/* Images */}
                        {formData.images.map((img, i) => (
                          <div key={`img-${i}`} className="relative aspect-square bg-[#B31B1B]/5 border border-[#B31B1B]/10 rounded-2xl overflow-hidden group shadow-lg">
                            <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                              className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
                            >
                              <Trash2 size={20} />
                              <span className="text-[8px] font-black uppercase tracking-widest">Remove Photo</span>
                            </button>
                          </div>
                        ))}

                        {/* Videos */}
                        {formData.videos.map((vid, i) => (
                          <div key={`vid-${i}`} className="relative aspect-square bg-black border border-[#B31B1B]/20 rounded-2xl overflow-hidden group shadow-xl">
                            <video src={vid} className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <Plus size={20} className="rotate-45" />
                              </div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, videos: prev.videos.filter((_, idx) => idx !== i) }))}
                              className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
                            >
                              <Trash2 size={20} />
                              <span className="text-[8px] font-black uppercase tracking-widest">Remove Video</span>
                            </button>
                          </div>
                        ))}
                        
                        {/* Add Button */}
                        {(formData.images.length + formData.videos.length) < 40 && (
                          <label className={`relative aspect-square bg-[#B31B1B]/5 border-2 border-dashed border-[#B31B1B]/10 rounded-2xl flex flex-col items-center justify-center hover:bg-[#B31B1B]/10 hover:border-[#B31B1B]/30 transition-all cursor-pointer group ${isUploading ? 'pointer-events-none' : ''}`}>
                            <div className="w-12 h-12 rounded-full bg-[#B31B1B]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              {isUploading ? (
                                <Loader2 className="text-[#B31B1B] animate-spin" size={20} />
                              ) : (
                                <Upload className="text-[#B31B1B]" size={20} />
                              )}
                            </div>
                            <p className="text-[8px] text-[#B31B1B]/40 font-black uppercase tracking-widest text-center">
                              {isUploading ? "Uploading..." : "Add Photos or Videos"}
                            </p>
                            <input 
                              type="file" 
                              multiple 
                              accept="image/*,video/*"
                              onChange={handleMediaUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              disabled={isUploading}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Key Specifications */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#B31B1B]/40 mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#B31B1B]/10 flex items-center justify-center text-[#B31B1B]">02</span> Core Specifications
                    <div className="h-[1px] flex-1 bg-[#B31B1B]/10" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="space-y-3 md:col-span-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Asset Display Name (USED IN CUSTOMER VIEW)</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder={`${formData.make} ${formData.model} ${formData.variant}`.trim() || "E.G. SKODA RAPID"}
                          className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] font-black focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                        />
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, name: `${formData.make} ${formData.model} ${formData.variant}`.trim()})}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase tracking-widest text-[#B31B1B]/40 hover:text-[#B31B1B] transition-colors"
                        >
                          Reset to Specs
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Brand / Make *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.make}
                        onChange={(e) => setFormData({...formData, make: e.target.value})}
                        placeholder="E.G. BMW"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Model *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        placeholder="E.G. X5"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Variant</label>
                      <input 
                        type="text" 
                        value={formData.variant}
                        onChange={(e) => setFormData({...formData, variant: e.target.value})}
                        placeholder="E.G. X5 M SPORT"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Market Value *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="E.G. ₹ 85,00,000"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Make Month</label>
                      <select 
                        value={formData.makeMonth}
                        onChange={(e) => setFormData({...formData, makeMonth: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                          <option key={month} value={month} className="bg-white text-[#B31B1B]">{month}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Manufacturing Year</label>
                      <select 
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        {Array.from({length: 20}, (_, i) => 2024 - i).map(year => (
                          <option key={year} value={year} className="bg-white text-[#B31B1B]">{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Energy Type</label>
                      <select 
                        value={formData.fuel}
                        onChange={(e) => setFormData({...formData, fuel: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Petrol" className="bg-white text-[#B31B1B]">Petrol</option>
                        <option value="Diesel" className="bg-white text-[#B31B1B]">Diesel</option>
                        <option value="Electric" className="bg-white text-[#B31B1B]">Electric</option>
                        <option value="Hybrid" className="bg-white text-[#B31B1B]">Hybrid</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Transmission</label>
                      <select 
                        value={formData.transmission}
                        onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Automatic" className="bg-white text-[#B31B1B]">Automatic</option>
                        <option value="Manual" className="bg-white text-[#B31B1B]">Manual</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Ownership History</label>
                      <select 
                        value={formData.owner}
                        onChange={(e) => setFormData({...formData, owner: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="1st Owner" className="bg-white text-[#B31B1B]">1st Owner</option>
                        <option value="2nd Owner" className="bg-white text-[#B31B1B]">2nd Owner</option>
                        <option value="3rd Owner" className="bg-white text-[#B31B1B]">3rd Owner</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Exterior Hue</label>
                      <input 
                        type="text" 
                        value={formData.color}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                        placeholder="E.G. PHANTOM BLACK"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Distance Logged *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.kmsDriven}
                        onChange={(e) => setFormData({...formData, kmsDriven: e.target.value})}
                        placeholder="E.G. 12,000 KM"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Administrative Data */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#B31B1B] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#B31B1B]/10 flex items-center justify-center text-[#B31B1B]">03</span> Legal & Admin
                    <div className="h-[1px] flex-1 bg-[#B31B1B]/10" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Insurance Status</label>
                      <select 
                        value={formData.insuranceType}
                        onChange={(e) => setFormData({...formData, insuranceType: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Comprehensive" className="bg-white text-[#B31B1B]">Comprehensive</option>
                        <option value="Third Party" className="bg-white text-[#B31B1B]">Third Party</option>
                        <option value="Zero Dep" className="bg-white text-[#B31B1B]">Zero Dep</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Registration Authority</label>
                      <input 
                        type="text" 
                        value={formData.registrationPlace}
                        onChange={(e) => setFormData({...formData, registrationPlace: e.target.value})}
                        placeholder="E.G. AP 31"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Identity Plate</label>
                      <input 
                        type="text" 
                        value={formData.numberPlate}
                        onChange={(e) => setFormData({...formData, numberPlate: e.target.value})}
                        placeholder="E.G. AP 31 XX 0000"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Engine Displacement</label>
                      <input 
                        type="text" 
                        value={formData.engineCapacity}
                        onChange={(e) => setFormData({...formData, engineCapacity: e.target.value})}
                        placeholder="E.G. 1998 CC"
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Features & Comfort */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#B31B1B] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#B31B1B]/10 flex items-center justify-center text-[#B31B1B]">04</span> Features & Comfort
                    <div className="h-[1px] flex-1 bg-[#B31B1B]/10" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                    {[
                      { id: "powerSteering", label: "Power Steering" },
                      { id: "cruiseControl", label: "Cruise Control" },
                      { id: "navigationSystem", label: "Navigation" },
                      { id: "adjustableSteering", label: "Adj. Steering" },
                      { id: "sunroof", label: "Sunroof" },
                      { id: "alloyWheels", label: "Alloy Wheels" },
                      { id: "bluetooth", label: "Bluetooth" },
                      { id: "amFmRadio", label: "AM/FM Radio" },
                      { id: "usbCompatibility", label: "USB" },
                      { id: "auxCompatibility", label: "AUX" },
                      { id: "abs", label: "ABS" },
                      { id: "antiTheftDevice", label: "Anti-Theft" },
                      { id: "rearParkingCamera", label: "Rear Camera" },
                      { id: "parkingSensors", label: "Parking Sensors" },
                    ].map(feat => (
                      <label key={feat.id} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={!!(formData as Record<string, any>)[feat.id]}
                            onChange={(e) => setFormData({...formData, [feat.id]: e.target.checked})}
                            className="peer sr-only"
                          />
                           <div className="w-7 h-7 border-2 border-[#B31B1B]/20 bg-[#B31B1B]/5 peer-checked:bg-[#B31B1B] peer-checked:border-[#B31B1B] rounded-lg transition-all" />
                          <Check className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1.5" size={28} strokeWidth={4} />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-black text-[#B31B1B] group-hover:text-[#B31B1B] transition-colors">{feat.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Dropdown Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 pt-12 border-t border-[#B31B1B]/5">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Air Conditioning</label>
                      <select 
                        value={formData.airConditioning}
                        onChange={(e) => setFormData({...formData, airConditioning: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Manual" className="bg-white text-[#B31B1B]">Manual</option>
                        <option value="Automatic" className="bg-white text-[#B31B1B]">Automatic</option>
                        <option value="Dual Zone" className="bg-white text-[#B31B1B]">Dual Zone</option>
                        <option value="None" className="bg-white text-[#B31B1B]">None</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Power Windows</label>
                      <select 
                        value={formData.powerWindows}
                        onChange={(e) => setFormData({...formData, powerWindows: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Front Only" className="bg-white text-[#B31B1B]">Front Only</option>
                        <option value="Front & Rear" className="bg-white text-[#B31B1B]">Front & Rear</option>
                        <option value="None" className="bg-white text-[#B31B1B]">None</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Adjustable Mirror</label>
                      <select 
                        value={formData.adjustableMirror}
                        onChange={(e) => setFormData({...formData, adjustableMirror: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Manual" className="bg-white text-[#B31B1B]">Manual</option>
                        <option value="Electric" className="bg-white text-[#B31B1B]">Electric</option>
                        <option value="Auto-Folding" className="bg-white text-[#B31B1B]">Auto-Folding</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Lock System</label>
                      <select 
                        value={formData.lockSystem}
                        onChange={(e) => setFormData({...formData, lockSystem: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Manual" className="bg-white text-[#B31B1B]">Manual</option>
                        <option value="Central" className="bg-white text-[#B31B1B]">Central</option>
                        <option value="Remote Central" className="bg-white text-[#B31B1B]">Remote Central</option>
                        <option value="Keyless Entry" className="bg-white text-[#B31B1B]">Keyless Entry</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Airbags</label>
                      <select 
                        value={formData.numberOfAirbags}
                        onChange={(e) => setFormData({...formData, numberOfAirbags: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        {[0, 1, 2, 4, 6, 8, 10].map(n => (
                          <option key={n} value={n.toString()} className="bg-white text-[#B31B1B]">{n} Airbags</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* Asset Condition */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#B31B1B] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#B31B1B]/10 flex items-center justify-center text-[#B31B1B]">05</span> Asset Condition
                    <div className="h-[1px] flex-1 bg-[#B31B1B]/10" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Battery Health</label>
                      <select 
                        value={formData.battery}
                        onChange={(e) => setFormData({...formData, battery: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="New" className="bg-white text-[#B31B1B]">New</option>
                        <option value="Excellent" className="bg-white text-[#B31B1B]">Excellent</option>
                        <option value="Good" className="bg-white text-[#B31B1B]">Good</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Tyre Tread</label>
                      <select 
                        value={formData.tyre}
                        onChange={(e) => setFormData({...formData, tyre: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="New" className="bg-white text-[#B31B1B]">New</option>
                        <option value="80% +" className="bg-white text-[#B31B1B]">80% +</option>
                        <option value="50% +" className="bg-white text-[#B31B1B]">50% +</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Service History</label>
                      <select 
                        value={formData.serviceHistory}
                        onChange={(e) => setFormData({...formData, serviceHistory: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Available" className="bg-white text-[#B31B1B]">Available</option>
                        <option value="Not Available" className="bg-white text-[#B31B1B]">Not Available</option>
                        <option value="Partial" className="bg-white text-[#B31B1B]">Partial</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Vehicle Certified</label>
                      <select 
                        value={formData.vehicleCertified}
                        onChange={(e) => setFormData({...formData, vehicleCertified: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="Yes" className="bg-white text-[#B31B1B]">Yes</option>
                        <option value="No" className="bg-white text-[#B31B1B]">No</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Accidental History</label>
                      <select 
                        value={formData.accidental}
                        onChange={(e) => setFormData({...formData, accidental: e.target.value})}
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-5 rounded-xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all appearance-none"
                      >
                        <option value="No" className="bg-white text-[#B31B1B]">No</option>
                        <option value="Yes" className="bg-white text-[#B31B1B]">Yes</option>
                        <option value="Minor Scratches" className="bg-white text-[#B31B1B]">Minor Scratches</option>
                      </select>
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[9px] uppercase tracking-widest text-[#B31B1B] font-black">Executive Description</label>
                      <textarea 
                        rows={5}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="ENTER COMPREHENSIVE ASSET NARRATIVE..."
                        className="w-full bg-[#B31B1B]/5 border border-[#B31B1B]/10 p-6 rounded-2xl text-xs uppercase tracking-widest text-[#B31B1B] focus:border-[#B31B1B]/40 outline-none transition-all resize-none placeholder:text-[#B31B1B]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Available Services */}
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#B31B1B] mb-10 flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-[#B31B1B]/10 flex items-center justify-center text-[#B31B1B]">06</span> Available Services
                    <div className="h-[1px] flex-1 bg-[#B31B1B]/10" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <label className="flex items-center gap-6 p-8 bg-[#B31B1B]/5 border border-[#B31B1B]/10 rounded-2xl cursor-pointer group hover:bg-[#B31B1B]/10 transition-all">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={!!formData.finance}
                          onChange={(e) => setFormData({...formData, finance: e.target.checked})}
                          className="peer sr-only"
                        />
                        <div className="w-8 h-8 border-2 border-[#B31B1B]/20 bg-[#B31B1B]/5 peer-checked:bg-[#B31B1B] peer-checked:border-[#B31B1B] rounded-xl transition-all" />
                        <Check className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-2" size={32} strokeWidth={4} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest font-black text-[#B31B1B]">Finance Available</span>
                        <span className="text-[9px] uppercase tracking-wider text-[#B31B1B]/40 mt-1">ENABLE LOW INTEREST EMI OPTIONS</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-6 p-8 bg-[#B31B1B]/5 border border-[#B31B1B]/10 rounded-2xl cursor-pointer group hover:bg-[#B31B1B]/10 transition-all">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={!!formData.exchange}
                          onChange={(e) => setFormData({...formData, exchange: e.target.checked})}
                          className="peer sr-only"
                        />
                        <div className="w-8 h-8 border-2 border-[#B31B1B]/20 bg-[#B31B1B]/5 peer-checked:bg-[#B31B1B] peer-checked:border-[#B31B1B] rounded-xl transition-all" />
                        <Check className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-2" size={32} strokeWidth={4} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest font-black text-[#B31B1B]">Exchange Available</span>
                        <span className="text-[9px] uppercase tracking-wider text-[#B31B1B]/40 mt-1">ENABLE VEHICLE SWAP OPTIONS</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-6 p-8 bg-[#B31B1B]/5 border border-[#B31B1B]/10 rounded-2xl cursor-pointer group hover:bg-[#B31B1B]/10 transition-all">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={!!formData.showOnHome}
                          onChange={(e) => setFormData({...formData, showOnHome: e.target.checked})}
                          className="peer sr-only"
                        />
                        <div className="w-8 h-8 border-2 border-[#B31B1B]/20 bg-[#B31B1B]/5 peer-checked:bg-[#B31B1B] peer-checked:border-[#B31B1B] rounded-xl transition-all" />
                        <Check className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-2" size={32} strokeWidth={4} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest font-black text-[#B31B1B]">Show on Homepage</span>
                        <span className="text-[9px] uppercase tracking-wider text-[#B31B1B]/40 mt-1">FEATURE THIS ASSET ON LANDING PAGE</span>
                      </div>
                    </label>
                  </div>
                </section>

                <div className="pt-10 shrink-0 pb-10">
                  <button 
                    type="submit"
                    className="w-full bg-[#B31B1B] text-white py-8 rounded-2xl font-heading font-black uppercase tracking-[0.4em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-6 shadow-[0_20px_50px_rgba(179,27,27,0.3)]"
                  >
                    {editingId ? "Update Asset" : "Post New Car"} <Check size={28} strokeWidth={4} />
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
