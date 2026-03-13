# Modelagem de Dados e Políticas RLS (Supabase)

Este documento contém a estruturação completa do banco de dados para o sistema HSxpert (SaaS Multi-tenant focado em Homeschooling), com foco nas tabelas, constraints, ENUMs e nas políticas de Row Level Security (RLS) voltadas ao isolamento do `family_id`. Também incluímos a estratégia de armazenamento (Buckets) e de trilhas de auditoria.

## 1. Enums Necessários

```sql
-- Role na família
CREATE TYPE user_role AS ENUM ('admin', 'assistant', 'student_viewer');

-- Status de convite
CREATE TYPE invite_status AS ENUM ('pending', 'accepted', 'expired');

-- Tipos de arquivos permitidos em evidências
CREATE TYPE evidence_file_type AS ENUM ('image/jpeg', 'image/png', 'image/webp', 'application/pdf');

-- Tipos de relatórios
CREATE TYPE report_type AS ENUM ('weekly', 'monthly', 'annual');

-- Status da Assinatura
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing');

-- Nível de escolaridade (Grade)
CREATE TYPE student_grade AS ENUM ('infantil', 'fund_1', 'fund_2', 'medio');

-----------------------------------------
-- FUNÇÕES UTILITÁRIAS ESSENCIAIS
-----------------------------------------

-- Função para atualizar a coluna updated_at automaticamente
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

```

---

## 2. Tabelas Obrigatórias

```sql
-- Extensão para o PGVector (buscas de RAG, IA, BNCC) e UID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-----------------------------------------
-- FAMÍLIAS E PLANOS
-----------------------------------------

CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    max_students INT NOT NULL DEFAULT 1,
    features JSONB
);

CREATE TABLE families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para automatizar o updated_at na tabela families
CREATE TRIGGER set_updated_at_families
BEFORE UPDATE ON families
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES plans(id),
    status subscription_status DEFAULT 'trialing',
    current_period_end TIMESTAMP WITH TIME ZONE,
    stripe_customer_id VARCHAR(100),
    stripe_subscription_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-----------------------------------------
-- USUÁRIOS, CONVITES E MEMBROS
-----------------------------------------

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para automatizar o updated_at na tabela users
CREATE TRIGGER set_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Criação do usuário automaticamente ao registrar no Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário ' || split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'admin',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(family_id, user_id)
);

CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'assistant',
    invited_by UUID NOT NULL REFERENCES users(id),
    status invite_status DEFAULT 'pending',
    token VARCHAR(100) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-----------------------------------------
-- ESTUDANTES E MATÉRIAS
-----------------------------------------

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    grade student_grade,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Student não tem login. Eles existem apenas como entidade dentro da family_id

CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-----------------------------------------
-- ATIVIDADES, LEITURAS E BNCC
-----------------------------------------

CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_completed DATE NOT NULL,
    points INT DEFAULT 0, -- gamificação básica
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE activity_evidence_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type evidence_file_type NOT NULL,
    file_size_bytes INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    book_title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    pages_read INT DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    date_logged DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE bncc_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL, -- ex: EF15AR01
    description TEXT NOT NULL,
    grade_level VARCHAR(50)
);

CREATE TABLE activity_bncc_tags (
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    bncc_tag_id UUID NOT NULL REFERENCES bncc_tags(id) ON DELETE CASCADE,
    PRIMARY KEY(activity_id, bncc_tag_id)
);

-----------------------------------------
-- RELATÓRIOS (STORAGE & METADADOS)
-----------------------------------------

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    type report_type NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    pdf_url TEXT NOT NULL,
    generated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-----------------------------------------
-- AUDITORIA E IA
-----------------------------------------

CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES families(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id UUID NOT NULL,
    before_state JSONB,
    after_state JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ai_usage_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    prompt_tokens INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    action_type VARCHAR(100), -- ex: 'chat', 'generate_report', 'analyze_evidence'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-----------------------------------------
-- SUPER ADMIN
-----------------------------------------

CREATE TABLE super_admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE super_admin_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    super_admin_id UUID NOT NULL REFERENCES super_admin_users(id),
    action VARCHAR(255) NOT NULL,
    target_family_id UUID,
    target_user_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 3. Políticas de App e Estratégia de RLS

A estratégia define que todos os dados organizacionais da aplicação são encapsulados pelo `family_id`.
Uma view ou função helper pode ser criada para buscar os family_ids de um usuário logado.

*Importante: Habilitar o RLS em todas as tabelas*.

```sql
-- Enable RLS
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_evidence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Helper Function para pegar ids das famílias do usuário logado
CREATE OR REPLACE FUNCTION get_user_family_ids()
RETURNS SETOF UUID AS $$
    SELECT family_id FROM family_members WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;


