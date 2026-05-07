'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus('');
    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, website: '' })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao submeter.');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus(error.message || 'Erro ao submeter.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur md:p-5 animate-fade-up">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Lista privada
          </p>

          <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            Recebe updates de AI e novidades futuras
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Deixa o teu email para receber conteúdos, updates do projeto e futuras ofertas.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row md:max-w-lg"
        >
          <input
            type="text"
            name="website"
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <input
            type="email"
            required
            placeholder="O teu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'A guardar...' : 'Entrar'}
          </button>
        </form>
      </div>

      <div className="mt-2">
        <p className="text-xs text-slate-500">
          Ao submeteres, aceitas receber comunicações sobre o projeto, AI e futuras ofertas. Podes pedir a remoção a qualquer momento.
        </p>

        {status === 'success' && (
          <p className="mt-2 text-sm font-medium text-emerald-600">
            Obrigado! Entraste na lista.
          </p>
        )}

        {status && status !== 'success' && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {status}
          </p>
        )}
      </div>
    </section>
  );
}