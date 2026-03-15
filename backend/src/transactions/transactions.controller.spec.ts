import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/auth.guard';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let transactionsService: jest.Mocked<TransactionsService>;

  beforeEach(async () => {
    transactionsService = {
      getBalance: jest.fn(),
    } as unknown as jest.Mocked<TransactionsService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        { provide: TransactionsService, useValue: transactionsService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the balance for the given account_id', async () => {
    transactionsService.getBalance.mockResolvedValue({ balance: 500 });

    await expect(controller.balance('acc-1')).resolves.toEqual({
      balance: 500,
    });

    expect(transactionsService.getBalance).toHaveBeenCalledWith('acc-1');
  });
});
