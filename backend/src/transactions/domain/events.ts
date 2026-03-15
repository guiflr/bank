import { DepositDTO, DepositResponse } from '../dtos';

export const DEPOSIT_EVENT = 'DEPOSIT_EVENT';
export interface DepositEvent {
  deposit(data: DepositDTO): Promise<DepositResponse>;
}
