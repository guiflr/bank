import { Module } from '@nestjs/common';

import { AUTH_TOKEN } from '../auth/domain/token';
import { AuthJwt } from '../auth/libs/jwt/auth.jwt';
import { KnexService } from '../infra/knex/knex.service';
import { TransactionsService } from './transactions.service';
import { TRANSACTION_REPOSITORY } from './domain/repository';
import { TransactionsController } from './transactions.controller';
import { TransactionKnexRepository } from './infra/transaction.knex.repository';

@Module({
  providers: [
    TransactionsService,
    KnexService,
    AuthJwt,
    TransactionKnexRepository,
    {
      provide: AUTH_TOKEN,
      useExisting: AuthJwt,
    },
    {
      provide: TRANSACTION_REPOSITORY,
      useExisting: TransactionKnexRepository,
    },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
