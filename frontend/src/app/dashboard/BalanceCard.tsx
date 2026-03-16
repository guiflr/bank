"use client";

import { useActionState, useMemo } from "react";

import Input from "../components/Input";
import { fetchBalance } from "./actions";

type BalanceState = {
  balanceCents: number | null;
  error?: string;
};

const initialState: BalanceState = {
  balanceCents: null,
};

export default function BalanceCard() {
  const [state, formAction] = useActionState(fetchBalance, initialState);

  const formattedBalance = useMemo(() => {
    if (state.balanceCents === null) {
      return null;
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(state.balanceCents / 100);
  }, [state.balanceCents]);

  return (
    <article className="relative rounded-2xl border-2 border-black bg-white p-6 dark:border-white dark:bg-black">
      <h2 className="text-lg font-semibold">Saldo</h2>

      {formattedBalance ? (
        <p className="absolute right-6 top-6 text-sm uppercase tracking-[0.25em]">
          {formattedBalance}
        </p>
      ) : null}

      {state.error ? (
        <p className="absolute right-6 top-6 text-sm text-red-700 dark:text-red-200">
          {state.error}
        </p>
      ) : null}

      <form className="mt-6 grid gap-4" action={formAction}>
        <Input
          name="account_id"
          placeholder="Consultar saldo"
          type="text"
          required
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
