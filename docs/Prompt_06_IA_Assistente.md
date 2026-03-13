# Módulo de IA Assistente (Prompt 06)

Este documento dita a implementação de um assistente virtual dotado de Inteligência Artificial completo para o HSxpert, oferecendo chat contextual, geração de resumos, planos semanais, identificação de lacunas e categorização da BNCC.

---

## 1. Funcionalidades Obrigatórias (MVP)

### 1.1. Chat IA Geral (Família)

- Interface de Chat no Dashboard Administrativo.
- Responde dúvidas sobre a plataforma e tira dúvidas pedagógicas básicas do homeschooling.
- Funciona dentro do limite mensal de uso do plano contratado.

### 1.2. Chat Contextual por Estudante

- Chat ativado após a seleção específica de um estudante.
- **Injeção de Histórico**: A IA recebe o contexto das _últimas atividades do estudante_ no painel (em formato JSON formatado no backend).
- **Capacidades**: Capaz de diagnosticar o progresso focado naquele aluno e sugerir abordagens pedagógicas.

### 1.3. Geração de Plano Semanal

- Analisa atividades de períodos/semanas anteriores e as disciplinas configuradas.
- Verifica o equilíbrio (ex: poucas atividades de exatas).
- Produz uma tabela/lista de segunda a sexta com roteiros propostos.

### 1.4. Sugestão Inteligente de Tags BNCC

- No momento do Cadastro de uma Atividade (Prompt 04), de acordo com a descrição da atividade, a IA sugere códigos da base curricular (BNCC).
- O usuário deve aprovar explicitamente a tag sugerida. Não há preenchimento sem consentimento.

### 1.5. Identificação de Lacunas

- Analisa o mês selecionado procurando buracos na grade.
- Envia "Alertas Sugestivos" (não-impositivos/não-restritivos). Ex: "Notei que nas últimas 3 semanas não houve registros de Geografia".

---

## 2. Requisitos Técnicos e Estratégia de Contexto

- **Uso de Server Actions / APIs Seguras**: A comunicação com Serviços de IA (ex: OpenAI via `ai-sdk` / `Langchain`) deve ocorrer _sempre_ pelo backend (Node/Edge no Next.js). **Nenhuma chave de API no front**.
- **Log e Quota de Consumo**: Toda requisição e resposta gasta tokens; isso deve ser tabulado em `ai_usage_log`.
- **Estratégia de Envio de Contexto Segura**:
  - Respeitar janela de contexto: Enviar apenas atributos cruciais e com janelas temporais curtas.
  - O sistema Prompt Principal da inteligência artificial deve portar instruções sistêmicas explícitas: _"Sua função é auxiliar em abordagens educacionais e homeschooling. Nunca emita laudos, aconselhamento psicológico e jurídico."_

---

## 3. UI/UX e Permissões

### Controle de Perfil

- **Admin**: Acesso global às funções da IA e sugestões ativas.
- **Assistant**: Acesso restrito apenas ao "Chat Contextual" para auxílio de atividades na qual ele faz o input.
- **Student**: Não interage com IA (no MVP).
- **Super Admin**: Acesso à Dashboards GERAIS de uso consolidados do sistema inteiro em número de tokens.

### Integração Visual

- Chat limpo e claro.
- Interface contendo informações do limite de perguntas restantes na assinatura mensal ("X mensagens faltantes no ciclo").
- Toda resposta da inteligência precisa ser formatada com Markdown renderizável e botões de "Copiar Resposta" ao lado.
