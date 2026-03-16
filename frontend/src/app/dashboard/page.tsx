import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import TransferModal from "./TransferModal";

type DashboardPageProps = {
  searchParams?: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function Dashboard({ searchParams }: DashboardPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const error = resolvedParams?.error;
  const success = resolvedParams?.success;

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm uppercase tracking-[0.25em] text-black/70 dark:text-white/70">
            Ações disponíveis
          </p>
        </header>

        {error ? (
          <p className="rounded-md border border-red-600 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400 dark:bg-red-950 dark:text-red-200">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="rounded-md border border-green-600 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-400 dark:bg-green-950 dark:text-green-200">
            {success}
          </p>
        ) : null}

        <section className="grid gap-4">
          <article className="rounded-2xl border-2 border-black bg-white p-6 dark:border-white dark:bg-black">
            <h2 className="text-lg font-semibold">Depósito</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Adicione saldo a sua conta rapidamente.
            </p>
            <DepositModal />
          </article>

          <article className="rounded-2xl border-2 border-black bg-white p-6 dark:border-white dark:bg-black">
            <h2 className="text-lg font-semibold">Saque</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Retire saldo da sua conta quando precisar.
            </p>
            <WithdrawModal />
          </article>

          <article className="rounded-2xl border-2 border-black bg-white p-6 dark:border-white dark:bg-black">
            <h2 className="text-lg font-semibold">Transferencia</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Envie saldo entre contas com seguranca.
            </p>
            <TransferModal />
          </article>
        </section>
      </div>
    </main>
  );
}
