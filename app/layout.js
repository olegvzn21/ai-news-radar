import './globals.css';

export const metadata = {
  title: 'AI News Radar',
  description: 'Notícias recentes sobre Inteligência Artificial agregadas por RSS públicos.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
