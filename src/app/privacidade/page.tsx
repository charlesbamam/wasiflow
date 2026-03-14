"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-primary font-bold mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} /> Voltar para o início
        </Link>
        
        <h1 className="text-4xl font-black tracking-tighter mb-8 text-brand-primary">Política de Privacidade</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 font-medium leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como o <strong>HS Xpert</strong> coleta, usa e protege as informações dos usuários, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">1. Coleta de Dados</h2>
            <p>
              Coletamos apenas os dados necessários para o funcionamento da plataforma, como nome, e-mail e dados básicos de registro educacional inseridos voluntariamente pelos pais ou responsáveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">2. Uso das Informações</h2>
            <p>
              Os dados são utilizados exclusivamente para as finalidades educacionais do sistema: geração de relatórios, acompanhamento de progresso e personalização via Inteligência Artificial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizativas de segurança para proteger seus dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">4. Seus Direitos</h2>
            <p>
              Conforme a LGPD, você tem direito ao acesso, correção, eliminação e portabilidade dos seus dados. Basta entrar em contato conosco pelo suporte.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
