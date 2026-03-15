import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import type { DepositResponse, EventDTO } from '../dtos';
import type { TransactionsEventsFactory } from '../domain/events-factory';
import { DEPOSIT_EVENT, type DepositEvent } from '../domain/events';

@Injectable()
export class TransactionsEventsFactoryImpl implements TransactionsEventsFactory {
  constructor(
    @Inject(DEPOSIT_EVENT) private readonly depositEvent: DepositEvent,
  ) {}

  async events(event: EventDTO): Promise<DepositResponse> {
    switch (event.type) {
      case 'deposit': {
        return this.depositEvent.deposit(event);
      }
      case 'withdraw':
      case 'transfer':
        throw new BadRequestException('Event Not Implemented');
      default:
        throw new BadRequestException('Invalid Event');
    }
  }
}
