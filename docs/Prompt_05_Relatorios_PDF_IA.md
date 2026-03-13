# Módulo de Relatórios PDF e IA Narrativa (Prompt 05)

Este documento detalha o módulo de geração de relatórios estruturados (semanal, mensal e anual) com geração de PDF no lado do servidor (server-side), e armazenamento no Supabase Storage. Ele também inclui a especificação da IA Narrativa para resumos.

---

## 1. Tipos de Relatórios e Estrutura (MVP)

Os modelos fixos de relatórios suportados inicialmente são:

- **Weekly** (Semanal)
- **Monthly** (Mensal)
- **Annual** (Anual)

### Estrutura Obrigatória do Documento (PDF)

1. **Identificação do Estudante**: Nome completo e Período abrangido.
2. **Diário / Log de Atividades**: Lista cronológica contendo Data, Tipo, Disciplina, Duração e Descrição.
3. **Leituras Realizadas**: Listagem de Livros, Artigos e Sites educativos consumidos.
4. **Visitas e Atividades Externas**: Locais visitados (Museus, Bibliotecas, Feiras, Campo).
5. **Recursos Audiovisuais**: Vídeos, Documentários e Plataformas utilizadas.
6. **Produções do Aluno**: Evidências textuais (Redações), Exercícios, Projetos, Artes, Mapas mentais e Capturas de tela.
7. **Desenvolvimento e Observações**:
   - **Resumo Narrativo (Opcional via IA)**
   - Dificuldades encontradas e superação
   - Desenvolvimento de habilidades socioemocionais
   - Participação social (Igreja, Grupos Homeschool)
   - Atividades físicas/esportivas e Talentos (idiomas, música).

---

## 2. Requisitos Técnicos de Geração (PDF & Storage)

- **Geração Server-Side**: O PDF não deve ser gerado no navegador do cliente (client-side) por motivos de segurança e padronização visual. O frontend enviará os dados estruturados para uma **API Route** no Next.js (utilizando bibliotecas como `@react-pdf/renderer` ou Puppeteer via Vercel).
- **Armazenamento Privado**: Após a geração, o arquivo `.pdf` gerado deve ser salvo no bucket `report_files` da família. O acesso e download do documento sempre ocorrerá através de URLs Assinadas (Signed URLs).
- **Metadados**: É obrigatório registrar a geração na tabela `reports` com o `pdf_url` (caminho no bucket), datas do período e o id do autor (Admin/Assistant).
- **Controle de Quota**: Validar tamanho de armazenamento antes da geração.

---

## 3. Integração com IA Narrativa

A geração de um "Resumo de Desenvolvimento" pode ser auxiliada por Inteligência Artificial.

- **Contexto Seguro**: A IA não recebe textos soltos de todo o banco. Ela deve receber um *JSON estruturado* daquele período selecionado para formulação educacional.
- **Re-geração**: O documento final pode ser re-gerado, consumindo da quota de requisições IA da assinatura.
- **Log de Uso**: Toda geração narrativa pela IA insere um log na tabela `ai_usage_log`.

---

## 4. UX e Permissões

### Permissões

- **Admin**: Pode gerar, ler, baixar e excluir relatórios antigos.
- **Assistant**: Pode gerar, ler e baixar relatórios (mas **não** possui permissão de exclusão - *Soft Delete Lock*).
- **Student**: Possui acesso restrito de visualização de versão resumida se disponibilizada através do painel.

### UX (Experiência do Usuário)

- Ação pautada em no **máximo 3 cliques**:
  1. Acessa o menu "Relatórios".
  2. Seleciona o aluno e o período no calendário.
  3. Clica em "Gerar PDF".
- Antes de consolidar o arquivo PDF no storage, o sistema deve fornecer uma **Prévia (Preview)** na tela para aprovação de textos narrativos e conferência.
- O botão de geração deve informar quando a ação consome dos limites do plano (`ai_usage`).

---

## 5. Entregáveis

- Serviço Backend Next.js para renderização de HTML/React para PDF.
- Serviço de upload direto do servidor para o Supabase Storage.
- Componente de Formulário gerador com visualização prévia das atividades do período.
- Inserções da auditoria logada das execuções.
