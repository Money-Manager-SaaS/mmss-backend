import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Ledger from './Ledger';
import Transaction from './Transaction';
import Category from './Category';

export default class Account extends Model {
  public id!: number;
  public name!: string;
  public amount!: number;
  public currency!: string;
  public description?: string;
  public ledgerID!: number;
}

Account.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    ledgerID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['ledgerID', 'name']
      },
    ],
    sequelize,
    tableName: 'accounts',
  });

Account.hasMany(Transaction, {
  sourceKey: 'id',
  foreignKey: 'accountID',
  as: 'Transactions',
  constraints: false,
});


Account.hasMany(Transaction, {
  sourceKey: 'id',
  foreignKey: 'toAccountID',
  as: 'TransferTransactions',
  constraints: false,
});
