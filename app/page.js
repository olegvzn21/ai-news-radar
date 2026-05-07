'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Filters from '@/components/Filters';
import NewsCard from '@/components/NewsCard';
import NewsletterForm from '@/components/NewsletterForm';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState('');
  const [source, setSource] = useState('all');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setErrorMessage('');

      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        setErrorMessage('Não foi possível carregar as notícias.');
        setNews([]);
        setSources([]);
      } else {
        const items = data || [];
        setNews(items);

        const uniqueSources = [...new Set(items.map((item) => item.source).filter(Boolean))].sort();
        setSources(uniqueSources);
      }

      setLoading(false);
    }

    loadNews();
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        !search ||
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.source?.toLowerCase().includes(search.toLowerCase());

      const matchesSource = source === 'all' || item.source === source;

      return matchesSearch && matchesSource;
    });
  }, [news, search, source]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6 py-12 text-white shadow-xl md:px-10 md:py-16 animate-fade-in">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            AI News Radar
          </p>

          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight md:text-5xl">
            As notícias mais recentes sobre Inteligência Artificial, num só lugar.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
            Acompanha novidades de AI a partir de fontes públicas, reunidas num layout simples,
            rápido e fácil de usar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
              RSS públicos
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
              Atualizado automaticamente
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
              Gratuito
            </span>
          </div>
        </div>
      </section>

      <NewsletterForm />

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Radar de notícias
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Últimas notícias
          </h2>
        </div>

        <Filters
          search={search}
          setSearch={setSearch}
          source={source}
          setSource={setSource}
          sources={sources}
        />

        {loading && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="h-36 rounded-2xl bg-slate-200" />
                <div className="mt-5 h-4 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                <div className="mt-3 h-4 w-5/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {!loading && errorMessage && (
          <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            {errorMessage}
          </div>
        )}

        {!loading && !errorMessage && filteredNews.length === 0 && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Ainda não há notícias para mostrar.
            </h3>
            <p className="mt-2 text-slate-600">
              Tenta mudar a pesquisa, escolher outra fonte ou correr a automação novamente.
            </p>
          </div>
        )}

        {!loading && !errorMessage && filteredNews.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}