import { Column, Entity, Index, ManyToOne, OneToMany, Repository, Unique } from "typeorm";
import { BaseClass } from './BaseClass';
import { User } from './User';
import { Account } from './Account';
import { Category } from './Category';
import { Payee } from './Payee';
import { getOrmManager } from '../db/ormManager';

@Index(['user'])
@Unique(['name', 'user', 'deletedAt'])
@Entity()
export class Ledger extends BaseClass {
  @Column({
    length: 256,
    nullable: false,
  })
  @Index()
  name: string;

  @ManyToOne(
    type => User,
    user => user.ledgers, {
      onDelete: 'NO ACTION',
    })
  user: User;

  @Column({ type: 'int', nullable: true })
  userId?: number;

  @OneToMany(type => Account, account => account.ledger)
  accounts: Account[];

  @OneToMany(type => Category, category => category.ledger)
  categories: Category[];

  @OneToMany(type => Payee, payee => payee.ledger)
  payees: Payee[];

  public static getRepo():Repository<Ledger> {
    return getOrmManager().getRepository(Ledger);
  }
}
