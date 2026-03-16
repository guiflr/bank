"use client";

import Input from "../components/Input";
import { useBalanceCardState } from "../hooks/balanceCardHook";

type BalanceCardProps = {
  initialAccountId?: string;
};

export default function BalanceCard({ initialAccountId }: BalanceCardProps) {
  const { accountId, formattedBalance, error, formAction, handleSubmit } =
    useBalanceCardState(initialAccountId);

  return (
    <article className="relative rounded-2xl border-2 border-black bg-white p-6 dark:border-white dark:bg-black">
      <h2 className="text-lg font-semibold">Saldo</h2>

      {formattedBalance ? (
        <p className="absolute right-6 top-6 text-sm uppercase tracking-[0.25em]">
          {formattedBalance}
        </p>
      ) : null}

      {error ? (
        <p className="absolute right-6 top-6 text-sm text-red-700 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <form
        className="mt-6 grid gap-4"
        action={formAction}
        onSubmit={handleSubmit}
      >
        <Input
          name="account_id"
          placeholder="Consultar saldo"
          type="text"
          required
          defaultValue={accountId}
        />

        <button
          type="submit"
          className="mt-2 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
        >
          Buscar
        </button>
      </form>
    </article>
  );
}
