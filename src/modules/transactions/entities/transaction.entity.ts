import { customAlphabet } from 'nanoid';
import { Account } from 'src/modules/accounts/entities/account.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
const numericIdGenerator = customAlphabet('0123456789', 9); // 9-digit number

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  transactionId: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateTransactionId() {
    this.transactionId = parseInt(numericIdGenerator()); // ex 667662773
  }
}
