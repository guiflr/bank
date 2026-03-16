import { Module } from '@nestjs/common';

import { AUTH_TOKEN } from '../auth/domain/token';
import { AuthJwt } from '../auth/libs/jwt/auth.jwt';
import { KnexService } from '../infra/knex/knex.service';
import { TransactionsService } from './transactions.service';
import { TRANSACTION_REPOSITORY } from './domain/repository';
import {
  EVENT_FACTORY,
  TransactionsEventsFactoryImpl,
} from './domain/events-factory';
import { TransactionsController } from './transactions.controller';
import { TransactionKnexRepository } from './infra/transaction.knex.repository';
import { Deposit } from './events/transaction.deposit';
import { Withdraw } from './events/transaction.withdraw';
import { Transfer } from './events/transaction.transfer';
import { DEPOSIT_EVENT, TRANSFER_EVENT, WITHDRAW_EVENT } from './domain/events';

@Module({
  providers: [
    TransactionsService,
    KnexService,
    AuthJwt,
    TransactionKnexRepository,
    Deposit,
    Withdraw,
    Transfer,
    TransactionsEventsFactoryImpl,
    {
      provide: AUTH_TOKEN,
      useExisting: AuthJwt,
    },
    {
      provide: TRANSACTION_REPOSITORY,
      useExisting: TransactionKnexRepository,
    },
    {
      provide: EVENT_FACTORY,
      useExisting: TransactionsEventsFactoryImpl,
    },
    {
      provide: DEPOSIT_EVENT,
      useExisting: Deposit,
    },
    {
      provide: WITHDRAW_EVENT,
      useExisting: Withdraw,
    },
    {
      provide: TRANSFER_EVENT,
      useExisting: Transfer,
    },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
