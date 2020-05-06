import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

export default class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public lastLogin!: Date;
  public dateJoin!: Date;
  public passwordHash!:string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dateJoin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  passwordHash: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
});

