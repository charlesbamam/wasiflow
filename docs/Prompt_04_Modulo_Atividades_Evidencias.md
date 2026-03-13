# Módulo de Registro de Atividades e Evidências (Prompt 04)

Este documento define os requisitos funcionais e técnicos para o módulo responsável por gerenciar as atividades educacionais e suas respectivas evidências (arquivos, fotos, PDFs).

---

## 1. Escopo Funcional

### 1.1. Cadastro de Atividade

O fluxo de criação ou registro de atividade deve possuir as seguintes informações e capacidades:

- **Estudante**: Selecionar através de um dropdown/select qual aluno realizou a atividade.
- **Disciplina (Opcional)**: Vinculação com matérias cadastradas (ex: Matemática, Artes).
- **Tipo de Atividade**: Uma classificação através de ENUM (ex: Leitura, Excursão, Aula Prática, Exercício).
- **Título**: Descrição curta (opcional, pode ser inferido pelo tipo + disciplina).
- **Descritivo Diferenciado**: Texto detalhado da execução da atividade.
- **Data da Atividade**: Quando ocorreu.
- **Duração (Opcional)**: Tempo em minutos despendido.
- **Local (Opcional)**: Museu, Biblioteca, Jardim, etc.
- **Tags BNCC**: Seleção múltipla para associar códigos da Base Nacional Comum Curricular.

### 1.2. Upload de Evidências

- Validação no lado do cliente e backend limitando para os MIME types: `image/jpeg`, `image/png`, `image/webp` e `application/pdf`.
- **Compressão**: As imagens farão upload após um processo de compressão e redimensionamento no front/backend (utilizando `sharp` ou HTML5 Canvas dependendo da viabilidade).
- **Armazenamento**: Todos os uploads direcionados ao bucket privado `evidence_files`.
- **Validação de Quota**: Antes do upload, o sistema deve checar o limite armazenado da `family_id` com base no seu plano atual (Plano Essencial / Pro).
- **Acesso**: Apenas a aplicação gera URLs assinadas (Signed URLs) para que o navegador exiba as imagens restritas da família.

### 1.3. Listagem e Filtros

A listagem é a view principal de histórico:

- Cartões com visualização compacta e possibilidade de expansão.
- Filtros essenciais: Por estudante, Por período (Data Inicial/Final), Por disciplina e Por tipo de atividade.
- Ordenação nativa: Decrescente (Data mais recente no topo).

### 1.4. Edição, Exclusão e Auditoria

A trilha de auditoria é obrigatória.

- Edições geram registros em `audit_log`, salvando o antes (`before_state`) e o depois (`after_state`) do documento em JSON.
- O Histórico de alterações será exposto e visualizado apenas em contas no nível **Admin**.
- Permissões específicas:
  - **Admin**: Criar, Editar, Visualizar e Excluir.
  - **Assistant**: Criar e Editar. Restrito quanto a exclusão drástica de evidências antigas (flag a ser validada).
  - **Student**: Somente visualização gamificada, sem ações de edição.

---

## 2. Experiência de UX (Interface)

- **Botão Fixo Global**: Um "Floating Action Button" ou um botão de destaque superior no layout `Novo Registro`, disponível em todo o Dashboard Admin/Assistant.
- **UX de Upload**: Formulário que não parece maçante. Drag and Drop para anexar a evidência que gere um preview (thumbnail) imediato.
- **Feedback Visual**: Avisos claros tipo toast (ex: "Atividade registrada com sucesso").
- **Barra de Quota**: Exibir consumo do armazenamento do pacote atual discretamente no final do formulário ou na home.

---

## 3. Requisitos Técnicos de Implementação

- **Backend (Next.js)**: Utilização prioritária de *Server Actions* associadas ao `@supabase/ssr` para CRUD seguro validando o usuário e sua `family_id` pelo Auth.
- **Isolamento de Buckets**: O bucket `evidence_files` nunca deve possibilitar leitura pública `public: false`.
- **Políticas em Evidência (RLS)**: Cada requisição SQL de inserção precisa bater nas tags de RLS previamente informadas (são isoladas por family_id).
- **Lógica de Quota**: Um serviço que soma a coluna `file_size_bytes` de `activity_evidence_files` para autorizar a requisição.

---

## 4. Entregáveis Planejados para o Desenvolvimento

1. Componente formulário (`ActivityRecordForm.tsx`) interligado com o uploader.
2. Componentes Server-side (`actions/activities.ts` e `actions/storage.ts`).
3. View de Timeline (`Timeline.tsx`) ou Data Table para explorar as atividades do aluno.
4. Lógica que impede o upload caso o Plano esteja com o storage excedido ou se a subscription for `'canceled'`.
5. Middlewares e restrições RLS em operação validada.
