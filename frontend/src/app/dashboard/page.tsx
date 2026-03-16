import BalanceCard from "./BalanceCard";
import DepositModal from "./DepositModal";
import TransferModal from "./TransferModal";
import WithdrawModal from "./WithdrawModal";
import { ensureValidSession, logout } from "./actions";
import Notification from "../components/Notification";

type DashboardPageProps = {
  searchParams?: Promise<{
    error?: string;
    success?: string;
    account_id?: string;
  }>;
};

export default async function Dashboard({ searchParams }: DashboardPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const error = resolvedParams?.error;
  const success = resolvedParams?.success;
  const accountId = resolvedParams?.account_id;

  await ensureValidSession(accountId);

  return (
    <main className="relative min-h-screen bg-white px-6 py-12 text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm uppercase tracking-[0.25em] text-black/70 dark:text-white/70">
              Ações disponíveis
            </p>
          </div>

          <div className="flex w-full flex-1 justify-center lg:pt-1">
            {error || success ? (
              <div className="w-full max-w-md">
                {error ? <Notification message={error} variant="error" /> : null}
                {success ? (
                  <Notification message={success} variant="success" />
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="flex flex-1 justify-end lg:pt-1">
            <form action={logout}>
              <button
                type="submit"
                className="border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
              >
                Sair
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-4">
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
            <h2 className="text-lg font-semibold">Transferência</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Envie saldo entre contas com seguranca.
            </p>
            <TransferModal />
          </article>

          <BalanceCard initialAccountId={accountId} />
        </section>
      </div>
    </main>
  );
}
