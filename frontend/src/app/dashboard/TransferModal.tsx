"use client";

import { useState } from "react";

import { transfer } from "./actions";
import Modal from "../components/Modal";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";

export default function TransferModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mt-6 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
        onClick={() => setIsOpen(true)}
      >
        Nova transferência
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Transferência"
        description="Informe as contas de origem e destino e o valor."
      >
        <form className="mt-6 grid gap-4" action={transfer}>
          <Input name="origin" type="text" label="Conta origem" required />
          <Input name="destination" type="text" label="Conta destino" required />
          <MoneyInput name="amount" label="Valor" required />

          <button
            type="submit"
            className="mt-2 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
          >
            Transferir
          </button>
        </form>
      </Modal>
    </>
  );
}
