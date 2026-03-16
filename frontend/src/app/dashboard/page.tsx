import DepositModal from "./DepositModal";

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
            <h2 className="text-lg font-semibold">Ações</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Adicione saldo a sua conta rapidamente.
            </p>
            <DepositModal />
          </article>
        </section>
      </div>
    </main>
  );
}
