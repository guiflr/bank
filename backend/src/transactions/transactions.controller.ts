import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly trasactionService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @Get('balance')
  async balance(@Query('account_id') account_id: string) {
    const balance = await this.trasactionService.getBalance(account_id);
    return balance;
  }
}
