import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn, UpdateDateColumn, VersionColumn, Generated, Index
} from "typeorm";

export abstract class BaseClass extends BaseEntity{

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
