"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-primary font-bold mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} /> Voltar para o início
        </Link>
        
        <h1 className="text-4xl font-black tracking-tighter mb-8 text-brand-primary">Termos de Uso</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 font-medium leading-relaxed">
          <p>
            Bem-vindo ao <strong>HS Xpert</strong>. Ao utilizar nosso serviço, você concorda com os termos abaixo descritos.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">1. Objeto do Serviço</h2>
            <p>
              O HS Xpert é uma plataforma SaaS destinada à organização e registro de atividades de homeschooling, oferecendo ferramentas de relatório e assistência por IA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">2. Responsabilidade Pedagógica</h2>
            <p>
              O conteúdo educacional inserido e a condução do ensino são de responsabilidade exclusiva dos pais ou responsáveis. A plataforma atua como ferramenta de suporte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Uso da Inteligência Artificial</h2>
            <p>
              A IA integrada serve para auxiliar no planejamento e organização. As respostas geradas não substituem orientação legal ou profissional específica e devem ser validadas pelo usuário.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">4. Planos e Pagamentos</h2>
            <p>
              O acesso às funcionalidades segue o plano assinado pelo usuário. Cancelamentos e reembolsos seguem as diretrizes previstas no Código de Defesa do Consumidor brasileiro.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
