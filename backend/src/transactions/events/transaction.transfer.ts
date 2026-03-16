import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../domain/repository';
import { TransferEvent } from '../domain/events';
import { TransferDTO, TransferResponse } from '../dtos';
import { isValidAmount } from '../../utils/validators/isValidAmount';
import { validateTransfer } from '../../utils/validators/validateTransfer';

@Injectable()
export class Transfer implements TransferEvent {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async transfer({
    amount,
    origin,
    destination,
    type,
  }: TransferDTO): Promise<TransferResponse> {
    const isValidField = validateTransfer({
      amount,
      origin,
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

    const originAccount = await this.transactionRepository.getAccount(origin);
    if (!originAccount?.account) {
      throw new NotFoundException('Origin Account Not Found');
    }

    const destinationAccount =
      await this.transactionRepository.getAccount(destination);
    if (!destinationAccount?.account) {
      throw new NotFoundException('Destination Account Not Found');
    }

    const currentBalance = await this.transactionRepository.getBalance(origin);
    if (currentBalance!.balance < amount) {
      throw new BadRequestException('Insufficient Funds');
    }

    await this.transactionRepository.transfer(
      {
        account: origin,
        balance: -Math.abs(amount),
        type,
      },
      {
        account: destination,
        balance: amount,
        type,
      },
    );

    const originBalance = await this.transactionRepository.getBalance(origin);
    const destinationBalance =
      await this.transactionRepository.getBalance(destination);

    return {
      origin: { balance: originBalance!.balance, id: origin },
      destination: { balance: destinationBalance!.balance, id: destination },
    };
  }
}
