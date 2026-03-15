import { WithdrawDTO } from 'src/transactions/dtos';

type Response = {
  error: string | null;
};

export function validateWithdraw(data: WithdrawDTO): Response {
  if (!data.amount) {
    return { error: `Field 'amount' is required` };
  }

  if (!data.origin) {
    return { error: `Field 'origin' is required` };
  }

  return { error: null };
}
