import { Column, Entity, Index, ManyToOne, OneToMany, Repository, Unique } from "typeorm";
import { BaseClass } from './BaseClass';
import { Ledger } from './Ledger';
import { Transaction } from './Transaction';
import { getOrmManager } from '../db/ormManager';



@Unique(['name', 'ledger', 'deletedAt'])
@Entity()
export class Category extends BaseClass {
  @Index({unique: true})
  @Column({
    length: 256,
    nullable: false,
  })
  name: string;

  @ManyToOne(
    type => Ledger,
    ledger => ledger.categories, {
      onDelete: 'NO ACTION',
    })
  ledger: Ledger;

  @Index()
  @Column({ type: 'int', nullable: true })
  ledgerId?: number;

  @OneToMany(type => Transaction, transaction => transaction.category)
  transactions: Transaction[];

  public static getRepo():Repository<Category> {
    return getOrmManager().getRepository(Category);
  }
}

