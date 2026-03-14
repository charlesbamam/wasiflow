"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { translations } from "@/lib/translations";
import { Header } from "@/components/Header";

export default function ArticlesPage() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const t = translations[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "pt" | "en";
    if (savedLang && savedLang !== lang) {
      setLang(savedLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans">
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          {/* Hero Section */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <span className="text-[#0E625E] font-bold uppercase tracking-[0.2em] text-[11px] mb-4 block">{t.blog.tag}</span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0B0B] mb-8">
              {t.blog.title}
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Explore conteúdos exclusivos sobre educação domiciliar e o universo infanto-juvenil.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.blog.posts.map((post, i) => (
              <article key={i} className="bg-white border border-[#E8E8E8] rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group">
                <div className="relative h-64 w-full overflow-hidden">
                   <Image 
                     src={post.image || "/homeschooling_basics_blog_1773502185608.png"} 
                     alt={post.title} 
                     fill 
                     className="object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                </div>
                <div className="p-8 flex flex-col flex-1 space-y-6">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#0E625E]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#0E625E]" />
                      <span>5 min ler</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-extrabold text-[#0B0B0B] leading-tight group-hover:text-[#0E625E] transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-500 font-medium leading-relaxed flex-1">
                    {post.desc}
                  </p>
                  
                  <div className="pt-6">
                    <Link 
                      href={`/artigos/${post.slug}`} 
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl text-[#0E625E] font-bold group-hover:bg-[#0E625E] group-hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                       {t.blog.cta} <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="py-20 bg-white border-t border-[#E8E8E8]">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
           <div className="mb-8 flex justify-center items-center gap-2">
            <div className="bg-[#0E625E] p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-[#0E625E] uppercase">HS XPERT</span>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
