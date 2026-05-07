export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm animate-fade-up md:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
          Privacidade
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Política de Privacidade
        </h1>

        <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
          <p>
            Esta Política de Privacidade explica como o <strong>AI News Radar</strong>{' '}
            recolhe e utiliza dados pessoais submetidos através deste site.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              1. Quem gere este projeto
            </h2>
            <p className="mt-2">
              O AI News Radar é um projeto gratuito criado por <strong>@aiwith.oleg</strong>.
              Para questões relacionadas com privacidade, podes contactar através do Instagram
              <strong> @aiwith.oleg</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              2. Que dados recolhemos
            </h2>
            <p className="mt-2">
              Quando preenches o formulário no site, podemos recolher o teu endereço de email,
              a data de inscrição e a origem da inscrição, por exemplo “website”.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              3. Para que usamos os dados
            </h2>
            <p className="mt-2">
              Usamos o teu email para enviar comunicações relacionadas com o projeto,
              novidades sobre Inteligência Artificial, updates, conteúdos futuros e eventuais
              ofertas relacionadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              4. Base legal
            </h2>
            <p className="mt-2">
              Tratamos o teu email com base no teu consentimento, dado quando submetes
              voluntariamente o formulário no site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              5. Onde os dados são guardados
            </h2>
            <p className="mt-2">
              Os dados são guardados numa base de dados Supabase. Aplicamos medidas técnicas
              razoáveis para proteger os dados e impedir acesso público direto à lista de emails.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              6. Durante quanto tempo guardamos os dados
            </h2>
            <p className="mt-2">
              Guardamos o teu email enquanto quiseres continuar na lista ou até já não ser
              necessário para os fins descritos nesta política.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              7. Partilha de dados
            </h2>
            <p className="mt-2">
              Não vendemos a tua lista de emails a terceiros. Podemos usar serviços técnicos
              necessários para alojamento, base de dados, envio de comunicações ou manutenção
              do projeto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              8. Os teus direitos
            </h2>
            <p className="mt-2">
              Podes pedir acesso, correção ou apagamento do teu email. Também podes pedir para
              deixar de receber comunicações futuras.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              9. Como remover o teu email
            </h2>
            <p className="mt-2">
              Para remover o teu email da lista, envia uma mensagem para o Instagram
              <strong> @aiwith.oleg</strong> com o pedido de remoção.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              10. Alterações a esta política
            </h2>
            <p className="mt-2">
              Esta política pode ser atualizada no futuro para refletir mudanças no projeto,
              nos serviços utilizados ou em requisitos legais.
            </p>
          </section>

          <p className="pt-4 text-sm text-slate-500">
            Última atualização: maio de 2026.
          </p>
        </div>
      </div>
    </main>
  );
}