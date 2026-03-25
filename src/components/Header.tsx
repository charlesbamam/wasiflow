"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { translations } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  lang: "pt" | "en" | "es";
  setLang: (lang: "pt" | "en" | "es") => void;
}

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
] as const;

export function Header({ lang, setLang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-[#E8E8E8] h-20">
        <div className="max-w-[1240px] mx-auto h-full px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-40 h-10">
              <Image 
                src="/wasiflow_logo_1.png" 
                alt="Wasiflow Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-[#C8B289] font-medium transition-colors">{t.nav.product}</Link>
            <Link href="/#features" className="text-slate-600 hover:text-[#C8B289] font-medium transition-colors">{t.nav.features}</Link>
            <Link href="/#conhecimento" className="text-slate-600 hover:text-[#C8B289] font-medium transition-colors">{t.nav.blog}</Link>
            <Link href="/#pricing" className="text-slate-600 hover:text-[#C8B289] font-medium transition-colors">{t.nav.pricing}</Link>
          </nav>

          <div className="flex items-center gap-[26px]">
            <Link href="/login" className="hidden lg:block text-sm font-bold text-[#0E625E] hover:text-[#C8B289] transition-colors">
              {t.nav.login}
            </Link>
            <Link href="/register" className="hidden lg:block">
              <button className="bg-[#0E625E] text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight transition-all shadow-md active:scale-95 hover:bg-[#C8B289]">
                {t.nav.cta}
              </button>
            </Link>
            
            {/* New Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm transition-all hover:border-[#C8B289] hover:bg-slate-50 min-w-[80px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{currentLang.flag}</span>
                  <span className="uppercase">{currentLang.code}</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden z-[200]"
                  >
                    <div className="p-1.5 flex flex-col gap-1">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            localStorage.setItem("language", l.code);
                            setIsLangOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all text-left ${
                            lang === l.code 
                              ? 'bg-[#0E625E]/5 text-[#0E625E]' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-[#0E625E]'
                          }`}
                        >
                          <span className="text-lg leading-none">{l.flag}</span>
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                      src="/wasiflow_logo_1.png" 
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
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] hover:text-[#C8B289] transition-colors border-b border-slate-100 pb-4">{t.nav.product}</Link>
                <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] hover:text-[#C8B289] transition-colors border-b border-slate-100 pb-4">{t.nav.features}</Link>
                <Link href="/#conhecimento" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] hover:text-[#C8B289] transition-colors border-b border-slate-100 pb-4">{t.nav.blog}</Link>
                <Link href="/#pricing" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] hover:text-[#C8B289] transition-colors border-b border-slate-100 pb-4">{t.nav.pricing}</Link>
                
                {/* Mobile Language Selector */}
                <div className="flex flex-col gap-3 mt-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Idioma</p>
                  <div className="flex gap-2">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setIsMenuOpen(false);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-xl border font-bold transition-all ${
                          lang === l.code 
                            ? 'bg-[#0E625E] border-[#0E625E] text-white' 
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                         <span className="text-lg">{l.flag}</span>
                         <span className="uppercase text-sm">{l.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
               <div className="mt-auto flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full border-2 border-[#0E625E] text-[#0E625E] h-16 rounded-xl text-lg font-bold hover:bg-slate-50 transition-colors">
                      {t.nav.login}
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-[#0E625E] text-white h-16 rounded-xl text-lg font-bold hover:bg-[#C8B289] transition-colors">
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
