export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm uppercase tracking-[0.25em] text-black/70 dark:text-white/70">
            Ações disponíveis
          </p>
        </header>

        <section className="grid gap-4">
          <article className="rounded-2xl border-2 border-black bg-white p-6 dark:border-white dark:bg-black">
            <h2 className="text-lg font-semibold">Depósito</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Adicione saldo a sua conta rapidamente.
            </p>
            <button
              type="button"
              className="mt-6 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
            >
              Novo depósito
            </button>
          </article>
        </section>
      </div>
    </main>
  );
}
