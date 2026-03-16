"use client";

import { useActionState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const accountIdFromQuery = searchParams.get("account_id") ?? "";

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const accountId = String(formData.get("account_id") || "").trim();

    if (!accountId) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("account_id", accountId);
    router.replace(`/dashboard?${params.toString()}`);
  };

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
          defaultValue={accountIdFromQuery}
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
