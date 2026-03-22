import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { DepositEvent } from '../domain/events';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../domain/repository';
import { DepositDTO, DepositResponse } from '../dtos';
import { isValidAmount } from '../../utils/validators/isValidAmount';
import { validateDeposit } from '../../utils/validators/validateDeposit';

@Injectable()
export class Deposit implements DepositEvent {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async deposit({
    amount,
    destination,
    type,
  }: DepositDTO): Promise<DepositResponse> {
    const isValidField = validateDeposit({
      amount,
      destination,
      type,
    });
    if (isValidField.error) {
      throw new BadRequestException(isValidField.error);
    }

    const isValidValue = isValidAmount(amount);
    if (isValidValue.error) {
      throw new BadRequestException(isValidValue.error);
    }

    await this.transactionRepository.createAccountIfNotExists(destination);

    const depositData = {
      account: destination,
      balance: amount,
      type,
    };

    const duplicatedTransaction =
      await this.transactionRepository.findDuplicatedTransaction(
        depositData,
        '',
      );

    if (duplicatedTransaction) {
      throw new NotAcceptableException(
        'Duplicated Transaction. It was found out the same transaction in the last minute. Wait for 1 minute to make the same transaction',
      );
    }

    await this.transactionRepository.deposit(depositData);

    const balance = await this.transactionRepository.getBalance(destination);

    return { destination: { balance: balance!.balance, id: destination } };
  }
}
