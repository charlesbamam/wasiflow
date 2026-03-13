# Módulo de Billing, Stripe e Controle Founder (Prompt 07)

Este documento especifica os requisitos de negócio, monetização e infraestrutura de pagamentos (Stripe) do SaaS, focado principalmente nas regras do "Founder Plan".

---

## 1. O "Founder Plan" (Escopo de Assinatura)

As regras de negócios exclusivas para os pioneiros do SaaS (Founder Plan) são extremamente estritas em quantidade e tempo e devem ser aplicadas através de código, de forma sistêmica.

- **Limitador de Vagas**: Restrito a no máximo **100 famílias**.
- **Abertura Temporal**: Estará disponível por **60 dias**, ou seja, fechará quer bata os 100 usuários ou estoure o tempo (o que ocorrer primeiro).
- **Preço Fixo**: O valor pago nesta fase de adesão deve ser guardado (Snapshot) e mantido irredutível e imutável por um período cravado de **12 Meses**.
- **Migração Automática (A Grande Virada)**: Após ultrapassados os 12 meses de assinatura daquele cliente (Data fixada: `founder_expiration_date`), um gatilho sistêmico migrará o cliente automaticamente para o "Plano Vigente Superior/Atual", revogando o preço antigo.
- **Quota de Inteligência Artificial Fixada**: 500 requisições mensais ao assistente IA para assinantes fundadores. (Após alcançar a quota, o backend rejeitará o processamento da rota AI informando _limite_).

---

## 2. Abordagem no Banco de Dados (Postgres Supabase)

O esquema gerado no _Prompt 02_ cobriu essas mudanças e incluiremos explicitamente:

- **Tabela `plans`**:
  - `is_limited` (boolean): Determina que é uma vaga especial.
  - `max_subscriptions` (int): A trava contadora (100).
  - `available_until` (date): O prazo que expira e some da página o plano founder (+60d).
  - `migration_target_plan_id` (uuid): O destino obrigatório após 1 Ano.
- **Tabela `subscriptions`**:
  - `price_snapshot` e `plan_name_snapshot`: Caso futuramente mude-se nomenclaturas da tabela raiz.
  - `founder_expiration_date` (date): O exato dia e hora em que a "carruagem vira abóbora" e o preço pula (Adição de 12 meses na criacão).

---

## 3. Infraestrutura Stripe (Next.js backend)

### Checkout e Assinaturas

- Uso prático do _Stripe Checkout Session_ que gera uma página de pagamento externa transacional e blindada e retorna ao app com callback `/dashboard/subscription?status=success`.

### Webhooks Críticos

Os seguintes gatilhos devem ser observados obrigatoriamente através da rota da API `/api/webhooks/stripe` para manter o Supabase espelhado à verdade financeira:

1. `checkout.session.completed` -> Seta subscription.status como active.
2. `invoice.paid` -> Reconhece mensalidade pega, renova/reinicia quotas como a do ChatGPT (500 limit/mês).
3. `invoice.payment_failed` -> Seta `past_due` e aciona barra vermelha de suspensão.
4. `customer.subscription.deleted` -> Revoga acesso da família (Muda p/ `canceled`).
5. `customer.subscription.updated` -> Para acompanhar possíveis upgrades ou trocas de cartão.

---

## 4. O Dashboard do Super Admin x Billing

No acesso Master/Founders (`super_admin`), deve haver uma tela focada num Dashboard de Financeiro:

- Medidor atual: `XXX/100 Assinaturas Founder Preenchidas`.
- Volume de receita bruta esperada/mensal.
- Botão "Revogar Suspensão" ou "Forçar Cancelamento" de um cliente isolado em casos de suporte, que exigirá log do _super admin_ em `super_admin_audit_log` para ser efetivado.

---

## 5. Passos Práticos

1. Instalação e configuração do pacote `stripe` em servidor.
2. Criar tabela de configuração de produtos no Dashboard Oficial do Stripe e popular banco (`seed.sql`).
3. Construção da API pública capaz de bater no middleware validando o segredo via `stripe.webhooks.constructEvent()`.
4. Fluxos e verificações Cron Job / Worker que diária/mensalmente fará as migrações dos CPFs/Clientes que "baterem na trave" dos 12 meses finalizados.
