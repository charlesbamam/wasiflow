"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Facebook, 
  Twitter, 
  Linkedin,
  Sparkles
} from "lucide-react";
import { useParams } from "next/navigation";
import { translations } from "@/lib/translations";
import { Header } from "@/components/Header";

export default function ArtigoPage() {
  const { slug } = useParams();
  const [lang, setLang] = useState<"pt" | "en" | "es">("pt");
  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "pt" | "en" | "es";
    if (savedLang && ["pt", "en", "es"].includes(savedLang) && savedLang !== lang) {
      setLang(savedLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const article = t.blog.posts.find(p => p.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0E625E] mb-4">Artigo não encontrado</h1>
          <Link href="/artigos" className="text-slate-500 hover:text-[#0E625E] transition-colors flex items-center gap-2 justify-center">
            <ArrowLeft size={20} /> Voltar para Artigos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <span className="inline-block bg-[#0E625E]/10 text-[#0E625E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            HOMESCHOOLING
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B0B0B] tracking-tight leading-tight mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-sm mb-12">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#0E625E]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#0E625E]" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#0E625E]" />
              <span>Wasiflow Team</span>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 mb-16">
            <Image src={article.image} alt={article.title} fill className="object-cover" />
          </div>

          <div className="prose prose-xl prose-slate max-w-none">
            <p className="text-xl text-slate-600 leading-[1.8] font-medium mb-12">
              {article.desc}
            </p>
            
            {article.fullContent ? (
              <div className="space-y-10">
                {article.fullContent.map((section: any, idx: number) => {
                  if (section.type === "heading") {
                    return (
                      <h2 key={idx} className="text-3xl font-extrabold text-[#0B0B0B] mt-16 mb-8 uppercase tracking-tight font-sans border-l-4 border-[#0E625E] pl-6 py-2">
                        {section.text}
                      </h2>
                    );
                  }
                  if (section.type === "link") {
                    return (
                      <div key={idx} className="my-6">
                        <a 
                          href={section.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#0E625E] font-bold underline hover:text-[#C8B289] transition-colors break-all"
                        >
                          {section.text}
                        </a>
                      </div>
                    );
                  }
                  if (section.type === "quote") {
                    return (
                      <div key={idx} className="bg-[#FAFAFA] border-l-4 border-[#0E625E] p-10 my-12 rounded-r-3xl shadow-sm">
                        <p className="text-2xl font-bold italic text-[#0E625E]">
                           &quot;{section.text}&quot;
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-xl text-slate-500 leading-[2] mb-8 font-medium">
                      {section.text}
                    </p>
                  );
                })}
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-[#0B0B0B] mt-12 mb-6 uppercase tracking-tight">O que é importante considerar</h2>
                <p className="text-lg text-slate-500 leading-[1.8] mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="bg-[#FAFAFA] border-l-4 border-[#0E625E] p-8 my-12 rounded-r-3xl">
                  <p className="text-xl font-bold italic text-[#0E625E]">
                    &quot;A educação domiciliária não é apenas sobre ensinar conteúdos, mas sobre cultivar o amor pelo aprendizado e a autonomia do estudante.&quot;
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Share & Footer */}
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-400 text-sm uppercase tracking-widest">{lang === "pt" ? "Compartilhar" : "Share"}:</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0E625E] hover:text-white transition-all"><Facebook size={18} /></button>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0E625E] hover:text-white transition-all"><Twitter size={18} /></button>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0E625E] hover:text-white transition-all"><Linkedin size={18} /></button>
              </div>
            </div>
            <Link href="/register" className="bg-[#0E625E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#C8B289] hover:text-[#0E625E] transition-all shadow-lg">
              {lang === "pt" ? "Experimente Wasiflow" : "Try Wasiflow"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="relative w-40 h-10">
              <Image 
                src="/wasiflow_logo_1.png" 
                alt="Wasiflow Logo" 
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <p className="text-slate-400 text-sm font-medium">© 2026 HS Xpert. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
