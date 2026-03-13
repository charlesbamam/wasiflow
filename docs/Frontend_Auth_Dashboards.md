# Frontend: Auth e Dashboards (Prompt 03)

Este documento detalha a estrutura do frontend, os requisitos de interface, e a lógica de autenticação com base na stack (Next.js App Router, Supabase Auth, TailwindCSS + shadcn/ui) e idioma (PT-BR + EN), de forma a preparar o terreno para a codificação.

---

## 1. Estrutura de Pastas e Componentização

A arquitetura do frontend focada em componentização baseada em `shadcn/ui` seguirá a estrutura do "App Router" do Next.js. O código-fonte existirá na pasta `src/`.

```text
src/
├── app/
│   ├── [locale]/               # Dinâmica do i18n para suportar "pt-BR" e "en"
│   │   ├── (auth)/             # Rotas não-autenticadas
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboards)/       # Rotas protegidas mapeadas por Role
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx  # Sidebar e Header de Admin
│   │   │   │   ├── page.tsx    # Resumo Escolar + Quick actions
│   │   │   │   └── subjects/page.tsx
│   │   │   ├── assistant/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── student/
│   │   │   │   ├── layout.tsx  # Layout modo Criança (Sem navegação complexa)
│   │   │   │   └── page.tsx    # Tarefas gamificadas do dia
│   │   │   └── super-admin/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx    # Métricas globais
│   │   │       └── users/page.tsx
│   │   ├── api/                # Endpoints (auth callbacks, webhooks)
│   │   ├── layout.tsx          # Root Layout (Providers de i18n e Tema)
│   │   └── page.tsx            # Landing Page / Index
├── components/
│   ├── ui/                     # (Instalados via shadcn/ui) Button, Input, Card, Modal, etc.
│   ├── forms/                  # LoginForm, RegisterForm, InviteForm
│   ├── layouts/                # Header, Sidebar, Wrapper centralizados
│   └── dashboards/             # Componentes específicos por View (AdminSummary, StudentTasks, etc)
├── lib/
│   ├── supabase/               # Instâncias do Supabase (Client e Server)
│   ├── i18n/                   # Configuração e Dicionários (pt.json, en.json)
│   └── utils.ts                # merge de Tailwind classes (clsx + tailwind-merge)
├── hooks/                      # Hooks para auth-state, fetch dados do RLS, theme
└── types/                      # Interfaces para as queries do Supabase
```

---

## 2. Implementação da Autenticação

A Autenticação utilizará `Supabase Auth` e garantirá:

1. **Login com E-mail + Senha**: Focado em facilidade, validando diretamente na Rota `(auth)/login`.
2. **Onboarding Rápido (Registro)**:
   - Ao se registrar, o banco já criará uma conta vinculada ao e-mail.
   - Através dos *Database Triggers* definidos no prompt anterior, um `profile` (usuário) e uma inserção base para criar a sua própria `family_id` ocorrerá, definindo assim este novo usuário como `admin` de sua família.
3. **Proteção de Rotas (Middleware)**:
   - Um arquivo `middleware.ts` na raiz impedirá acessos a `/admin/*`, `/assistant/*` para não autenticados, ou redirecionará o usuário caso ele tente acessar painéis com perfis indevidos.

---

## 3. Interfaces Baseadas em Perfis (Role Dashboards)

### 3.1. Admin Dashboard (Família)

- Interface Master para os Pais/Responsáveis.
- **Header/Sidebar**: Acesso à Gestão de Estudantes, Disciplinas e Assistentes.
- **Home (`page.tsx`)**: Resumo Semanal/Mensal, Alertas de atividades pendentes.
- **Quick Action**: Botão destacado "Nova Atividade" que abre um modal rápido utilizando components do `shadcn/ui`.
- **Onboarding**: Card pendente na Home para "Criar o 1º Aluno" e "Adicionar as Primeiras Disciplinas".

### 3.2. Assistant Dashboard

- Destinado a co-professores ou ajudantes (convidados pelo Admin por e-mail).
- Têm acesso ao cronograma, lançamento de evidências e resumos da família, mas *não possuem menu de assinaturas, remoção da família ou de outros admins*.

### 3.3. Student (Modo Criança)

- Acesso sem Senha: O `admin` ou `assistant` clica em um botão na interface chamado "Painel Criança".
- **Visual**: Focado, fontes maiores, botões coloridos. Exibe visualização de conquistas (Gamefication simples) e Tarefas do Dia. Não pode apagar histórico.

### 3.4. Super Admin Dashboard

- Restrito ao fundador/donos da plataforma.
- Painel para checar: Famílias Cadastradas, status do faturamento (Stripe), e Botão de "Impersonation" para entrar em contas das famílias e depurar erros de suporte (Registrado através de log de auditoria `super_admin_audit_log`).

---

## 4. Requisitos de UX e Internacionalização (i18n)

- **UX/UI Minimalista e Focada**: Tema visual amigável e limpo, focado em educação e homeschooling (utilizando classes utilitárias do Tailwind).
- **Três cliques para Relatórios**: O processo de gerar evidências/relatórios será fluido sem menus complexos.
- **i18n**: Configuração através do `next-intl` (ou biblioteca similar). As strings "Login", "Welcome", "Assignments do Dia" estarão catalogadas em dicionários `pt.json` e `en.json`.

---

## 5. Próximos Passos Iniciais para Código

1. Tratar o problema de Permissão NPM no Macbook.
2. Iniciar o Scaffold do App via: `create-next-app` incorporando Tailwind.
3. Implantação de **Providers / i18n / Componentes Shadcn base** e integração da chave `NEXT_PUBLIC_SUPABASE_URL`.
