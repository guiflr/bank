"use client";

import { useState } from "react";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";
import Modal from "../components/Modal";
import { withdraw } from "./actions";

export default function WithdrawModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mt-6 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
        onClick={() => setIsOpen(true)}
      >
        Novo saque
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Saque"
        description="Informe a conta e o valor."
      >
        <form className="mt-6 grid gap-4" action={withdraw}>
          <Input name="origin" type="text" label="Conta" required />
          <MoneyInput name="amount" label="Valor" required />

          <button
            type="submit"
            className="mt-2 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
          >
            Sacar
          </button>
        </form>
      </Modal>
    </>
  );
}
