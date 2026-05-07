'use client';

import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Filters from '../components/Filters';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [source, setSource] = useState('all');

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError('');

      const { data, error: requestError } = await supabase
        .from('news')
        .select('id,title,description,url,image_url,source,published_at')
        .order('published_at', { ascending: false, nullsFirst: false });

      if (requestError) {
        setError(requestError.message);
      } else {
        setArticles(data || []);
      }

      setLoading(false);
    }

    loadNews();
  }, []);

  const sources = useMemo(() => {
    return [...new Set(articles.map((article) => article.source).filter(Boolean))].sort();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSource = source === 'all' || article.source === source;
      const matchesSearch =
        !term ||
        article.title?.toLowerCase().includes(term) ||
        article.description?.toLowerCase().includes(term) ||
        article.source?.toLowerCase().includes(term);

      return matchesSource && matchesSearch;
    });
  }, [articles, search, source]);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_32rem),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.16),_transparent_28rem),#020617]">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Notícias públicas sobre Inteligência Artificial
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            O teu radar gratuito de notícias AI.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Agrega RSS públicos, remove duplicados por URL e envia alertas no Telegram quando encontra notícias novas.
          </p>
        </div>

        <Filters search={search} setSearch={setSearch} source={source} setSource={setSource} sources={sources} />

        <div className="mt-8 flex items-center justify-between text-sm text-slate-400">
          <p>{filteredArticles.length} notícia(s) encontrada(s)</p>
          <p>Ordenado por data, mais recentes primeiro</p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-500/10 p-6 text-red-100">
            Erro ao carregar notícias: {error}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <div className="text-5xl">🔎</div>
            <h2 className="mt-4 text-2xl font-bold text-white">Sem notícias para mostrar</h2>
            <p className="mt-2 text-slate-400">
              Executa <code className="rounded bg-white/10 px-2 py-1">node scripts/fetch-news.js</code> para popular a base de dados.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
