import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WithdrawEvent } from '../domain/events';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../domain/repository';
import { WithdrawDTO, WithdrawResponse } from '../dtos';
import { isValidAmount } from '../../utils/isValidAmount';

@Injectable()
export class Withdraw implements WithdrawEvent {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async withdraw({
    amount,
    origin,
    type,
  }: WithdrawDTO): Promise<WithdrawResponse> {
    const isValidValue = isValidAmount(amount);
    if (isValidValue.error) {
      throw new BadRequestException(isValidValue.error);
    }

    const negativeAmount = -Math.abs(amount);

    const account = await this.transactionRepository.getAccount(origin);

    if (!account?.account) {
      throw new NotFoundException('Account Not Found');
    }

    const currentBalance = await this.transactionRepository.getBalance(origin);

    if (currentBalance!.balance < amount) {
      throw new BadRequestException('Insufficient Funds');
    }

    await this.transactionRepository.deposit({
      account: origin,
      balance: negativeAmount,
      type,
    });

    const balance = await this.transactionRepository.getBalance(origin);

    return { origin: { balance: balance!.balance, id: origin } };
  }
}
