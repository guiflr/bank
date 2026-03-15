import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from './domain/repository';
import {
  EVENT_FACTORY,
  type TransactionsEventsFactory,
} from './domain/events-factory';
import { EventDTO } from './dtos';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
    @Inject(EVENT_FACTORY)
    private readonly eventsFactory: TransactionsEventsFactory,
  ) {}

  async getBalance(account: string) {
    if (!account) {
      throw new BadRequestException('Account Not Provided');
    }

    const balance = await this.transactionRepository.getBalance(account);
    if (!balance) {
      throw new NotFoundException('Account Not Found');
    }

    return balance;
  }

  async event(event: EventDTO) {
    const data = await this.eventsFactory.events(event);
    return data;
  }
}
