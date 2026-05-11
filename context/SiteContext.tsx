"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HeroSpec {
  id: string;
  label: string;
  val: string;
}

export interface Testimonial {
  id: string;
  name: string;
  carBought: string;
  text: string;
  rating: number;
}

export interface SiteContent {
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  heroVideo: string;
  heroImage: string;
}

interface SiteContextType {
  heroSpecs: HeroSpec[];
  testimonials: Testimonial[];
  siteContent: SiteContent;
  addHeroSpec: (spec: Omit<HeroSpec, "id">) => void;
  updateHeroSpec: (id: string, spec: Partial<HeroSpec>) => void;
  deleteHeroSpec: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  isLoaded: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const INITIAL_HERO_SPECS: HeroSpec[] = [];

const INITIAL_SITE_CONTENT: SiteContent = {
  heroSubtitle: "Explore Car Collection",
  heroTitle: "OM Indian Cars",
  heroDescription: "Drive the Pride of India. Premium Pre-owned Assets.",
  contactAddress: "Akkayyapalem, Visakhapatnam",
  contactPhone: "+91 92466 20555",
  contactEmail: "concierge@omindiancars.com",
  heroVideo: "/VID_20260505_052351_976.mp4",
  heroImage: "/hero-bg.png"
};

const INITIAL_TESTIMONIALS: Testimonial[] = [];

import { supabase } from "@/lib/supabase";

// ... [interfaces stay same] ...

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [heroSpecs, setHeroSpecs] = useState<HeroSpec[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchSiteData = async () => {
      console.log("SiteContext: Initializing data fetch...");
      try {
        if (!supabase) {
          console.warn("Supabase client not initialized.");
          setIsLoaded(true);
          return;
        }

        // Fetch Site Settings with a timeout-like behavior
        const fetchSettings = supabase.from('site_settings').select('*').eq('id', 'main').single();
        const { data: settingsData, error: settingsError } = await fetchSettings;
        
        if (settingsError && settingsError.code === 'PGRST116') {
          console.log("SiteContext: Creating initial settings record...");
          await supabase.from('site_settings').insert([{ 
            id: 'main', 
            hero_subtitle: INITIAL_SITE_CONTENT.heroSubtitle,
            hero_title: INITIAL_SITE_CONTENT.heroTitle,
            hero_description: INITIAL_SITE_CONTENT.heroDescription,
            contact_address: INITIAL_SITE_CONTENT.contactAddress,
            contact_phone: INITIAL_SITE_CONTENT.contactPhone,
            contact_email: INITIAL_SITE_CONTENT.contactEmail,
            hero_video: INITIAL_SITE_CONTENT.heroVideo,
            hero_image: INITIAL_SITE_CONTENT.heroImage
          }]);
        }

        if (settingsData) {
          console.log("SiteContext: Settings loaded from Supabase");
          setSiteContent({
            heroSubtitle: settingsData.hero_subtitle || INITIAL_SITE_CONTENT.heroSubtitle,
            heroTitle: settingsData.hero_title || INITIAL_SITE_CONTENT.heroTitle,
            heroDescription: settingsData.hero_description || INITIAL_SITE_CONTENT.heroDescription,
            contactAddress: settingsData.contact_address || INITIAL_SITE_CONTENT.contactAddress,
            contactPhone: settingsData.contact_phone || INITIAL_SITE_CONTENT.contactPhone,
            contactEmail: settingsData.contact_email || INITIAL_SITE_CONTENT.contactEmail,
            heroVideo: settingsData.hero_video || INITIAL_SITE_CONTENT.heroVideo,
            heroImage: settingsData.hero_image || INITIAL_SITE_CONTENT.heroImage
          });
        } else {
          // If no settings in DB (and insert failed or still loading), try migrating from localStorage or use initial
          const localContent = localStorage.getItem("om_site_content");
          if (localContent) {
            const parsed = JSON.parse(localContent);
            setSiteContent(parsed);
          }
        }

        // Fetch Hero Specs
        const { data: specsData } = await supabase.from('hero_specs').select('*').order('created_at', { ascending: true });
        if (specsData && specsData.length > 0) {
          setHeroSpecs(specsData);
        } else {
          const localSpecs = localStorage.getItem("om_hero_specs");
          if (localSpecs) {
            const parsed = JSON.parse(localSpecs);
            setHeroSpecs(parsed);
            // Migrate to Supabase
            parsed.forEach((s: any) => supabase.from('hero_specs').insert([{ label: s.label, val: s.val }]).then());
          } else {
            setHeroSpecs(INITIAL_HERO_SPECS);
          }
        }

        // Fetch Testimonials
        const { data: testsData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (testsData && testsData.length > 0) {
          setTestimonials(testsData.map(t => ({
            ...t,
            carBought: t.car_bought
          })));
        } else {
          const localTests = localStorage.getItem("om_testimonials");
          if (localTests) {
            const parsed = JSON.parse(localTests);
            setTestimonials(parsed);
            // Migrate to Supabase
            parsed.forEach((t: any) => supabase.from('testimonials').insert([{ 
              name: t.name, car_bought: t.carBought, text: t.text, rating: t.rating 
            }]).then());
          } else {
            setTestimonials(INITIAL_TESTIMONIALS);
          }
        }

        // Real-time subscription for live updates
        supabase
          .channel('site_settings_changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'site_settings', filter: 'id=eq.main' },
            (payload) => {
              const newData = payload.new as any;
              setSiteContent({
                heroSubtitle: newData.hero_subtitle || INITIAL_SITE_CONTENT.heroSubtitle,
                heroTitle: newData.hero_title || INITIAL_SITE_CONTENT.heroTitle,
                heroDescription: newData.hero_description || INITIAL_SITE_CONTENT.heroDescription,
                contactAddress: newData.contact_address || INITIAL_SITE_CONTENT.contactAddress,
                contactPhone: newData.contact_phone || INITIAL_SITE_CONTENT.contactPhone,
                contactEmail: newData.contact_email || INITIAL_SITE_CONTENT.contactEmail,
                heroVideo: newData.hero_video || INITIAL_SITE_CONTENT.heroVideo,
                heroImage: newData.hero_image || INITIAL_SITE_CONTENT.heroImage
              });
            }
          )
          .subscribe();

      } catch (error) {
        console.warn("Supabase site data load failed. Using initial data.", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchSiteData();
  }, []);

  const isUUID = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const addHeroSpec = async (specData: Omit<HeroSpec, "id">) => {
    try {
      const { data, error } = await supabase.from('hero_specs').insert([specData]).select().single();
      if (error) throw error;
      setHeroSpecs(prev => [...prev, data]);
    } catch (error) {
      const newSpec = { ...specData, id: Math.random().toString(36).substr(2, 9) };
      setHeroSpecs((prev) => [...prev, newSpec]);
    }
  };

  const updateHeroSpec = async (id: string, specData: Partial<HeroSpec>) => {
    try {
      if (isUUID(id)) {
        await supabase.from('hero_specs').update(specData).eq('id', id);
      }
      setHeroSpecs((prev) => prev.map((spec) => (spec.id === id ? { ...spec, ...specData } : spec)));
    } catch (error) {
      setHeroSpecs((prev) => prev.map((spec) => (spec.id === id ? { ...spec, ...specData } : spec)));
    }
  };

  const deleteHeroSpec = async (id: string) => {
    try {
      if (isUUID(id)) {
        await supabase.from('hero_specs').delete().eq('id', id);
      }
      setHeroSpecs((prev) => prev.filter((spec) => spec.id !== id));
    } catch (error) {
      setHeroSpecs((prev) => prev.filter((spec) => spec.id !== id));
    }
  };

  const addTestimonial = async (testData: Omit<Testimonial, "id">) => {
    try {
      const { data, error } = await supabase.from('testimonials').insert([{
        name: testData.name,
        car_bought: testData.carBought,
        text: testData.text,
        rating: testData.rating
      }]).select().single();
      
      if (error) throw error;
      setTestimonials(prev => [data, ...prev]);
    } catch (error) {
      const newTest = { ...testData, id: Math.random().toString(36).substr(2, 9) };
      setTestimonials((prev) => [newTest, ...prev]);
    }
  };

  const updateTestimonial = async (id: string, testData: Partial<Testimonial>) => {
    try {
      if (isUUID(id)) {
        const updatePayload: any = { ...testData };
        if (testData.carBought) {
          updatePayload.car_bought = testData.carBought;
          delete updatePayload.carBought;
        }
        await supabase.from('testimonials').update(updatePayload).eq('id', id);
      }
      setTestimonials((prev) => prev.map((test) => (test.id === id ? { ...test, ...testData } : test)));
    } catch (error) {
      setTestimonials((prev) => prev.map((test) => (test.id === id ? { ...test, ...testData } : test)));
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      if (isUUID(id)) {
        await supabase.from('testimonials').delete().eq('id', id);
      }
      setTestimonials((prev) => prev.filter((test) => test.id !== id));
    } catch (error) {
      setTestimonials((prev) => prev.filter((test) => test.id !== id));
    }
  };

  const updateSiteContent = async (content: Partial<SiteContent>) => {
    // Optimistic update
    setSiteContent((prev) => ({ ...prev, ...content }));

    try {
      const updatePayload: any = {};
      if (content.heroSubtitle !== undefined) updatePayload.hero_subtitle = content.heroSubtitle;
      if (content.heroTitle !== undefined) updatePayload.hero_title = content.heroTitle;
      if (content.heroDescription !== undefined) updatePayload.hero_description = content.heroDescription;
      if (content.contactAddress !== undefined) updatePayload.contact_address = content.contactAddress;
      if (content.contactPhone !== undefined) updatePayload.contact_phone = content.contactPhone;
      if (content.contactEmail !== undefined) updatePayload.contact_email = content.contactEmail;
      if (content.heroVideo !== undefined) updatePayload.hero_video = content.heroVideo;
      if (content.heroImage !== undefined) updatePayload.hero_image = content.heroImage;

      console.log("SiteContext: Syncing to Supabase...", updatePayload);
      const { error } = await supabase.from('site_settings').upsert([{ id: 'main', ...updatePayload }]);
      
      if (error) {
        if (error.code === '42501') {
          console.warn("SiteContext: Cloud sync blocked by RLS policies.");
        } else {
          console.error("Supabase Sync Error:", error);
        }
      } else {
        console.log("SiteContext: Sync Successful");
      }
      
      // Always save to localStorage as backup
      const newContent = { ...siteContent, ...content };
      localStorage.setItem("om_site_content", JSON.stringify(newContent));
    } catch (error) {
      console.error("SiteContext: Critical sync failure", error);
    }
  };

  return (
    <SiteContext.Provider value={{
      heroSpecs, testimonials, siteContent,
      addHeroSpec, updateHeroSpec, deleteHeroSpec,
      addTestimonial, updateTestimonial, deleteTestimonial,
      updateSiteContent, isLoaded
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}
