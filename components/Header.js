import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 shadow-lg transition duration-300 hover:scale-105">
            <span className="absolute h-7 w-7 rounded-full border border-cyan-300/70" />
            <span className="absolute h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white/80" />
          </div>

          <div>
            <p className="text-lg font-extrabold tracking-tight text-slate-900">
              AI News Radar
            </p>
            <p className="text-xs text-slate-500">
              AI news, simplified
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link href="/" className="transition hover:text-slate-900">
            Início
          </Link>
          <Link href="/about" className="transition hover:text-slate-900">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}