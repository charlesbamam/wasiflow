"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { translations } from "@/lib/translations";

interface HeaderProps {
  lang: "pt" | "en";
  setLang: (lang: "pt" | "en") => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-[#E8E8E8] h-20">
        <div className="max-w-[1240px] mx-auto h-full px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-40 h-10">
              <Image 
                src="/wasiflow_logo.svg" 
                alt="Wasiflow Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-[#0E625E] font-medium transition-colors">{t.nav.product}</Link>
            <Link href="/#features" className="text-slate-600 hover:text-[#0E625E] font-medium transition-colors">{t.nav.features}</Link>
            <Link href="/artigos" className="text-slate-600 hover:text-[#0E625E] font-medium transition-colors">{t.nav.blog}</Link>
            <Link href="/#pricing" className="text-slate-600 hover:text-[#0E625E] font-medium transition-colors">{t.nav.pricing}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                const newLang = lang === "pt" ? "en" : "pt";
                setLang(newLang);
                localStorage.setItem("language", newLang);
              }}
              className="flex items-center gap-2 text-xs font-bold text-[#0E625E] bg-[#D4C19D]/20 px-4 py-2 rounded-lg border border-[#D4C19D]/30 transition-all hover:bg-[#D4C19D]/40"
            >
              <Globe size={14} /> {lang === "pt" ? "EN" : "PT"}
            </button>
            <Link href="/register" className="hidden lg:block">
              <button className="bg-[#0E625E] text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all shadow-md active:scale-95 hover:bg-[#D4C19D]">
                {t.nav.cta}
              </button>
            </Link>
            <button className="lg:hidden p-2 text-[#0E625E]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-white lg:hidden animate-in fade-in duration-300">
           <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <div className="relative w-40 h-10">
                    <Image 
                      src="/wasiflow_logo.svg" 
                      alt="Wasiflow Logo" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} className="text-[#0E625E]" />
                </button>
              </div>
              <div className="flex flex-col gap-6 ">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] border-b border-slate-100 pb-4">{t.nav.product}</Link>
                <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] border-b border-slate-100 pb-4">{t.nav.features}</Link>
                <Link href="/artigos" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] border-b border-slate-100 pb-4">{t.nav.blog}</Link>
                <Link href="/#pricing" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] border-b border-slate-100 pb-4">{t.nav.pricing}</Link>
              </div>
              <div className="mt-auto">
                 <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                   <button className="w-full bg-[#0E625E] text-white h-16 rounded-xl text-lg font-bold hover:bg-[#D4C19D] transition-colors">
                     {t.nav.cta}
                   </button>
                 </Link>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
