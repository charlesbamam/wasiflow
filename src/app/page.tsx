"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Menu, 
  X, 
  Zap, 
  Shield, 
  Brain,
  Users
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Produto", href: "#features" },
    { name: "Histórias", href: "#stories" },
    { name: "Preços", href: "#pricing" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black selection:bg-purple-100 overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-[100] glass h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-md">
        <div className="flex items-center gap-2 group cursor-pointer relative z-[110]">
          <div className="bg-black p-1.5 rounded-lg transition-transform group-hover:scale-105 duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter italic">
            HS XPERT
          </span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-sm font-bold text-slate-500 hover:text-black transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 relative z-[110]">
          <Link href="/login" className="hidden lg:block">
            <span className="text-sm font-bold text-slate-500 hover:text-black cursor-pointer px-4">Entrar</span>
          </Link>
          <div className="hidden lg:block">
            <Link href="/register">
              <Button className="bg-black hover:bg-slate-800 text-white rounded-full px-6 md:px-8 h-10 md:h-12 font-bold shadow-xl transition-transform hover:scale-105 active:scale-95 duration-200">
                Começar Agora
              </Button>
            </Link>
          </div>
          
          <button 
            onClick={toggleMenu} 
            className="lg:hidden p-2 text-black cursor-pointer relative z-[130] transition-colors hover:text-purple-600" 
            aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-[120] lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-10 p-6 overscroll-contain">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-4xl font-black tracking-tighter hover:text-purple-600 transition-colors"
                style={{ transitionDelay: isMenuOpen ? '100ms' : '0ms' }}
              >
                {item.name}
              </Link>
            ))}
            <div className="w-full max-w-xs flex flex-col gap-4">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                <Button variant="outline" className="w-full h-14 rounded-full text-lg font-bold border-slate-200 bg-white hover:bg-slate-50">Entrar</Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                <Button className="w-full h-14 rounded-full text-lg font-bold bg-black text-white hover:bg-slate-800">Começar Agora</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* HERO SECTION */}
        <section className="relative px-6 pt-24 pb-32 lg:pt-40 lg:pb-56">
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <div className="reveal inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full text-[13px] font-bold mb-8">
              <span className="inline-block w-2 h-2 rounded-full animate-pulse bg-[#ff2d92]" />
              Novo: Planejamento Inteligente com IA 2.0
            </div>
            
            <h1 className="reveal stagger-1 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-10 max-w-4xl mx-auto">
              Gestão educacional <br />
              <span className="text-gradient-vibrant italic">descomplicada</span>
            </h1>
            
            <p className="reveal stagger-2 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Simplifique o registro de atividades, acompanhe o progresso e gere relatórios completos de homeschooling para sua família.
            </p>
            
            <div className="reveal stagger-3 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="bg-black hover:bg-slate-800 text-white rounded-full px-12 h-16 text-xl font-bold shadow-2xl transition-transform hover:scale-105 active:scale-95 duration-200 w-full sm:w-auto">
                  Teste Grátis
                </Button>
              </Link>
              <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-slate-100 bg-white shadow-sm">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 shadow-inner" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-400">Usado por <span className="text-black">500+</span> famílias</span>
              </div>
            </div>
          </div>

          {/* Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-[1000px] aspect-square bg-gradient-to-tr from-[#ff2d92]/5 via-[#9d00ff]/5 to-[#00f2ff]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        </section>

        {/* DASHBOARD PREVIEW */}
        <section className="px-6 pb-32 md:pb-40">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2d92] via-[#9d00ff] to-[#00f2ff] rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative bg-white border border-slate-100 rounded-[3rem] p-3 md:p-8 shadow-2xl overflow-hidden glow-purple">
                <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-50 relative">
                  <Image 
                    src="/hero-dashboard.png" 
                    alt="Dashboard HS Xpert" 
                    width={1400} 
                    height={800}
                    priority
                    className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-[1.01]"
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-[10%] -right-4 md:right-[2%] z-20 floating-ui hidden md:block">
                     <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/50 w-[240px]">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-[#9d00ff] p-2 rounded-xl shadow-lg shadow-purple-200"><Zap className="w-4 h-4 text-white" /></div>
                          <p className="font-black text-[13px] tracking-tight italic">Insight de IA</p>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                          Clara está evoluindo em botânica! Sugerimos uma aula prática de plantio amanhã.
                        </p>
                     </div>
                  </div>

                  <div className="absolute bottom-[8%] -left-4 md:left-[2%] z-20 floating-ui [animation-delay:2s] hidden md:block">
                    <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-2xl border border-white/50 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#ff2d92] animate-pulse" />
                      <p className="font-bold text-[11px]">Relatório MEC Pronto • <span className="text-[#ff2d92] cursor-pointer">Baixar</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID */}
        <section className="py-24 md:py-40 bg-slate-50/40" id="features">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="reveal text-center mb-16 md:mb-24 max-w-3xl mx-auto">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-[#9d00ff]">Motor Principal</h2>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                Tudo o que você precisa para <span className="text-gradient-vibrant italic">evoluir</span>
              </h3>
            </div>

            <div className="bento-grid">
              {/* Card 1 */}
              <div className="reveal bento-card md:col-span-8 flex flex-col justify-between min-h-[340px]">
                <div className="max-w-md">
                  <div className="bg-white p-3 rounded-2xl w-fit shadow-sm border border-slate-100 mb-6"><Zap className="w-6 h-6 text-[#ff2d92]" /></div>
                  <h4 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 italic">Registro Instantâneo</h4>
                  <p className="text-slate-500 font-medium">Capture evidências por voz, foto ou texto em segundos. Nós fazemos todo o trabalho pesado de organização.</p>
                </div>
                <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/30 to-transparent pointer-events-none" />
              </div>

              {/* Card 2 */}
              <div className="reveal stagger-1 bento-card md:col-span-4 flex flex-col justify-center text-center items-center">
                <div className="bg-white p-3 rounded-2xl w-fit shadow-sm border border-slate-100 mb-6"><Shield className="w-6 h-6 text-[#9d00ff]" /></div>
                <h4 className="text-xl font-black tracking-tighter mb-3 italic">Conformidade Legal</h4>
                <p className="text-slate-500 text-sm font-medium">Relatórios prontos para o MEC ou Conselhos Tutelares.</p>
              </div>

              {/* Card 3 */}
              <div className="reveal bento-card md:col-span-4 flex flex-col items-center text-center">
                <div className="bg-white p-3 rounded-2xl w-fit shadow-sm border border-slate-100 mb-6"><Brain className="w-6 h-6 text-[#00f2ff]" /></div>
                <h4 className="text-xl font-black tracking-tighter mb-3 italic">IA Pedagógica</h4>
                <p className="text-slate-500 text-sm font-medium">Sugestões diárias baseadas no estilo do seu filho.</p>
              </div>

              {/* Card 4 */}
              <div className="reveal stagger-1 bento-card md:col-span-8 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-2xl w-fit shadow-sm border border-slate-100 mb-6"><Users className="w-6 h-6 text-[#ff8c00]" /></div>
                  <h4 className="text-2xl font-black tracking-tighter mb-4 italic">Gestão da Família</h4>
                  <p className="text-slate-500 font-medium">Um único painel para todos os filhos. Acompanhe a rotina e o progresso em tempo real.</p>
                </div>
                <div className="flex-1 w-full bg-white/50 rounded-2xl p-4 border border-slate-100 h-32 flex flex-col justify-center gap-3">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#ff2d92] w-[70%]" /></div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#9d00ff] w-[45%]" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 md:py-48 relative px-6">
          <div className="reveal container mx-auto max-w-5xl">
            <div className="bg-black rounded-[3rem] md:rounded-[4rem] px-8 py-20 md:py-32 text-center text-white relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000">
                 <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#9d00ff] rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 font-sans" />
                 <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ff2d92] rounded-full blur-[140px] translate-x-1/2 translate-y-1/2" />
              </div>
              
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-10 relative z-10">
                O futuro do <br />
                <span className="text-[#00f2ff] italic font-medium">homeschooling</span> é aqui.
              </h2>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-14 relative z-10 font-medium leading-relaxed italic">
                Liberte-se da burocracia e foque no aprendizado que realmente importa para seus filhos.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-white hover:bg-slate-100 text-black rounded-full px-16 h-20 text-2xl font-black shadow-2xl transition-transform hover:scale-105 active:scale-95 duration-200">
                    Começar Agora
                  </Button>
                </Link>
                <div className="flex flex-col items-center sm:items-start">
                   <div className="flex gap-1 text-[#00f2ff]">
                      {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-5 h-5 fill-current" />)}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2 italic">Nota 4.9/5 por mais de 500 famílias</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-white border-t border-slate-100 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6 group cursor-pointer">
                <div className="bg-black p-1 rounded-md"><Sparkles className="w-4 h-4 text-white" /></div>
                <span className="font-extrabold text-xl tracking-tighter italic">HS XPERT</span>
              </div>
              <p className="text-slate-400 font-medium text-sm leading-relaxed italic">
                Simplificando o lado administrativo do homeschooling para que você foque no que mais importa: seus filhos.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
              <div className="flex flex-col gap-4">
                <h5 className="font-bold text-xs uppercase tracking-widest text-slate-300 mb-2">Produto</h5>
                <Link href="#" className="text-sm font-bold text-slate-600 hover:text-black">Recursos</Link>
                <Link href="#" className="text-sm font-bold text-slate-600 hover:text-black">Conformidade</Link>
                <Link href="#" className="text-sm font-bold text-slate-600 hover:text-black">IA Guia</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="font-bold text-xs uppercase tracking-widest text-slate-300 mb-2">Empresa</h5>
                <Link href="#" className="text-sm font-bold text-slate-600 hover:text-black">Sobre</Link>
                <Link href="#" className="text-sm font-bold text-slate-600 hover:text-black">Termos</Link>
                <Link href="#" className="text-sm font-bold text-slate-600 hover:text-black">Suporte</Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-slate-50">
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
              © 2026 HS XPERT • TODOS OS DIREITOS RESERVADOS
            </p>
            <div className="flex gap-8">
               <span className="text-[10px] font-black text-slate-300 hover:text-black cursor-pointer uppercase tracking-widest">EN</span>
               <span className="text-[10px] font-black text-slate-900 hover:text-black cursor-pointer uppercase tracking-widest underline decoration-purple-500">PT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
