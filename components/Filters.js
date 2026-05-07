export default function Filters({ search, setSearch, source, setSource, sources }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="grid gap-3 md:grid-cols-[1fr_260px]">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Pesquisar
          </label>

          <input
            type="text"
            placeholder="Pesquisar por palavra-chave..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Fonte
          </label>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="all">Todas as fontes</option>
            {sources.map((sourceName) => (
              <option key={sourceName} value={sourceName}>
                {sourceName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}