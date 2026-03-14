"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Menu, 
  X, 
  Zap, 
  Shield, 
  Brain, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight, 
  Globe,
  BookOpen,
  Gamepad,
  CheckCircle2,
  LayoutDashboard,
  Users,
  Bell
} from "lucide-react";
import Image from "next/image";
import { translations } from "@/lib/translations";

export default function LandingPage() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [email, setEmail] = useState("");
  const t = translations[lang];

  useEffect(() => {
    const consent = localStorage.getItem("hs-xpert-consent-v4");
    if (!consent) {
       const timer = setTimeout(() => setShowCookies(true), 1500);
       return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const acceptCookies = () => {
    localStorage.setItem("hs-xpert-consent-v4", "true");
    setShowCookies(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-[#BAE6FD] selection:text-[#0E625E]">
      {/* Header */}
      <header className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-[#E8E8E8] h-20">
        <div className="max-w-[1240px] mx-auto h-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#0E625E] p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-[#0E625E] uppercase">HS XPERT</span>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#product" className="text-sm font-medium text-slate-600 transition-colors link-hover">{t.nav.product}</Link>
            <Link href="#features" className="text-sm font-medium text-slate-600 transition-colors link-hover">{t.nav.features}</Link>
            <Link href="#showcase" className="text-sm font-medium text-slate-600 transition-colors link-hover">Interface</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 transition-colors link-hover">{t.nav.pricing}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
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
                  <div className="bg-[#0E625E] p-1.5 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl tracking-tighter text-[#0E625E] uppercase">HS XPERT</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} className="text-[#0E625E]" />
                </button>
              </div>
              <div className="flex flex-col gap-6 ">
                <Link href="#product" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] border-b border-slate-100 pb-4">{t.nav.product}</Link>
                <Link href="#features" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] border-b border-slate-100 pb-4">{t.nav.features}</Link>
                <Link href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0E625E] border-b border-slate-100 pb-4">{t.nav.pricing}</Link>
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

      <main className="pt-20">
        {/* Hero Section */}
        <section id="product" className="max-w-[1240px] mx-auto px-6 py-24 md:py-32 text-center">
            <div className="fade-up inline-flex items-center gap-2 bg-[#0E625E]/5 text-[#0E625E] border border-[#0E625E]/10 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider mb-10 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E625E] animate-pulse" />
              {t.hero.badge}
            </div>
            
            <h1 className="fade-up text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight leading-[1.05] text-[#0B0B0B] mb-10">
              {t.hero.title} <br />
              <span className="font-hand text-[#D4C19D] text-6xl md:text-8xl lg:text-[100px] font-normal leading-none block md:inline-block mt-4 md:mt-0">{t.hero.titleAccent}</span>
            </h1>
            
            <p className="fade-up text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-16 leading-relaxed">
              {t.hero.desc}
            </p>
            
            <div className="fade-up flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
               <Link href="/register">
                 <button className="bg-[#0E625E] text-white h-14 px-10 rounded-lg text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 hover:bg-[#D4C19D]">
                   {t.hero.ctaPrimary} <ChevronRight size={20} />
                 </button>
               </Link>
               <Link href="#features">
                 <button className="bg-white text-[#0E625E] border border-[#E8E8E8] h-14 px-10 rounded-lg text-lg font-bold hover:border-[#D4C19D] hover:text-[#D4C19D] transition-all">
                   {t.hero.ctaSecondary}
                 </button>
               </Link>
            </div>

            {/* Main Human Image (Smaller/Compact) */}
            <div className="fade-up relative max-w-4xl mx-auto group">
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-2xl relative">
                <Image 
                  src="/homeschooling_parent_child_1773428958981.png" 
                  alt="Homeschooling Parent teaching child" 
                  width={1000} 
                  height={600} 
                  className="w-full h-auto object-cover grayscale-[0.2] transition-all duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating element 1 */}
              <div className="absolute -top-6 -right-6 md:-right-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-float">
                <div className="bg-[#D4C19D] p-2 rounded-lg"><BookOpen size={18} className="text-white" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Currículo</p>
                  <p className="text-sm font-bold text-[#0E625E]">BNCC Integrada</p>
                </div>
              </div>
              {/* Floating element 2 */}
              <div className="absolute -bottom-6 -left-6 md:-left-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="bg-[#0E625E] p-2 rounded-lg"><CheckCircle2 size={18} className="text-white" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Progresso</p>
                  <p className="text-sm font-bold text-[#0E625E]">Relatório Pronto</p>
                </div>
              </div>
              {/* Floating element 3: Gamification */}
              <div className="absolute top-1/4 -left-16 md:-left-24 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-[#BAE6FD] p-2 rounded-lg"><Gamepad size={18} className="#0E625E" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Gamification</p>
                  <p className="text-sm font-bold text-[#0E625E]">Estímulo para seus filhos <br/> irem mais longe</p>
                </div>
              </div>
              {/* Floating element 4: Ajuda Real */}
              <div className="absolute top-1/2 -right-16 md:-right-24 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-float" style={{ animationDelay: '3s' }}>
                <div className="bg-[#D4C19D] p-2 rounded-lg"><Brain size={18} className="text-white" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Ajuda Real</p>
                  <p className="text-sm font-bold text-[#0E625E]">Um assistente para ajudar <br/> no seu plano</p>
                </div>
              </div>
              {/* Floating element 5: Simplicidade */}
              <div className="absolute bottom-12 -right-12 md:-right-16 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-float" style={{ animationDelay: '4s' }}>
                <div className="bg-[#0E625E] p-2 rounded-lg"><LayoutDashboard size={18} className="text-white" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Simplicidade</p>
                  <p className="text-sm font-bold text-[#0E625E]">Acesse seu dashboard <br/> e tenha tudo à mão</p>
                </div>
              </div>
            </div>
        </section>

        {/* Dynamic Features Grid */}
        <section id="features" className="bg-[#F0F9F9]/50 border-y border-slate-100 py-32 overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="reveal-on-scroll text-center mb-24">
              <span className="text-[#0E625E] font-bold uppercase tracking-[0.2em] text-[11px] mb-4 block">{t.features.tag}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0B0B] mb-8 max-w-4xl mx-auto">
                {t.features.title}
              </h2>
            </div>

            {/* Feature Splits */}
            <div className="space-y-32">
              {/* Split 1: Evidence Journal with Overlapping Images */}
              <div className="reveal-on-scroll flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                 <div className="flex-1 space-y-8">
                    <div className="bg-[#BAE6FD]/40 p-4 rounded-xl w-fit text-[#0E625E]"><Zap size={40} /></div>
                    <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                      {t.features.cards.diary.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                      {t.features.cards.diary.desc}
                    </p>
                    <ul className="space-y-4">
                       {["IA que narra vivências", "Organização automática", "Exportação em um clique"].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                            <CheckCircle2 size={20} className="text-[#0E625E]" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 {/* Overlapping Images Container */}
                 <div className="flex-1 relative w-full h-[400px] md:h-[500px]">
                    <div className="absolute top-0 right-0 w-[85%] aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white z-10 rotate-2 group-hover:rotate-1 transition-all">
                       <Image src="/diario.png" alt="Evidence Journal interface" fill className="object-cover" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-[85%] aspect-video rounded-3xl overflow-hidden shadow-xl border border-white/50 z-0 -rotate-3 group-hover:-rotate-1 transition-all">
                       <Image src="/dashboard.png" alt="Dashboard interface" fill className="object-cover opacity-80" />
                    </div>
                 </div>
              </div>

              {/* Split 2: Gamification */}
              <div className="reveal-on-scroll flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32 bg-[#FFFBF2]/60 p-12 lg:p-20 rounded-[48px] border border-[#D4C19D]/10">
                 <div className="flex-1 space-y-8 lg:pl-12">
                    <div className="bg-[#D4C19D]/20 p-4 rounded-xl w-fit text-[#0E625E]"><Gamepad size={40} /></div>
                    <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                      {t.features.gamification.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                      {t.features.gamification.desc}
                    </p>
                    <div className="pt-4">
                       <button className="bg-[#0E625E] text-white h-14 px-10 rounded-xl font-extrabold hover:bg-[#D4C19D] transition-all flex items-center gap-3 shadow-md">
                          {t.features.gamification.cta} <ArrowRight size={20} />
                       </button>
                    </div>
                 </div>
                 <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl transition-all duration-700">
                    <Image src="/homeschooling_badges_achievement_celebration_1773434547568.png" alt="Gamification interaction" fill className="object-cover" />
                 </div>
              </div>

              {/* Split 3: Reports */}
              <div className="reveal-on-scroll flex flex-col lg:flex-row items-center gap-16 lg:gap-32 bg-[#F9F0FF]/50 p-12 lg:p-20 rounded-[48px] border border-slate-100">
                 <div className="flex-1 space-y-8">
                    <div className="bg-[#D4C19D]/30 p-4 rounded-xl w-fit text-[#0E625E]"><Shield size={40} /></div>
                    <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                      {t.features.cards.juridical.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                      {t.features.cards.juridical.desc}
                    </p>
                    <Link href="/register">
                       <span className="text-[#0E625E] font-bold border-b-2 border-[#D4C19D] pb-1 cursor-pointer hover:text-[#D4C19D] hover:border-[#D4C19D] transition-all">
                          Personalize seu planejamento educacional
                       </span>
                    </Link>
                 </div>
                 <div className="flex-1 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white z-0">
                    <Image src="/dashboard.png" alt="Reports dashboard" fill className="object-cover" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interface Showcase (Cleaner Solution) */}
        <section id="showcase" className="py-32 bg-white">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="reveal-on-scroll text-center mb-16">
              <span className="text-[#0E625E] font-bold uppercase tracking-[0.2em] text-[11px] mb-4 block">{t.showcase.tag}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0B0B] mb-6">
                Gerencie tudo em um só lugar
              </h2>
            </div>
            
            {/* Cleaner Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Left: Main Feature */}
               <div className="reveal-on-scroll group bg-[#F7F7F7] border border-[#E8E8E8] rounded-[40px] p-8 md:p-12 transition-all hover:shadow-xl">
                  <div className="mb-8">
                     <div className="bg-[#0E625E]/5 w-16 h-16 rounded-2xl flex items-center justify-center text-[#0E625E] mb-6"><LayoutDashboard size={32} /></div>
                     <h4 className="text-2xl font-extrabold text-[#0E625E] mb-4 tracking-tight">Painel da Família</h4>
                     <p className="text-slate-500 font-medium leading-relaxed">Controle o progresso de todos os seus filhos de forma centralizada e intuitiva.</p>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200">
                     <Image src="/dashboard.png" alt="Dashboard View" fill className="object-cover" />
                  </div>
               </div>

                {/* Right: AI Support - Simplified Premium */}
                <div className="reveal-on-scroll group bg-gradient-to-br from-[#0E625E] to-[#041F1E] border border-white/10 rounded-[48px] p-8 md:p-14 transition-all hover:shadow-[0_20px_80px_-20px_rgba(14,98,94,0.4)] text-white relative overflow-hidden ring-1 ring-white/10">
                   {/* Minimalist AI Glow */}
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#BAE6FD]/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                   
                   <div className="relative z-10 grid grid-cols-1 gap-12">
                      <div className="space-y-6">
                         <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-[#BAE6FD] shadow-xl backdrop-blur-xl">
                            <Brain size={32} />
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-3xl font-extrabold tracking-tight">{t.features.cards.ai.title}</h4>
                            <p className="text-white/70 text-lg font-medium leading-relaxed max-w-[450px]">
                               {t.features.cards.ai.desc}
                            </p>
                         </div>
                      </div>

                      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#094240]/50 backdrop-blur-sm p-6 group-hover:translate-y-[-5px] transition-transform">
                         {/* Clean Chat Mockup */}
                         <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 max-w-[80%]">
                               <p className="text-sm text-white/50 mb-1 font-bold tracking-wider">PAI/MÃE</p>
                               <p className="text-sm">Como planejar o 2º ano seguindo a BNCC?</p>
                            </div>
                            <div className="bg-[#BAE6FD] p-4 rounded-2xl border border-white/10 max-w-[85%] ml-auto text-[#0E625E]">
                               <p className="text-[10px] font-bold mb-1 uppercase tracking-widest">HS Xpert AI</p>
                               <p className="text-sm font-medium">Aqui está um roteiro focado em Habilidades de Alfabetização (EF02LP01)...</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Lower Row: Activity Tracking & Collaboration */}
                <div className="reveal-on-scroll group bg-[#F0F9F9] border border-[#D1EAEA] rounded-[48px] p-8 md:p-12 transition-all hover:shadow-xl relative overflow-hidden">
                   <div className="flex flex-col md:flex-row gap-10 items-center">
                      <div className="flex-1 space-y-6">
                         <div className="bg-[#0E625E]/10 w-16 h-16 rounded-2xl flex items-center justify-center text-[#0E625E]"><Bell size={32} /></div>
                         <div className="space-y-3">
                            <span className="text-[#0E625E] font-bold text-[11px] tracking-widest uppercase">{t.features.cards.tracking.tag}</span>
                            <h4 className="text-3xl font-extrabold text-[#0B0B0B] tracking-tight">{t.features.cards.tracking.title}</h4>
                            <p className="text-slate-500 font-medium leading-relaxed">
                               {t.features.cards.tracking.desc}
                            </p>
                         </div>
                      </div>
                      <div className="flex-1 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#D1EAEA] shadow-lg">
                         <Image src="/activity_tracking.png" alt="Activity Management" fill className="object-cover" />
                      </div>
                   </div>
                </div>

                <div className="reveal-on-scroll group bg-[#FFFBF2] border border-[#F2E8CF] rounded-[48px] p-8 md:p-12 transition-all hover:shadow-xl relative overflow-hidden">
                   <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
                      <div className="flex-1 space-y-6">
                         <div className="bg-[#D4C19D]/20 w-16 h-16 rounded-2xl flex items-center justify-center text-[#95815E]"><Users size={32} /></div>
                         <div className="space-y-3">
                            <span className="text-[#95815E] font-bold text-[11px] tracking-widest uppercase">{t.features.cards.collaboration.tag}</span>
                            <h4 className="text-3xl font-extrabold text-[#0B0B0B] tracking-tight">{t.features.cards.collaboration.title}</h4>
                            <p className="text-slate-500 font-medium leading-relaxed">
                               {t.features.cards.collaboration.desc}
                            </p>
                         </div>
                      </div>
                      <div className="flex-1 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#F2E8CF] shadow-lg">
                         <Image src="/collaboration.png" alt="Tutoring Collaboration" fill className="object-cover" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Separator / CTA Banner */}
        <section className="bg-[#0E625E] py-20 relative overflow-hidden">
           <div className="max-w-[1240px] mx-auto px-6 text-center relative z-10">
              <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-12 leading-tight">
                Faça parte da revolução educacional <br /> 
                <span className="text-[#D4C19D]">que as famílias brasileiras esperavam.</span>
              </h3>
              <Link href="/register">
                 <button className="bg-white text-[#0E625E] h-16 px-12 rounded-xl text-xl font-extrabold transition-all shadow-2xl hover:bg-[#D4C19D] hover:text-[#0E625E]">
                   Quero Testar Grátis
                 </button>
              </Link>
           </div>
           {/* Decorative elements */}
           <div className="absolute left-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
           <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#D4C19D]/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </section>

        {/* FAQ Expanded */}
        <section className="max-w-[1240px] mx-auto px-6 py-32 bg-[#FAFAFA] border-y border-[#E8E8E8]">
            <div className="max-w-3xl mx-auto text-center mb-24">
              <span className="text-[#0E625E] font-bold uppercase tracking-[0.2em] text-[11px] mb-4 block">SUPORTE E TRANQUILIDADE</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0B0B] mb-8">
                {t.faq.title}
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                {t.faq.subtitle}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {t.faq.questions.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md"
                >
                  <div 
                    className="flex justify-between items-center p-8 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <h4 className="text-lg font-bold text-[#0E625E] leading-relaxed pr-8">{faq.q}</h4>
                    <div className={`p-2 rounded-lg bg-slate-100 text-slate-400 transition-all ${activeFaq === i ? 'bg-[#0E625E]/10 text-[#0E625E] rotate-180' : ''}`}>
                       <ChevronDown size={20} />
                    </div>
                  </div>
                  {activeFaq === i && (
                    <div className="px-8 pb-8 text-slate-500 text-lg font-medium leading-relaxed border-t border-slate-50 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
        </section>

        {/* Newsletter Clean */}
        <section className="max-w-[1240px] mx-auto px-6 py-32 bg-white">
           <div className="reveal-on-scroll bg-[#0E625E] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="max-w-2xl mx-auto relative z-10">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    {t.newsletter.title}
                 </h2>
                 <p className="text-white/70 text-xl mb-12 font-medium">
                    {t.newsletter.desc}
                 </p>
                 
                 <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => {e.preventDefault(); setEmail("");}}>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.newsletter.placeholder} 
                      className="flex-1 h-16 bg-white/10 border border-white/20 rounded-2xl px-6 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all font-bold text-lg"
                      required
                    />
                    <button className="h-16 bg-white hover:bg-[#D4C19D] text-[#0E625E] font-extrabold px-10 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-lg">
                      {t.newsletter.button} <ArrowRight size={20} />
                    </button>
                 </form>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4C19D]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
           </div>
        </section>
      </main>

      {/* Footer Minimal */}
      <footer className="py-24 bg-white border-t border-[#E8E8E8]">
        <div className="max-w-[1240px] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex items-center gap-2">
                <div className="bg-[#0E625E] p-1.5 rounded-lg">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tighter text-[#0E625E] uppercase">HS XPERT</span>
              </div>
              <div className="flex flex-wrap justify-center gap-10 text-[12px] font-extrabold text-slate-400 uppercase tracking-widest">
                 <Link href="#product" className="transition-all link-hover">Produto</Link>
                 <Link href="#features" className="transition-all link-hover">Recursos</Link>
                 <Link href="/privacidade" className="transition-all link-hover">{t.footer.privacy}</Link>
                 <Link href="/termos" className="transition-all link-hover">{t.footer.terms}</Link>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-2">
                  {t.footer.rights}
                </p>
                <div className="flex gap-4 justify-center md:justify-end py-1">
                   <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"><Globe size={12} className="text-slate-400" /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'pt' ? 'Brasil' : 'Global Settings'}</span>
                </div>
              </div>
           </div>
        </div>
      </footer>

      {/* Cookie Popup Minimal */}
      {showCookies && (
        <div className="fixed bottom-8 left-8 right-8 z-[200] md:left-auto md:max-w-md animate-in slide-in-from-bottom-10 duration-700">
           <div className="bg-[#0B0B0B] text-white p-8 rounded-[32px] shadow-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-start gap-5 mb-8">
                 <div className="bg-[#0E625E] p-3 rounded-2xl text-[#BAE6FD] shadow-lg shadow-[#0E625E]/20"><Shield size={28} /></div>
                 <div>
                    <h5 className="font-extrabold text-lg mb-2 leading-none">Privacidade & Cookies</h5>
                    <p className="text-sm font-medium leading-relaxed text-white/60">
                      {t.cookies.text}
                    </p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <button onClick={acceptCookies} className="flex-[2] bg-white text-[#0B0B0B] h-12 rounded-xl font-extrabold text-[11px] uppercase tracking-widest hover:bg-[#D4C19D] transition-all shadow-lg active:scale-95">
                   {t.cookies.accept}
                 </button>
                 <button onClick={() => setShowCookies(false)} className="flex-1 bg-white/5 text-white/40 h-12 rounded-xl font-extrabold text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10">
                   {t.cookies.decline}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