-- ==== FAMILIES ====
-- A família pode ser vista pelos seus membros OU por Super Admins
CREATE POLICY "View own family" ON families FOR SELECT
USING (id IN (SELECT get_user_family_ids()));

CREATE POLICY "Super Admins view all families" ON families FOR SELECT
USING (EXISTS (SELECT 1 FROM super_admin_users WHERE id = auth.uid()));


-- ==== FAMILY MEMBERS ====
-- Um usuário só vê outros membros da mesma família
CREATE POLICY "View members of own family" ON family_members FOR SELECT
USING (family_id IN (SELECT get_user_family_ids()));


-- ==== STUDENTS ====
CREATE POLICY "View students of own family" ON students FOR SELECT
USING (family_id IN (SELECT get_user_family_ids()));

CREATE POLICY "Manage students of own family" ON students FOR ALL
USING (family_id IN (SELECT get_user_family_ids()));


-- ==== ACTIVITIES ====
CREATE POLICY "Activities isolated by family" ON activities FOR ALL
USING (family_id IN (SELECT get_user_family_ids()));


-- ==== EVIDENCE FILES ====
CREATE POLICY "Evidences isolated by family" ON activity_evidence_files FOR ALL
USING (family_id IN (SELECT get_user_family_ids()));


-- ==== REPORTS ====
CREATE POLICY "Reports isolated by family" ON reports FOR ALL
USING (family_id IN (SELECT get_user_family_ids()));

-- NOTA: O mesmo padrão aplica-se às tabelas readings, subjects.

```

---

## 4. Estratégia de Buckets (Supabase Storage)

Precisamos de 2 Buckets com restrições e políticas de acesso adequadas.

**Bucket 1: `evidences`**

- Uso: Guardar os arquivos que comprovam a realização de atividades.
- Permissão de Upload: Arquivos limitados a `image/jpeg`, `image/png`, `image/webp` e `application/pdf`. Supabase permite restringir o mime-type na criação do bucket.
- RLS Policy:
  - SELECT: Autenticado && Usuário faz parte da `family_id` referenciada no caminho do arquivo (ex: `evidences/[family_id]/[student_id]/[file_name]`).
  - INSERT: Apenas a roles permitidas com mime-types validados e restrição de tamanho. O caminho do arquivo deve corresponder ao `family_id` do usuário.

**Bucket 2: `reports`**

- Uso: Guardar Relatórios criados (Semanal, Mensal, Anual).
- Permissão de Upload: Somente o servidor (através de Server Actions/API endpoint com role Service Role/Admin) deverá criar o upload do PDF, garantindo que o PDF do relatório só surja quando oficialmente gerado pela IA/sistema.
- Permissão de Leitura: Usuários pertencentes a `family_id` no caminho (ex: `reports/[family_id]/[ano_mes_arquivo].pdf`).

---

## 5. Exemplos de Queries Práticas

**1. Buscar todos os estudantes, com pontos totais obtidos nas atividades**

```sql
SELECT 
    s.id, s.full_name, 
    COALESCE(SUM(a.points), 0) as total_points
FROM students s
LEFT JOIN activities a ON s.id = a.student_id
WHERE s.family_id = 'A_UUID_DA_FAMILIA'
GROUP BY s.id;
```

**2. Listar Leituras Concluídas num Mês**

```sql
SELECT book_title, author, pages_read, date_logged 
FROM readings 
WHERE student_id = 'A_UUID_DO_ESTUDANTE'
  AND completed = true
  AND date_logged >= '2024-03-01'
  AND date_logged <= '2024-03-31';
```

**3. Auditoria: Listar as últimas 10 alterações de um usuário Assistant**

```sql
SELECT action, table_name, before_state, after_state, created_at
FROM audit_log
WHERE actor_id = 'A_UUID_DO_USUARIO_ASSISTANT'
ORDER BY created_at DESC
LIMIT 10;
```
