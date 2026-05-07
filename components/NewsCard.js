export default function NewsCard({ article }) {
  const date = article.published_at
    ? new Intl.DateTimeFormat('pt-PT', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(article.published_at))
    : 'Data desconhecida';

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-glow transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06]">
      {article.image_url ? (
        <div className="h-48 overflow-hidden bg-slate-900">
          <img
            src={article.image_url}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-violet-500/15">
          <span className="text-5xl">🛰️</span>
        </div>
      )}
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 font-medium text-cyan-200 ring-1 ring-cyan-300/20">
            {article.source || 'Fonte desconhecida'}
          </span>
          <span>{date}</span>
        </div>
        <h2 className="text-xl font-semibold leading-snug text-white">{article.title}</h2>
        {article.description ? (
          <p className="line-clamp-3 text-sm leading-6 text-slate-300">{article.description}</p>
        ) : (
          <p className="text-sm leading-6 text-slate-500">Sem resumo no RSS.</p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
        >
          Ler notícia →
        </a>
      </div>
    </article>
  );
}
