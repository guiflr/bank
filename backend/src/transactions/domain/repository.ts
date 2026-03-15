export type Balance = {
  balance: number;
};

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export interface TransactionRepository {
  getBalance(account: string): Promise<Balance | null>;
}
