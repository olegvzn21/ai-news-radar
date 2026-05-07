export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm animate-fade-up md:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
          Sobre o projeto
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Sobre o AI News Radar
        </h1>

        <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
          <p>
            O <strong>AI News Radar</strong> é um projeto gratuito criado para facilitar
            o acesso às notícias mais recentes sobre Inteligência Artificial.
          </p>

          <p>
            O site agrega notícias a partir de fontes públicas e gratuitas via RSS,
            mostrando apenas informações essenciais como título, resumo curto, fonte,
            data, imagem quando disponível e link para o artigo original.
          </p>

          <p>
            Este projeto foi criado por <strong>@aiwith.oleg</strong> no Instagram,
            com o objetivo de tornar a informação sobre AI mais acessível, simples
            e centralizada.
          </p>

          <p>
            O AI News Radar é gratuito e continua a evoluir com melhorias de design,
            novas funcionalidades e conteúdos úteis para quem quer acompanhar o mundo
            da Inteligência Artificial.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-50 p-6">
          <p className="text-sm font-medium text-slate-900">
            Segue o projeto:
          </p>

          <a
            href="https://instagram.com/aiwith.oleg"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Ver @aiwith.oleg no Instagram
          </a>
        </div>
      </div>
    </main>
  );
}