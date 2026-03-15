import { Injectable } from '@nestjs/common';

import type { AuthRepository } from '../../domain/repository';
import { KnexService } from '../../../infra/knex/knex.service';

@Injectable()
export class AuthKnexRepository implements AuthRepository {
  constructor(private readonly knexService: KnexService) {}

  async findUserByUsername(username: string) {
    const user = await this.knexService
      .db('users')
      .select('id', 'username', 'password')
      .where({ username })
      .first();

    return user ?? null;
  }
}
