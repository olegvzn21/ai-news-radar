function formatDate(value) {
  if (!value) return 'Data desconhecida';

  return new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

export default function NewsCard({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
      aria-label={`Ler notícia: ${article.title}`}
    >
      {article.image_url ? (
        <div className="overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-slate-900 to-cyan-900 text-white">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
            <span className="absolute h-10 w-10 rounded-full border border-cyan-300/70" />
            <span className="h-4 w-4 rounded-full bg-cyan-300" />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-cyan-50 px-3 py-1 font-medium text-cyan-700">
            {article.source || 'Fonte desconhecida'}
          </span>
          <span>{formatDate(article.published_at)}</span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-cyan-700">
          {article.title}
        </h3>

        {article.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {article.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-slate-800">
            Ler notícia
          </span>
        </div>
      </div>
    </a>
  );
}