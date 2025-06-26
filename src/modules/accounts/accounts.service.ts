import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { OpenAccountDto } from './dto/open-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async openAccount(
    openAccountDto: OpenAccountDto,
  ): Promise<{ accountId: number }> {
    const account = this.accountRepository.create({
      balance: openAccountDto.initialDeposit || 0,
      userName: openAccountDto.userName,
    });
    const savedAccount = await this.accountRepository.save(account);
    return { accountId: savedAccount.accountId };
  }

  async getBalance(accountId: number): Promise<{ balance: number }> {
    const account = await this.accountRepository.findOneBy({ accountId });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found.`);
    }

    return { balance: Number(account.balance) };
  }
}
