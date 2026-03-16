import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { fetchBalance } from "../dashboard/actions";

type BalanceState = {
  balanceCents: number | null;
  error?: string;
};

const initialState: BalanceState = {
  balanceCents: null,
};

type UseBalanceCardState = {
  accountId: string;
  formattedBalance: string | null;
  error?: string;
  formAction: (payload: FormData) => void;
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
};

export function useBalanceCardState(
  initialAccountId?: string,
): UseBalanceCardState {
  const [state, formAction] = useActionState(fetchBalance, initialState);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFetchedFromQuery = useRef(false);

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
  const accountId = accountIdFromQuery || initialAccountId || "";

  useEffect(() => {
    if (!accountId || hasFetchedFromQuery.current) {
      return;
    }

    hasFetchedFromQuery.current = true;
    const formData = new FormData();
    formData.set("account_id", accountId);
    startTransition(() => {
      formAction(formData);
    });
  }, [accountId, formAction, startTransition]);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const submittedAccountId = String(formData.get("account_id") || "").trim();

    if (!submittedAccountId) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("account_id", submittedAccountId);
    router.replace(`/dashboard?${params.toString()}`);
  };

  return {
    accountId,
    formattedBalance,
    error: state.error,
    formAction,
    handleSubmit,
  };
}
