import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { TransactionsModule } from '../src/transactions/transactions.module';
import { AuthGuard } from '../src/auth/auth.guard';
import { TRANSACTION_REPOSITORY } from '../src/transactions/domain/repository';
import { TransactionKnexRepository } from '../src/transactions/infra/transaction.knex.repository';
import { KnexService } from '../src/infra/knex/knex.service';
import { TransactionsService } from '../src/transactions/transactions.service';

describe('TransactionsModule (e2e)', () => {
  let app: INestApplication<App>;
  let transactionRepository: {
    getBalance: jest.Mock;
    deposit: jest.Mock;
    transfer: jest.Mock;
    getAccount: jest.Mock;
  };

  beforeEach(async () => {
    transactionRepository = {
      getBalance: jest.fn(),
      deposit: jest.fn(),
      transfer: jest.fn(),
      getAccount: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionsModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideProvider(TRANSACTION_REPOSITORY)
      .useValue(transactionRepository)
      .overrideProvider(TransactionKnexRepository)
      .useValue({})
      .overrideProvider(KnexService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/transactions/balance (GET) returns balance', async () => {
    transactionRepository.getBalance.mockResolvedValue({ balance: 500 });

    await request(app.getHttpServer())
      .get('/transactions/balance')
      .query({ account_id: 'acc-1' })
      .expect(200)
      .expect({ balance: 500 });

    expect(transactionRepository.getBalance).toHaveBeenCalledWith('acc-1');
  });

  it('/transactions/balance (GET) returns 404 when account not found', async () => {
    transactionRepository.getBalance.mockResolvedValue(null);

    await request(app.getHttpServer())
      .get('/transactions/balance')
      .query({ account_id: 'missing' })
      .expect(404);
  });

  it('processes a deposit event through the module services', async () => {
    transactionRepository.deposit.mockResolvedValue(undefined);
    transactionRepository.getBalance.mockResolvedValue({ balance: 150 });

    const service = app.get(TransactionsService);
    const response = await service.event({
      type: 'deposit',
      destination: 'acc-1',
      amount: 150,
    });

    expect(response).toEqual({
      destination: { id: 'acc-1', balance: 150 },
    });
    expect(transactionRepository.deposit).toHaveBeenCalledWith({
      account: 'acc-1',
      balance: 150,
      type: 'deposit',
    });
    expect(transactionRepository.getBalance).toHaveBeenCalledWith('acc-1');
  });

  it('processes a withdraw event through the module services', async () => {
    transactionRepository.deposit.mockResolvedValue(undefined);
    transactionRepository.getBalance.mockResolvedValue({ balance: 350 });
    transactionRepository.getAccount.mockResolvedValue({
      balance: 350,
      account: 'acc-2',
    });

    const service = app.get(TransactionsService);
    const response = await service.event({
      type: 'withdraw',
      origin: 'acc-2',
      amount: 50,
    });

    expect(response).toEqual({
      origin: { id: 'acc-2', balance: 350 },
    });
    expect(transactionRepository.deposit).toHaveBeenCalledWith({
      account: 'acc-2',
      balance: -50,
      type: 'withdraw',
    });
    expect(transactionRepository.getBalance).toHaveBeenCalledWith('acc-2');
  });
});
