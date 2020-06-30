import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Ledger from './Ledger';


export default class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public userName?: string;
  public firsName?: string;
  public lastName?: string;
  public about?: string;
  public active!: boolean;
  public lastLogin?: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'users',
});

User.hasMany(Ledger, {
  as: 'Ledgers',
  sourceKey: 'id',
  foreignKey: 'userID',
  constraints: false,
});
