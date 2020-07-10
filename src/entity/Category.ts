import { Column, Entity, Index, ManyToOne, OneToMany, Unique } from "typeorm";
import { BaseClass, CategoryBaseClass } from './BaseClass';
import { Transaction } from './Transaction';
import { Ledger } from './Ledger';

@Index(['ledger'])
@Unique(['name', 'ledger', 'deletedAt'])
@Entity()
export class Category extends BaseClass {

  @Column({
    length: 256,
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToOne(
    type => Ledger,
    ledger => ledger.categories, {
      onDelete: 'NO ACTION',
    })
  ledger: Ledger;

  @Column({ type: 'int', nullable: true })
  ledgerId?: number;

  @OneToMany(type => Transaction, transaction => transaction.category)
  transactions: Transaction[];
}

