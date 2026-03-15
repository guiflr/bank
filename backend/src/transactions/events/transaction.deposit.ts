import { Inject, Injectable } from '@nestjs/common';
import { DepositEvent } from '../domain/events';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../domain/repository';
import { DepositDTO, DepositResponse } from '../dtos';

@Injectable()
export class Deposit implements DepositEvent {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async deposit({
    amount,
    destination,
    type,
  }: DepositDTO): Promise<DepositResponse> {
    await this.transactionRepository.deposit({
      account: destination,
      balance: amount,
      type,
    });

    const balance = await this.transactionRepository.getBalance(destination);

    return { destination: { balance: balance!.balance, id: destination } };
  }
}
