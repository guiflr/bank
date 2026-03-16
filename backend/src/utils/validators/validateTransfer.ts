import { TransferDTO } from 'src/transactions/dtos';

type Response = {
  error: string | null;
};

export function validateTransfer(data: TransferDTO): Response {
  if (!data.amount) {
    return { error: `Field 'amount' is required` };
  }

  if (!data.origin) {
    return { error: `Field 'origin' is required` };
  }

  if (!data.destination) {
    return { error: `Field 'destination' is required` };
  }

  if (data.origin.length > 20) {
    return { error: `Field 'origin' is greater than 20 character` };
  }

  if (data.destination.length > 20) {
    return { error: `Field 'destination' is greater than 20 character` };
  }

  return { error: null };
}
