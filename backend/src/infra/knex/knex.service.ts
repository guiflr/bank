import { Injectable, OnModuleDestroy } from '@nestjs/common';
import knex, { Knex } from 'knex';

import { DATABASE_URL } from '../../auth/constants/index';

@Injectable()
export class KnexService implements OnModuleDestroy {
  private readonly instance: Knex;

  constructor() {
    this.instance = knex({
      client: 'pg',
      connection: DATABASE_URL,
    });
  }

  get db(): Knex {
    return this.instance;
  }

  async onModuleDestroy() {
    await this.instance.destroy();
  }
}
