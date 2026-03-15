import { Injectable } from '@nestjs/common';
import { Balance, TransactionRepository } from '../domain/repository';
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
}
