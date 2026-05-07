# AI News Radar

MVP gratuito que agrega notícias recentes sobre Inteligência Artificial via RSS públicos, guarda no Supabase, mostra num frontend Next.js e envia uma mensagem para Telegram quando aparece uma notícia nova.

## Stack

- Frontend: Next.js App Router
- Styling: Tailwind CSS
- Base de dados: Supabase Free
- Hosting: Vercel Free
- Scheduler: GitHub Actions gratuito
- Notícias: RSS feeds públicos gratuitos
- Notificações: Telegram Bot API gratuita

## O que o projeto faz

- Lê RSS feeds públicos sobre AI.
- Guarda apenas metadados: título, resumo curto, fonte, data, imagem e link original.
- Não copia artigos completos.
- Evita duplicados usando a coluna `url` com `unique`.
- Envia Telegram apenas quando a notícia ainda não existe na base de dados.
- Mostra notícias com pesquisa, filtro por fonte, loading e estado vazio.

## Estrutura de pastas

```txt
ai-news-radar/
  .github/workflows/fetch-news.yml
  app/
    about/page.js
    globals.css
    layout.js
    page.js
  components/
    Filters.js
    Footer.js
    Header.js
    NewsCard.js
  lib/
    supabaseClient.js
  scripts/
    fetch-news.js
  supabase/
    schema.sql
  .env.example
  .gitignore
  next.config.mjs
  package.json
  postcss.config.js
  tailwind.config.js
  README.md
```

## Instalação local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre: http://localhost:3000

## Testar o script localmente

Depois de preencher as variáveis no `.env.local` ou num ficheiro `.env`:

```bash
node scripts/fetch-news.js
```

## Variáveis de ambiente

Frontend/Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Script/GitHub Actions:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Nunca exponhas `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN` ou `TELEGRAM_CHAT_ID` no frontend.

## SQL Supabase

Copia o conteúdo de `supabase/schema.sql` para o SQL Editor do Supabase e executa.

## GitHub Actions

O workflow `.github/workflows/fetch-news.yml` corre:

- automaticamente a cada 30 minutos;
- manualmente através de `workflow_dispatch`.

Define estes GitHub Secrets:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Deploy gratuito na Vercel

1. Faz push do projeto para GitHub.
2. Importa o repositório na Vercel.
3. Escolhe Framework Preset: Next.js.
4. Adiciona as variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Faz deploy.

## Feeds usados

- https://techcrunch.com/category/artificial-intelligence/feed/
- https://www.theverge.com/ai-artificial-intelligence/rss/index.xml
- https://venturebeat.com/category/ai/feed/
- https://www.artificialintelligence-news.com/feed/
- https://www.technologyreview.com/topic/artificial-intelligence/feed/
