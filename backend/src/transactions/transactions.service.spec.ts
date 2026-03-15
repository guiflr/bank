import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from './domain/repository';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(async () => {
    transactionRepository = {
      getBalance: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: TRANSACTION_REPOSITORY, useValue: transactionRepository },
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
});
