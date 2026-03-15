import { DepositDTO, WithdrawDTO } from 'src/transactions/dtos';

type Response = {
  error: string | null;
};

export function validateDeposit(data: DepositDTO): Response {
  if (!data.amount) {
    return { error: `Field 'amount' is required` };
  }

  if (!data.destination) {
    return { error: `Field 'destination' is required` };
  }

  if (data.destination.length > 20) {
    return { error: `Field 'destination' is greater than 20 character` };
  }

  return { error: null };
}
