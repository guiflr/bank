"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type TransactionResponse = {
  message?: string;
};

export async function deposit(formData: FormData) {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    redirect("/dashboard?error=API_BASE_URL%20nao%20configurada");
  }

  const destination = String(formData.get("destination") || "").trim();
  const amountRaw = String(formData.get("amount") || "0");
  const amount = Number.parseInt(amountRaw, 10);

  if (!destination) {
    redirect(`/dashboard?error=${encodeURIComponent("Conta inválida")}`);
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    redirect(`/dashboard?error=${encodeURIComponent("Valor inválido")}`);
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const response = await fetch(`${baseUrl}/transactions/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      type: "deposit",
      destination,
      amount,
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as TransactionResponse;

  if (!response.ok || data.message) {
    const message = data.message || "Falha ao realizar depósito";
    redirect(`/dashboard?error=${encodeURIComponent(message)}`);
  }

  redirect(`/dashboard?success=${encodeURIComponent("Depósito realizado.")}`);
}
