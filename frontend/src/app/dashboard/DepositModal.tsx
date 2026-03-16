"use client";

import { useState } from "react";

import { deposit } from "./actions";
import Modal from "../components/Modal";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";

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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Depósito"
        description="Informe a conta e o valor."
      >
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
      </Modal>
    </>
  );
}
