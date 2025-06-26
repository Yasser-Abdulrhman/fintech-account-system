import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  @ApiOperation({ summary: 'Deposit funds into an account' })
  @ApiResponse({ status: 201, description: 'Deposit successful.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  deposit(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.deposit(createTransactionDto);
  }

  @Post('withdraw')
  @ApiOperation({ summary: 'Withdraw funds from an account' })
  @ApiResponse({ status: 201, description: 'Withdrawal successful.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or insufficient funds.',
  })
  withdraw(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.withdraw(createTransactionDto);
  }
}
