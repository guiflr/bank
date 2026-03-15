export type TransferDTO = {
  origin: string;
  amount: number;
  destination: string;
};

export type WithdrawDTO = {
  origin: string;
  amount: number;
};

export type DepositDTO = {
  destination: string;
  amount: number;
};

export type DepositResponse = {
  destination: {
    id: string;
    balance: number;
  };
};

export type EventDTO = {
  type: 'transfer' | 'deposit' | 'withdraw';
  transfer?: TransferDTO;
  deposit?: DepositDTO;
  withdraw: WithdrawDTO;
};

export type EventResponse = DepositResponse;
