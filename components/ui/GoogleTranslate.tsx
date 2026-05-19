"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/utils/cn";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
];

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  useEffect(() => {
    // Check if there is an active language in cookies
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const code = match[1];
      const found = LANGUAGES.find(l => l.code === code);
      if (found) {
        setCurrentLang(found.name);
      }
    }

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          { 
            pageLanguage: "en",
            includedLanguages: "en,te,hi,ta,kn,mr,ml",
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLanguageChange = (langCode: string, langName: string) => {
    setCurrentLang(langName);
    setIsOpen(false);

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      // Set value and trigger event properly
      select.value = langCode;
      select.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      
      // Fallback for older Google translate scripts
      try {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, false);
        select.dispatchEvent(event);
      } catch (e) {}
    } else {
      // Fallback: If widget is not found, force cookie and reload
      const host = window.location.hostname;
      if (langCode === "en") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host}`;
      } else {
        document.cookie = `googtrans=/en/${langCode}; path=/;`;
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${host}`;
      }
      window.location.reload();
    }
  };

  return (
    <div className="relative group z-[110]">
      {/* Hidden original widget */}
      <div id="google_translate_element" className="absolute opacity-0 pointer-events-none -z-10 overflow-hidden w-0 h-0"></div>
      
      {/* Custom sleek UI */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/70 hover:text-[#FFD700] transition-colors p-2"
        aria-label="Change Language"
      >
        <Globe size={20} />
        <span className="text-[10px] font-black uppercase tracking-widest hidden xl:inline-block">
          {currentLang.split(' ')[0]}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 lg:left-auto lg:right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 z-[110]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code, lang.name)}
                className={cn(
                  "w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                  currentLang === lang.name 
                    ? "text-[#FFD700] bg-white/5" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
