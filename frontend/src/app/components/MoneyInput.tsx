"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

type MoneyInputProps = {
  name: string;
  label?: string;
  locale?: string;
  currency?: string;
  defaultCents?: number;
  required?: boolean;
  requiredMessage?: string;
};

export default function MoneyInput({
  name,
  label,
  locale = "pt-BR",
  currency = "BRL",
  defaultCents = 0,
  required = false,
  requiredMessage = "Campo obrigatório",
}: MoneyInputProps) {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale, currency],
  );

  const [cents, setCents] = useState(() => Math.max(0, defaultCents));
  const displayValue = formatter.format(cents / 100);

  const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    if (required && cents <= 0) {
      event.currentTarget.setCustomValidity(requiredMessage);
    }
  };

  const handleInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "");
    const nextCents = digits ? Number.parseInt(digits, 10) : 0;
    const safeCents = Number.isNaN(nextCents) ? 0 : nextCents;
    setCents(safeCents);
    if (required && safeCents <= 0) {
      event.currentTarget.setCustomValidity(requiredMessage);
    } else {
      event.currentTarget.setCustomValidity("");
    }
  };

  return (
    <label className="grid gap-2 text-xs uppercase tracking-[0.2em]">
      {label && label}
      <input
        inputMode="numeric"
        type="text"
        value={displayValue}
        onChange={handleChange}
        required={required}
        onInvalid={handleInvalid}
        onInput={handleInput}
        className={
          "border border-black bg-transparent px-3 py-2 text-sm rounded-md outline-none " +
          "focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white " +
          "dark:border-white dark:focus:ring-white dark:focus:ring-offset-black"
        }
      />
      <input type="hidden" name={name} value={cents.toString()} />
    </label>
  );
}
