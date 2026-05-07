import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/30">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-white">AI News Radar</p>
            <p className="hidden text-xs text-slate-400 sm:block">RSS público + alertas Telegram</p>
          </div>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-slate-300">
          <Link href="/" className="rounded-full px-4 py-2 hover:bg-white/10 hover:text-white">
            Notícias
          </Link>
          <Link href="/about" className="rounded-full px-4 py-2 hover:bg-white/10 hover:text-white">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
