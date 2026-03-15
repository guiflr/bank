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

export type EventDTO = TransferDTO | DepositDTO | WithdrawDTO;

export type EventResponse = DepositResponse;
