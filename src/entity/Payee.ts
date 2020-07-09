import { Column, Entity, Index, ManyToOne, OneToMany, Unique } from "typeorm";
import { BaseClass } from './BaseClass';
import { Ledger } from './Ledger';
import { Transaction } from './Transaction';

@Index(['name'], {unique: true})
@Unique(['name', 'ledger', 'deletedAt'])
@Entity()
export class Payee extends BaseClass {
  @Column({
    length: 256,
    nullable: false,
  })
  name: string;

  @ManyToOne(
    type => Ledger,
    ledger => ledger.payees, {
      onDelete: 'NO ACTION',
    })
  ledger: Ledger;

  @OneToMany(type => Transaction, transaction => transaction.payee)
  transactions: Transaction[];
}

