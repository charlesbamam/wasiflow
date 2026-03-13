# Arquitetura do HSxpert (MVP)

Este documento define a arquitetura, estrutura, tabelas e plano de implementação para o SaaS HSxpert, baseado nas tecnologias solicitadas (Next.js App Router, Supabase Auth + Postgres + Storage + RLS, e Vercel para deploy).

## 1. Módulos do Sistema

1. **Módulo de Autenticação e Multi-tenancy**:
   - Integração com Supabase Auth.
   - Compartilhamento de base de dados isolada por `family_id` (RLS).
   - Controle de perfis: `super_admin`, `admin`, `assistant`, e `student` (este último sem login próprio, sendo um perfil focado em experiência/view controlada pelo admin).

2. **Módulo de Dashboards**:
   - **Super Admin**: Visão global da plataforma (Métricas de uso, Receita, Contas).
   - **Admin (Família)**: Visão completa do desempenho dos estudantes, gestão da conta da família, planos, faturas e controle parental.
   - **Assistant (Família)**: Visão operacional para auxílio no ensino, envio de evidências e auxílio na avaliação.
   - **Student**: Tela unicamente visual e gamificada exibida através da conta de um adulto, contendo as metas, tarefas concluídas e conquistas temporais.

3. **Módulo de Evidências e Arquivos (Storage)**:
   - Upload de evidências (trabalhos, fotos, avaliações).
   - Validação de tipos mime: `image/*` e `application/pdf`.
   - Pipeline de compressão automática de imagens (ex: via server action no Next.js usando `sharp` antes do upload para o Supabase Storage).

4. **Módulo de Relatórios**:
   - Geração de PDF no lado do servidor (ex: Puppeteer/Playwright ou `react-pdf`).
   - Armazenamento do relatorio finalizado no Supabase Storage.
   - Tabela `reports` para consultar os metadados do documento, url do arquivo, data, referente ao estudante, etc.

5. **Módulo IA Assistente**:
   - Integração com LLM (ex: OpenAI GPT-4) atuando no backend.
   - Capacidade de chat geral, chat com contexto alimentado pelos dados do estudante, avaliações e período.
   - Preparação para receber RAG (Retrieval-Augmented Generation) integrando embeddings no Postgres (pgvector) baseado na BNCC, legislação de homeschooling e ajuda do aplicativo.

6. **Módulo Super Admin Estrutural**:
   - Gestão global de famílias.
   - Impersonation (assumir a conta de um usuário para suporte) auditado através de logs rigorosos e JWT roles customizados.
   - Configurações e integrações externas (Stripe, etc.).

---

## 2. Estrutura de Pastas (Next.js App Router)

```text
hs-xpert/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Rotas públicas de login/cadastro
│   │   ├── (dashboards)/
│   │   │   ├── admin/          # Dashboard Admin Família
│   │   │   ├── assistant/      # Dashboard Assistant
│   │   │   ├── student/        # Visão simplificada (controlado por sessão de outro acesso)
│   │   │   └── super-admin/    # Painel Global Super Admin
│   │   ├── api/                # Rotas de API (ex: Webhooks, geração PDF, Chat IA)
│   │   ├── layout.tsx
│   │   └── page.tsx            # Landing Page
│   ├── components/
│   │   ├── ui/                 # Componentes genéricos (shadcn/ui, botões, inputs, modais)
│   │   ├── auth/               # Formulários de autenticação
│   │   ├── shared/             # Header, Sidebar, Uploaders
│   │   └── ai/                 # Componente do Chat IA Assistente
│   ├── lib/
│   │   ├── supabase/           # Clientes do Supabase (Server, Client e Admin)
│   │   ├── ai/                 # Configuração RAG e chamadas p/ LLM
│   │   ├── reports/            # Lógica de geração de PDF
│   │   └── utils.ts            # Utilidades em geral
│   └── types/                  # Tipagens TypeScript (Database, App)
├── supabase/
│   ├── migrations/             # Arquivos SQL das migrações
│   └── seed.sql                # Dados iniciais para DEV
├── public/                     # Assets públicos
├── next.config.mjs
└── package.json
```

---

## 3. Visão Geral das Tabelas (Postgres)

- **`profiles`** (Extensão da tabela auth.users):
  - `id` (uuid, references auth.users)
  - `family_id` (uuid, references families)
  - `role` (enum: 'super_admin', 'admin', 'assistant')
  - `full_name`, `avatar_url`

