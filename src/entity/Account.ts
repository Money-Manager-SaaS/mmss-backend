import { BeforeInsert, Column, Entity, Index, ManyToOne, OneToMany, Repository, Unique } from "typeorm";
import { BaseClass } from './BaseClass';
import { Ledger } from './Ledger';
import { Transaction } from './Transaction';
import { getOrmManager } from '../db/ormManager';

export interface ICurrency {
  name: string;
  rate: number; //  how many local currency = 1 usd, from rmb this is about 6, for nzd it is about 1.6
  symbol?: string;
}

@Index(['name'], {unique: true})
@Index(['ledger'])
@Unique(['name', 'ledger', 'deletedAt'])
@Entity()
export class Account extends BaseClass {
  @Column({
    length: 256,
    nullable: false,
  })
  name: string;

  @Column()
  amount: number;

  @Column("simple-json", {nullable: true})
  currency?: ICurrency;

  @ManyToOne(
    type => Ledger,
    ledger => ledger.accounts, {
      onDelete: 'NO ACTION',
    })
  ledger: Ledger;

  @OneToMany(type => Transaction, transaction => transaction.account)
  transactions: Transaction[];

  @OneToMany(type => Transaction, transaction => transaction.toAccount)
  receivedTransactions: Transaction[];

  @BeforeInsert()
  initCurrency() {
    if (!this.currency) {
      // usd by default
      this.currency = {
        name: 'USD',
        rate: 1,
        symbol: '$'
      };
    }
  }

  public static getRepo():Repository<Account> {
    return getOrmManager().getRepository(Account);
  }
}
