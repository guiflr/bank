"use client";

import { useState } from "react";

import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";
import { deposit } from "./actions";

export default function DepositModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mt-6 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
        onClick={() => setIsOpen(true)}
      >
        Novo depósito
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="deposit-title"
        >
          <div className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6 text-black shadow-xl dark:border-white dark:bg-black dark:text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="deposit-title" className="text-lg font-semibold">
                  Depósito
                </h2>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  Informe a conta e o valor.
                </p>
              </div>
              <button
                type="button"
                className="px-2 py-1 text-xs uppercase tracking-[0.25em]"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
              >
                X
              </button>
            </div>

            <form className="mt-6 grid gap-4" action={deposit}>
              <Input name="destination" type="text" label="Conta" />
              <MoneyInput name="amount" label="Valor" />

              <button
                type="submit"
                className="mt-2 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
              >
                Depositar
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
