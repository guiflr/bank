type Response = {
  error: string | null;
};

export function isValidAmount(value: number): Response {
  if (!Number.isInteger(value)) {
    return { error: 'Invalid Deposit Value. It should be integer value' };
  }

  if (value <= 0) {
    return { error: 'Deposit value should be greater than 0' };
  }

  return { error: null };
}
