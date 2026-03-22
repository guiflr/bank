import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from './domain/repository';
import {
  EVENT_FACTORY,
  type TransactionsEventsFactory,
} from './domain/events-factory';
import type { EventDTO } from './dtos';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let eventsFactory: jest.Mocked<TransactionsEventsFactory>;

  beforeEach(async () => {
    transactionRepository = {
      getBalance: jest.fn(),
      getAccount: jest.fn(),
      createAccountIfNotExists: jest.fn(),
      deposit: jest.fn(),
      transfer: jest.fn(),
      findDuplicatedTransaction: jest.fn(),
    };

    eventsFactory = {
      events: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: TRANSACTION_REPOSITORY, useValue: transactionRepository },
        { provide: EVENT_FACTORY, useValue: eventsFactory },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the balance when account exists', async () => {
    transactionRepository.getBalance.mockResolvedValue({ balance: 1500 });

    await expect(service.getBalance('acc-123')).resolves.toEqual({
      balance: 1500,
    });

    expect(transactionRepository.getBalance).toHaveBeenCalledWith('acc-123');
  });

  it('should throw NotFoundException when account does not exist', async () => {
    transactionRepository.getBalance.mockResolvedValue(null);

    await expect(service.getBalance('missing-acc')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should delegate event handling to the events factory', async () => {
    const event: EventDTO = {
      type: 'deposit',
      destination: 'acc-123',
      amount: 50,
    };

    const response = {
      destination: { id: 'acc-123', balance: 50 },
    };

    eventsFactory.events.mockResolvedValue(response);

    await expect(service.event(event)).resolves.toEqual(response);
    expect(eventsFactory.events).toHaveBeenCalledWith(event);
  });
});
