export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} AI News Radar. Projeto gratuito.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/aiwith.oleg"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-700 transition hover:text-slate-950"
          >
            Criado por @aiwith.oleg
          </a>
        </div>
      </div>
    </footer>
  );
}