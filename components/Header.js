import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="AI News Radar logo"
            className="h-11 w-11 rounded-full object-cover shadow-lg transition duration-300 hover:scale-105"
          />

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