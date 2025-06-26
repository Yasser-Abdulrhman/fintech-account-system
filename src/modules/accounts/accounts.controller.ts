import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OpenAccountDto } from './dto/open-account.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Open a new account' })
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  openAccount(@Body() openAccountDto: OpenAccountDto) {
    return this.accountsService.openAccount(openAccountDto);
  }

  @Get(':accountId/balance')
  @ApiOperation({ summary: 'Get account balance' })
  @ApiResponse({ status: 200, description: 'Returns the account balance.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  getBalance(@Param('accountId') accountId: number) {
    return this.accountsService.getBalance(accountId);
  }
}
