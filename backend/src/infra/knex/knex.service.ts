import { Injectable, OnModuleDestroy } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexService implements OnModuleDestroy {
  private readonly instance: Knex;

  constructor() {
    this.instance = knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
    });
  }

  get db(): Knex {
    return this.instance;
  }

  async onModuleDestroy() {
    await this.instance.destroy();
  }
}
