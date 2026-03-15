import { Injectable } from '@nestjs/common';

import {
  Account,
  Balance,
  DepositDAO,
  TransactionRepository,
} from '../domain/repository';
import { KnexService } from '../../infra/knex/knex.service';

@Injectable()
export class TransactionKnexRepository implements TransactionRepository {
  constructor(private knexService: KnexService) {}
  async getBalance(account: string): Promise<Balance | null> {
    const data = await this.knexService
      .db('transactions')
      .sum('balance as balance')
      .where({ account })
      .first();

    if (!data || data.balance === null) return null;

    return { balance: data.balance };
  }

  async getAccount(account: string): Promise<Account | null> {
    const data = await this.knexService
      .db('transactions')
      .select('account')
      .where({ account })
      .first();

    if (!data?.account) return null;

    return data;
  }

  async deposit(data: DepositDAO): Promise<void> {
    await this.knexService.db('transactions').insert(data);
  }
}
