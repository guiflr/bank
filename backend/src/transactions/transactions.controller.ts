import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import type { EventDTO } from './dtos';
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

  @UseGuards(AuthGuard)
  @Post('event')
  async event(@Body() data: EventDTO) {
    const evenData = await this.trasactionService.event(data);
    return evenData;
  }
}
