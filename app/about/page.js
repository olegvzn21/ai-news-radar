import Footer from '../../components/Footer';
import Header from '../../components/Header';

export const metadata = {
  title: 'Sobre | AI News Radar'
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30rem),#020617]">
      <Header />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-glow sm:p-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">Sobre</p>
          <h1 className="text-4xl font-black tracking-tight text-white">AI News Radar</h1>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
            <p>
              O AI News Radar é um MVP gratuito que agrega notícias públicas sobre Inteligência Artificial usando feeds RSS.
            </p>
            <p>
              O site não copia artigos completos. Mostra apenas título, resumo curto, fonte, data, imagem quando disponível e um link para o artigo original.
            </p>
            <p>
              As notícias são guardadas no Supabase, publicadas no frontend em Next.js e verificadas automaticamente por GitHub Actions. Quando surge uma URL nova, o projeto envia uma notificação para Telegram.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
