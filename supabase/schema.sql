create extension if not exists pgcrypto;

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text unique not null,
  image_url text,
  source text,
  published_at timestamptz,
  created_at timestamptz default now(),
  sent_to_telegram boolean default false
);

create index if not exists news_published_at_idx on public.news (published_at desc);
create index if not exists news_source_idx on public.news (source);

alter table public.news enable row level security;

-- Permite ao frontend ler notícias com a anon/publishable key.
-- Não permite inserir, alterar ou apagar no frontend.
create policy "Allow public read access to news"
  on public.news
  for select
  to anon
  using (true);
