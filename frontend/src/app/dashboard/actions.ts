"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type TransactionResponse = {
  message?: string;
};

function buildDashboardRedirect(
  type: "error" | "success",
  message: string,
  accountId?: string,
) {
  const params = new URLSearchParams();
  params.set(type, message);
  if (accountId) {
    params.set("account_id", accountId);
  }
  return `/dashboard?${params.toString()}`;
}

function ensureBaseUrl() {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    redirect(buildDashboardRedirect("error", "API não configurada"));
  }
  return baseUrl;
}

function parseAmountCents(value: FormDataEntryValue | null) {
  const raw = String(value || "0");
  const amount = Number.parseInt(raw, 10);
  if (!Number.isFinite(amount) || amount <= 0) {
    redirect(buildDashboardRedirect("error", "Valor inválido"));
  }
  return amount;
}

export async function deposit(formData: FormData) {
  const baseUrl = ensureBaseUrl();
  const destination = String(formData.get("destination") || "").trim();
  const amount = parseAmountCents(formData.get("amount"));

  if (!destination) {
    redirect(buildDashboardRedirect("error", "Conta inválida"));
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
    const message = data.message || "Falha ao realizar deposito";
    redirect(buildDashboardRedirect("error", message));
  }

  redirect(buildDashboardRedirect("success", "Depósito realizado", destination));
}

export async function withdraw(formData: FormData) {
  const baseUrl = ensureBaseUrl();
  const origin = String(formData.get("origin") || "").trim();
  const amount = parseAmountCents(formData.get("amount"));

  if (!origin) {
    redirect(buildDashboardRedirect("error", "Conta inválida"));
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
      type: "withdraw",
      origin,
      amount,
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as TransactionResponse;

  if (!response.ok || data.message) {
    const message = data.message || "Falha ao realizar saque";
    redirect(buildDashboardRedirect("error", message));
  }

  redirect(buildDashboardRedirect("success", "Saque realizado", origin));
}

export async function transfer(formData: FormData) {
  const baseUrl = ensureBaseUrl();
  const origin = String(formData.get("origin") || "").trim();
  const destination = String(formData.get("destination") || "").trim();
  const amount = parseAmountCents(formData.get("amount"));

  if (!origin || !destination) {
    redirect(buildDashboardRedirect("error", "Conta inválida"));
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
      type: "transfer",
      origin,
      amount,
      destination,
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as TransactionResponse;

  if (!response.ok || data.message) {
    const message = data.message || "Falha ao realizar transferencia";
    redirect(buildDashboardRedirect("error", message));
  }

  redirect(
    buildDashboardRedirect("success", "Transferência realizada", origin),
  );
}

type BalanceState = {
  balanceCents: number | null;
  error?: string;
};

export async function fetchBalance(
  _prevState: BalanceState,
  formData: FormData,
): Promise<BalanceState> {
  const baseUrl = ensureBaseUrl();
  const accountId = String(formData.get("account_id") || "").trim();

  if (!accountId) {
    return { balanceCents: null, error: "Conta inválida" };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const response = await fetch(
    `${baseUrl}/transactions/balance?account_id=${encodeURIComponent(accountId)}`,
    {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    },
  );
  const data = (await response.json()) as {
    balance?: number;
    message?: string;
  };

  if (!response.ok && data.message) {
    return { balanceCents: null, error: data.message };
  }

  const balance = Number(data.balance);
  if (!Number.isFinite(balance)) {
    return { balanceCents: null, error: "Saldo inválido" };
  }

  return { balanceCents: balance };
}
