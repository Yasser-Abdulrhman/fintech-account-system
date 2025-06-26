import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { customAlphabet } from 'nanoid';

const numericIdGenerator = customAlphabet('0123456789', 9); // 9-digit number

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  userName: string;

  @Column({ unique: true })
  accountId: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0.0 })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateAccountId() {
    this.accountId = parseInt(numericIdGenerator()); // ex 667662773
  }
}
