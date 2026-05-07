export default function Filters({ search, setSearch, source, setSource, sources }) {
  return (
    <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-glow md:grid-cols-[1fr_260px]">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-300">Pesquisar</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Ex.: OpenAI, Google, chips, agentes..."
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-cyan-300/30 placeholder:text-slate-600 focus:ring-4"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-300">Fonte</span>
        <select
          value={source}
          onChange={(event) => setSource(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-cyan-300/30 focus:ring-4"
        >
          <option value="all">Todas as fontes</option>
          {sources.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
