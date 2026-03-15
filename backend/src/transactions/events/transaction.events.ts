import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import type { EventDTO, EventResponse } from '../dtos';
import type { TransactionsEventsFactory } from '../domain/events-factory';
import { DEPOSIT_EVENT, type DepositEvent, WITHDRAW_EVENT, type WithdrawEvent } from '../domain/events';

@Injectable()
export class TransactionsEventsFactoryImpl implements TransactionsEventsFactory {
  constructor(
    @Inject(DEPOSIT_EVENT) private readonly depositEvent: DepositEvent,
    @Inject(WITHDRAW_EVENT) private readonly withdrawEvent: WithdrawEvent,
  ) {}

  async events(event: EventDTO): Promise<EventResponse> {
    switch (event.type) {
      case 'deposit': {
        return this.depositEvent.deposit(event);
      }
      case 'withdraw': {
        return this.withdrawEvent.withdraw(event);
      }
      case 'transfer':
        throw new BadRequestException('Event Not Implemented');
      default:
        throw new BadRequestException('Invalid Event');
    }
  }
}
