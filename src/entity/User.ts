import { BeforeInsert, Column, Entity, Index, OneToMany, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BaseClass } from './BaseClass';
import { Ledger } from './Ledger';
import { getOrmManager } from '../db/ormManager';

export enum UserRoleType {
  Admin="admin",
  Manager="manager",
  Basic="basic",
}

export interface IProfile {
  age: number,
  hobby: string,
  address: string,
  country: string,
  website: string,
}

@Index(['email'], {unique: true})
@Index(['userName'], {unique: true})
@Entity()
export class User extends BaseClass {

  @Column({
    length: 128,
    unique: true,
  })
  email: string;

  @Column({
    length: 128,
  })
  password: string;

  /**
   * leave for the future
   */
  @Column({
    enum: UserRoleType,
    default: UserRoleType.Basic
  })
  role: string;

  @Column({
    length: 64,
    nullable: false,
    unique: true
  })
  userName: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Column({
    type: 'date'
  })
  lastLogin: Date;

  @OneToMany(type => Ledger, ledger => ledger.user)
  ledgers: Ledger[];

  /**
   * not used, leave for the future
   */
  @Column("simple-json", {nullable: true})
  profile?: IProfile;

  @Column({
    length: 64,
    nullable: true,
  })
  firstName?: string;

  @Column({
    length: 64,
    nullable: true,
  })
  lastName?: string;

  public static encryptPassword(passwordInPlaintText: string): string {
    const saltRounds = 3;
    return bcrypt.hashSync(
      passwordInPlaintText,
      saltRounds
    );
  }

  updateLastLogin() {
    // set last login
    this.lastLogin = new Date();
  }

  public checkPassword(passwordInPlaintText: string): boolean {
    const isValid = bcrypt.compareSync(
      passwordInPlaintText,
      this.password
    );
    if (isValid) {
      this.updateLastLogin();
    }
    return isValid;
  }

  @BeforeInsert()
  setPasswordHash() {
    // get password hash
    this.password = User.encryptPassword(this.password);
    this.updateLastLogin();
  }

  public static getRepo():Repository<User> {
    return getOrmManager().getRepository(User);
  }
}
