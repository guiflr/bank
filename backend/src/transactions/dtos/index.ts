export type TransferDTO = {
  type: 'transfer';
  origin: string;
  amount: number;
  destination: string;
};

export type WithdrawDTO = {
  type: 'withdraw';
  origin: string;
  amount: number;
};

export type DepositDTO = {
  type: 'deposit';
  destination: string;
  amount: number;
};

export type DepositResponse = {
  destination: {
    id: string;
    balance: number;
  };
};

export type WithdrawResponse = {
  origin: {
    id: string;
    balance: number;
  };
};

export type TransferResponse = {
  origin: { id: string; balance: number };
  destination: { id: string; balance: number };
};

export type EventDTO = TransferDTO | DepositDTO | WithdrawDTO;

export type EventResponse =
  | DepositResponse
  | WithdrawResponse
  | TransferResponse;
