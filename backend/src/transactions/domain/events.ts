import { DepositDTO, DepositResponse, WithdrawDTO, WithdrawResponse } from '../dtos';

export const DEPOSIT_EVENT = 'DEPOSIT_EVENT';
export interface DepositEvent {
  deposit(data: DepositDTO): Promise<DepositResponse>;
}

export const WITHDRAW_EVENT = 'WITHDRAW_EVENT';
export interface WithdrawEvent {
  withdraw(data: WithdrawDTO): Promise<WithdrawResponse>;
}
