import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel_Decorative, Great_Vibes } from "next/font/google";
import "./globals.css";
import { CarProvider } from "../context/CarContext";
import { SiteProvider } from "../context/SiteContext";
import { AuthProvider } from "../context/AuthContext";
import React from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const calligraphy = Great_Vibes({
  weight: ["400"],
  variable: "--font-calligraphy",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OM Indian Cars | Premium Dealership",
  description: "Drive the Pride of India. Premium Cars. Trusted Deals.",
  icons: {
    icon: "/omindlogo.png",
    apple: "/omindlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${calligraphy.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground font-sans overflow-x-hidden">
        <AuthProvider>
          <CarProvider>
            <SiteProvider>
              {children}
              
              {/* Floating WhatsApp Button */}
              <a 
                href="https://wa.me/919246620555" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-[100] group"
                aria-label="Contact on WhatsApp"
              >
                <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </a>
            </SiteProvider>
          </CarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
