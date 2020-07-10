import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn, UpdateDateColumn, VersionColumn, Generated, Index, ManyToOne, OneToMany, Unique, Entity
} from "typeorm";
import { Ledger } from './Ledger';

export abstract class BaseClass extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * not used for now, can be used when we start not to use id
   */
  @Index({unique: true})
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  /**
   * index for better sorting
   */
  @Index()
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @VersionColumn()
  version?: number;
}


export abstract class CategoryBaseClass extends BaseClass {
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
}
