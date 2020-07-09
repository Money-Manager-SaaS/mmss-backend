import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";
import { BaseClass } from './BaseClass';
import { Account } from './Account';
import { Category } from './Category';
import { Payee } from './Payee';

export enum TransferType {
  Transfer = 0, // money transfer
  Withdraw = -1, // money out
  Deposit = 1, //money in
}

@Entity()
export class Transaction extends BaseClass {

  @Column({
    enum: TransferType,
    default: TransferType.Withdraw
  })
  transferType: number;

  @Column()
  amount: number;

  @Column()
  date?: Date;

  // only when transfer
  @Column({nullable: true})
  toAmount?: number;

  @ManyToOne(
    type => Account,
    account => account.transactions, {
      onDelete: 'NO ACTION',
      nullable: false,
    })
  account: Account;

  @ManyToOne(
    type => Account,
    account => account.receivedTransactions, {
      onDelete: 'NO ACTION',
      nullable: true,
    })
  toAccount: Account;

  @ManyToOne(
    type => Category,
    category => category.transactions, {
      onDelete: 'NO ACTION',
      nullable: true,
    })
  category: Category;

  @ManyToOne(
    type => Payee,
    payee => payee.transactions, {
      onDelete: 'NO ACTION',
      nullable: true,
    })
  payee: Payee;

  @BeforeInsert()
  beforeInsert() {
    if (!this.date) {
      this.date = new Date();
    }
    if (this.toAccount && this.transferType === TransferType.Transfer && !this.toAmount) {
      if (this.account.id !== this.toAccount.id) {
        this.toAmount = this.amount / this.account.currency.rate * this.toAccount.currency.rate;
      } else {
        this.toAmount = this.amount;
      }
    }
  }
}
