import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { Account } from '../accounts/entities/account.entity';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async deposit(
    createTransactionDto: CreateTransactionDto,
  ): Promise<{ transactionId: number }> {
    const { accountId, amount } = createTransactionDto;

    return this.dataSource.transaction(async (manager) => {
      const account = await this.lockAndGetAccount(manager, accountId);

      account.balance = Number(account.balance) + amount;

      const transaction = manager.create(Transaction, {
        account,
        type: TransactionType.DEPOSIT,
        amount,
      });

      await manager.save(account);
      const savedTransaction = await manager.save(transaction);

      return { transactionId: savedTransaction.transactionId };
    });
  }

  async withdraw(
    createTransactionDto: CreateTransactionDto,
  ): Promise<{ transactionId: number }> {
    const { accountId, amount } = createTransactionDto;

    return this.dataSource.transaction(async (manager) => {
      const account = await this.lockAndGetAccount(manager, accountId);

      if (Number(account.balance) < amount) {
        throw new BadRequestException('Insufficient funds.');
      }

      account.balance = Number(account.balance) - amount;

      const transaction = manager.create(Transaction, {
        account,
        type: TransactionType.WITHDRAWAL,
        amount,
      });

      await manager.save(account);
      const savedTransaction = await manager.save(transaction);

      return { transactionId: savedTransaction.transactionId };
    });
  }

  private async lockAndGetAccount(manager: EntityManager, accountId: number) {
    const account = await manager
      .getRepository(Account)
      .createQueryBuilder('account')
      .setLock('pessimistic_write') // Locks the row for the duration of the transaction
      .where('account.accountId = :accountId', { accountId })
      .getOne();

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found.`);
    }
    return account;
  }
}
