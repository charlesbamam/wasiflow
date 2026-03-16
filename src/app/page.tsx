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
import { Header } from "@/components/Header";

export default function LandingPage() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [email, setEmail] = useState("");
  const t = translations[lang];

  useEffect(() => {
    const consent = localStorage.getItem("wasiflow-consent-v4");
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
    localStorage.setItem("wasiflow-consent-v4", "true");
    setShowCookies(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-[#BAE6FD] selection:text-[#0E625E]">
      <Header lang={lang} setLang={setLang} />

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
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 md:-right-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-float">
                <div className="bg-[#D4C19D] p-2 rounded-lg"><BookOpen size={18} className="text-white" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Currículo</p>
                  <p className="text-sm font-bold text-[#0E625E]">BNCC Integrada</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="bg-[#0E625E] p-2 rounded-lg"><CheckCircle2 size={18} className="text-white" /></div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Progresso</p>
                  <p className="text-sm font-bold text-[#0E625E]">Relatório Pronto</p>
                </div>
              </div>
            </div>
        </section>

        {/* Dynamic Features Grid */}
        <section id="features" className="bg-[#F0F9F9]/50 border-y border-slate-100 py-32 overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="reveal-on-scroll text-center mb-16">
              <span className="text-[#0E625E] font-bold uppercase tracking-[0.2em] text-[11px] mb-4 block">{t.features.tag}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0B0B] mb-6 max-w-4xl mx-auto">
                {t.features.title}
              </h2>
            </div>

            {/* Feature Splits */}
            <div className="space-y-20 md:space-y-24">
              {/* Split 1: Evidence Journal */}
              <div className="reveal-on-scroll flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                 <div className="flex-1 space-y-6">
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
                 <div className="flex-1 w-full flex items-center justify-center">
                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white rotate-2 transition-transform hover:rotate-0 duration-500">
                       <Image src="/homeschooling_basics_v2_1773503526173.png" alt="Homeschooling basics" fill className="object-cover" />
                    </div>
                 </div>
              </div>

                {/* Split 2: Legal Reports */}
                <div className="reveal-on-scroll flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                  <div className="flex-1 space-y-6">
                     <div className="bg-[#D4C19D]/40 p-4 rounded-xl w-fit text-white"><Shield size={40} className="text-[#0B0B0B]" /></div>
                     <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                        {t.features.cards.juridical.title}
                     </h3>
                     <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        {t.features.cards.juridical.desc}
                     </p>
                    <ul className="space-y-4">
                       {["Estrutura BNCC", "Formatos aceitos", "Histórico contínuo"].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                            <CheckCircle2 size={20} className="text-[#0E625E]" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                  <div className="flex-1 w-full flex items-center justify-center">
                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white -rotate-2 transition-transform hover:rotate-0 duration-500">
                       <Image src="/evidence_journal_1773430210790.png" alt="Relatórios Jurídicos" fill className="object-cover" />
                    </div>
                 </div>
              </div>

              {/* Split 3: AI Assistant */}
              <div className="reveal-on-scroll flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                 <div className="flex-1 space-y-8">
                    <div className="bg-[#0E625E]/10 p-4 rounded-xl w-fit text-[#0E625E]"><Brain size={40} /></div>
                    <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                       {t.features.cards.ai.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                       {t.features.cards.ai.desc}
                    </p>
                    <ul className="space-y-4">
                       {["Criação de planos de aula", "Dúvidas pedagógicas", "Sugestão de atividades"].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                            <CheckCircle2 size={20} className="text-[#0E625E]" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                   <div className="flex-1 w-full flex items-center justify-center relative">
                     {/* Mascot Mask Overlay */}
                     <div className="absolute -left-8 -bottom-8 w-48 h-48 z-10 drop-shadow-2xl transition-transform hover:scale-110 duration-300">
                        <Image src="/wasiflow_mascot.png" alt="Wasiflow Mascot" fill className="object-contain" />
                     </div>
                     <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white rotate-1 transition-transform hover:rotate-0 duration-500 relative z-0">
                        <Image src="/ai_assistant_minimalist_chat.png" alt="IA Assistant" fill className="object-cover" />
                     </div>
                  </div>
              </div>

               {/* Split 4: Activity Tracking */}
               <div className="reveal-on-scroll flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                 <div className="flex-1 space-y-6">
                    <div className="bg-[#BAE6FD]/40 p-4 rounded-xl w-fit text-[#0E625E]"><LayoutDashboard size={40} /></div>
                    <span className="text-[#0E625E] font-bold uppercase tracking-widest text-xs">{t.features.cards.tracking.tag}</span>
                    <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                       {t.features.cards.tracking.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                       {t.features.cards.tracking.desc}
                    </p>
                    <div className="pt-4">
                       <div className="flex items-center gap-2 text-[#0B0B0B] font-extrabold">
                          <CheckCircle2 className="text-[#0E625E]" /> Foco na simplicidade e no controle dos pais
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 w-full flex items-center justify-center">
                    <div className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl border border-white transition-all duration-500 hover:scale-[1.02]">
                       <Image src="/activity_tracking_clean_1773438984929.png" alt="Activity Tracking" fill className="object-cover" />
                    </div>
                 </div>
              </div>

               {/* Split 5: Gamification */}
               <div className="reveal-on-scroll flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                 <div className="flex-1 space-y-6">
                    <div className="bg-[#D4C19D]/40 p-4 rounded-xl w-fit text-[#0E625E]"><Gamepad size={40} /></div>
                    <span className="text-[#0E625E] font-bold uppercase tracking-widest text-xs">{t.features.gamification.tag}</span>
                    <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                       {t.features.gamification.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                       {t.features.gamification.desc}
                    </p>
                    <button className="bg-[#0E625E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#D4C19D] transition-all">
                       {t.features.gamification.cta}
                    </button>
                 </div>
                 <div className="flex-1 w-full flex items-center justify-center">
                    <div className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl border border-white transform rotate-2 transition-transform hover:rotate-0 duration-500">
                       <Image src="/gamification_reports_check_1773436412931.png" alt="Gamification" fill className="object-cover" />
                    </div>
                 </div>
              </div>

               {/* Split 6: Collaboration */}
               <div className="reveal-on-scroll flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                 <div className="flex-1 space-y-6">
                    <div className="bg-[#BAE6FD]/40 p-4 rounded-xl w-fit text-[#0E625E]"><Users size={40} /></div>
                    <span className="text-[#0E625E] font-bold uppercase tracking-widest text-xs">{t.features.cards.collaboration.tag}</span>
                    <h3 className="text-4xl font-extrabold text-[#0E625E] tracking-tight leading-tight">
                       {t.features.cards.collaboration.title}
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                       {t.features.cards.collaboration.desc}
                    </p>
                 </div>
                 <div className="flex-1 relative w-full h-full min-h-[400px] flex items-center justify-center">
                    <div className="relative w-full max-w-[440px] h-64">
                       {/* Couple Image (Behind) */}
                       <div className="absolute left-0 top-0 w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-xl z-0">
                          <Image src="/authentic_parent_couple_white_1773496088495.png" alt="Tutor" fill className="object-cover" />
                       </div>
                       {/* Mother/Woman Image (In front and larger) */}
                       <div className="absolute right-0 bottom-0 w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10 -translate-x-8 -translate-y-4">
                          <Image src="/authentic_mother_homeschool_relief_1773496108710.png" alt="Assistant" fill className="object-cover" />
                       </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

         {/* Articles Section */}
         <section id="blog" className="py-32 bg-white border-t border-[#FAFAFA]">
           <div className="max-w-[1240px] mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                 <div className="max-w-2xl">
                    <span className="text-[#0E625E] font-bold uppercase tracking-[0.2em] text-[11px] mb-4 block">{t.blog.tag}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0B0B] mb-6">
                       {t.blog.title}
                    </h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                       {t.blog.subtitle}
                    </p>
                 </div>
                 <Link href="/artigos" className="hidden md:flex text-[#0E625E] font-bold items-center gap-2 group bg-[#0E625E]/5 px-6 py-3 rounded-xl transition-all hover:bg-[#0E625E]/10">
                    {t.blog.viewMore} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mb-16">
                 {t.blog.posts.slice(0, 2).map((post: any, i: number) => (
                    <div key={i} className="reveal-on-scroll group bg-white border border-[#E8E8E8] rounded-[40px] overflow-hidden transition-all hover:shadow-2xl hover:border-[#0E625E]/20 flex flex-col h-full">
                       <div className="relative h-72 w-full overflow-hidden">
                          <Image 
                            src={post.image} 
                            alt={post.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                       </div>
                       <div className="p-10 space-y-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-4 text-sm text-slate-400 font-bold">
                             <div className="bg-[#0E625E]/10 p-2 rounded-lg text-[#0E625E]">
                                <BookOpen size={16} />
                             </div>
                             <span>{post.date}</span>
                          </div>
                          <h3 className="text-2xl font-extrabold text-[#0B0B0B] group-hover:text-[#0E625E] transition-colors leading-tight">
                             {post.title}
                          </h3>
                          <p className="text-slate-500 font-medium leading-relaxed flex-1">
                             {post.desc}
                          </p>
                          <div className="pt-6">
                             <Link href={`/artigos/${post.slug}`} className="inline-flex items-center gap-2 text-[#0E625E] font-extrabold border-b-2 border-[#0E625E]/20 hover:border-[#0E625E] transition-all pb-1 group/btn">
                                {t.blog.cta} <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                             </Link>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         </section>

         {/* FAQ Expanded */}
         <section id="faq" className="max-w-[1240px] mx-auto px-6 py-32 bg-[#FAFAFA] border-y border-[#E8E8E8]">
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
                      className="flex-1 h-16 px-8 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      required
                    />
                    <button type="submit" className="h-16 px-12 bg-white text-[#0E625E] font-bold rounded-2xl hover:bg-[#D4C19D] hover:text-white transition-all whitespace-nowrap">
                       {t.newsletter.button}
                    </button>
                 </form>
              </div>
           </div>
        </section>

        {/* Footer Minimal */}
        <footer className="py-20 bg-white border-t border-[#E8E8E8]">
           <div className="max-w-[1240px] mx-auto px-6 text-center">
              <div className="mb-8 flex justify-center items-center">
                <div className="relative w-40 h-12">
                  <Image 
                    src="/wasiflow_logo.svg" 
                    alt="Wasiflow Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
             <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{t.footer.rights}</p>
           </div>
        </footer>
      </main>

      {/* Cookies Consent */}
      {showCookies && (
        <div className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:max-w-md z-[200] animate-in slide-in-from-bottom-10 duration-500">
           <div className="bg-white border border-[#E8E8E8] shadow-2xl p-8 rounded-[32px]">
              <div className="flex items-start gap-4 mb-6">
                 <div className="bg-[#0E625E]/10 p-3 rounded-2xl text-[#0E625E]">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h5 className="font-bold text-[#0B0B0B] text-lg mb-2">Cookies & Privacidade</h5>
                    <p className="text-slate-500 text-sm leading-relaxed">
                       {t.cookies.text}
                    </p>
                 </div>
              </div>
              <div className="flex gap-3">
                 <button onClick={acceptCookies} className="flex-1 bg-[#0E625E] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#D4C19D] transition-all">
                    {t.cookies.accept}
                 </button>
                 <button onClick={() => setShowCookies(false)} className="flex-1 bg-slate-50 text-slate-500 py-4 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
                    {t.cookies.decline}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
