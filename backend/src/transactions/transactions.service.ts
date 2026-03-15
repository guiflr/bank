import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from './domain/repository';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getBalance(account: string) {
    const balance = await this.transactionRepository.getBalance(account);

    if (!balance) {
      throw new NotFoundException('Account Not Found');
    }

    return balance;
  }
}
