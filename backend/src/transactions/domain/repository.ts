export type Balance = {
  balance: number;
};

export type Account = {
  account: string;
};

export type DepositDAO = {
  account: string;
  balance: number;
  type: 'deposit' | 'withdraw';
};

export type DepositResponseDAO = {
  account: string;
  balance: number;
};

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export interface TransactionRepository {
  getBalance(account: string): Promise<Balance | null>;
  getAccount(account: string): Promise<Account | null>;
  deposit(data: DepositDAO): Promise<void>;
}
