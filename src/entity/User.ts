import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 128,
    unique: true,
  })
  email: string;

  @Column({
    length: 128,
  })
  password: string;

  @Column({
    length: 64,
    nullable: true,
    unique: true
  })
  userName?: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Column({
    type: 'datetime'
  })
  lastLogin: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  about?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  age?: number;

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

  updateLastLogin() {
    // set last login
    this.lastLogin = new Date();
  }

  public checkPassword (passwordInPlaintText: string): boolean {
    const isValid = bcrypt.compareSync(
      passwordInPlaintText,
      this.password
    );
    if (isValid) {
      this.updateLastLogin();
    }
    return isValid;
  }

  public static encryptPassword (passwordInPlaintText: string): string {
    const saltRounds = 3;
    return bcrypt.hashSync(
      passwordInPlaintText,
      saltRounds
    );
  }

  @BeforeInsert()
  setPasswordHash() {
    // get password hash
    this.password = User.encryptPassword(this.password);
    this.updateLastLogin();
  }
}
