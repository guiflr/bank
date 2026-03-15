import { DepositResponse, EventDTO } from '../dtos';

export const EVENT_FACTORY = 'EVENT_FACTORY';

export interface TransactionsEventsFactory {
  events(event: EventDTO): Promise<DepositResponse>;
}

export { TransactionsEventsFactoryImpl } from '../events/transaction.events';
