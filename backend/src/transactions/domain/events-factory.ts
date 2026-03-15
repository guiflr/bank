import { EventDTO, EventResponse } from '../dtos';

export const EVENT_FACTORY = 'EVENT_FACTORY';

export interface TransactionsEventsFactory {
  events(event: EventDTO): Promise<EventResponse>;
}

export { TransactionsEventsFactoryImpl } from '../events/transaction.events';
