import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './User';
import Category from './Category';
import Account from './Account';
import Payee from './Payee';

export default class Ledger extends Model {
  public id!: number;
  public userID!: number;
  public name!: string;
  public description?: string;
}

Ledger.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userID', 'name']
    }
  ],
  sequelize,
  tableName: 'ledgers',
});

Ledger.hasMany(Category, {
  as: 'Categories',
  sourceKey: 'id',
  foreignKey: 'ledgerID',
  constraints: false,
});

Ledger.hasMany(Account, {
  as: 'Accounts',
  sourceKey: 'id',
  foreignKey: 'ledgerID',
  constraints: false,
});

Ledger.hasMany(Payee, {
  as: 'Payees',
  sourceKey: 'id',
  foreignKey: 'ledgerID',
  constraints: false,
});