- **`families`**:
  - `id` (uuid, PK)
  - `name` (string)
  - `subscription_status` (string)

- **`students`**:
  - `id` (uuid, PK)
  - `family_id` (uuid, references families)
  - `full_name`, `birth_date`, `grade`, `avatar_url`

- **`evidences`**:
  - `id` (uuid, PK)
  - `student_id` (uuid, references students)
  - `family_id` (uuid, references families)
  - `file_url`, `file_type`, `size`
  - `description`, `created_at`

- **`reports`**:
  - `id` (uuid, PK)
  - `student_id` (uuid)
  - `family_id` (uuid)
  - `pdf_url` (reference storage)
  - `period_start`, `period_end`, `created_at`

- **`audit_logs`** (Para Impersonation e ações globais):
  - `id`, `actor_id`, `action`, `target_id`, `details`, `created_at`

- **`knowledge_base`** (Opcional p/ o RAG / IA usando pgvector):
  - `id`, `content` (text), `embedding` (vector)

---

## 4. Estratégia de RLS (Row Level Security)

Toda a política de segurança baseia-se em extrair o `family_id` do perfil do usuário logado via **Supabase Custom Claims** ou via **auth.uid()** na tabela de profiles.

**Exemplo de Política:**
1. A tabela `families` só é legível para usuários cuja `profile.family_id` seja o mesmo ou se o usuário for `super_admin`.
2. As tabelas secundárias (`students`, `evidences`, `reports`) terão políticas condicionadas do tipo:
   `auth.uid() IN (SELECT id FROM profiles WHERE family_id = evidences.family_id)`
3. **Super Admin**: Ignora RLS através da verificação do JWT claim de super-admin ou usando o `service_role` apenas em rotas exclusivas do painel `super-admin`.
4. **Student**: Como não faz login de fato (utiliza um acesso "pinado" ou troca de ambiente em uma sessão admin/assistant), a visualização dos dados daquele estudante usa a segurança e tokens da conta "host" atual.

---

## 5. Plano de Implementação por Etapas

### Fase 1: Fundação & Autenticação (Semanas 1-2)
- [ ] Configuração do Next.js App Router e Vercel.
- [ ] Configuração do projeto no Supabase.
- [ ] Implementação de Authentication e migrações iniciais de schema (`families` e `profiles`).
- [ ] Criação de triggers no Postgres para inserção automática em `profiles` pós sign-up.
- [ ] Configuração e validação do Row Level Security (RLS) para base multi-tenant.

### Fase 2: Estrutura Base & Dashboards (Semanas 3-4)
- [ ] Componentes de UI (usando Tailwind e shadcn/ui).
- [ ] Criação dos Dashboards base com suas barras de navegação (Admin, Assistant e visão do Student).
- [ ] CRUD de estudantes (`students`) na conta da Família.
- [ ] Testes de isolamento multi-tenant (garantir que uma família não vê os dados da outra).

### Fase 3: Evidências & Storage (Semana 5)
- [ ] Criação de buckets e políticas RLS para os buckets do Supabase Storage.
- [ ] API routes para compressão de imagens via servidor usando `sharp`.
- [ ] Flow de upload e integração associando arquivo à tabela `evidences`.

### Fase 4: Relatórios PDF & Metadados (Semana 6-7)
- [ ] Endpoint de server-side rendering para PDF HTML->PDF na nuvem (`react-pdf` ou api browserless para puppeteer).
- [ ] Salvamento automático no bucket de relatórios do Supabase.
- [ ] Atualização da tabela `reports`.

### Fase 5: Inteligência Artificial (Semana 7-8)
- [ ] Implantação de endpoint para o Chat IA (usando Vercel AI SDK e LLM de escolha).
- [ ] Função para injetar dinamicamente contexto de estudantes (progresso escolar e metadados diários) nos prompts do sistema.
- [ ] Setup da base de banco vetorial com `pgvector` inicial para leitura da BNCC.

### Fase 6: Super Admin & Acabamentos (Semana 9)
- [ ] Dashboard Super Admin com gerência global de acesso e visualização.
- [ ] Sistema de Impersonation auditado.
- [ ] Gestão de planos/Setup de integração de pagamentos (Stripe).
- [ ] Polimento, otimização SEO técnica, e Deploy de produção final.
