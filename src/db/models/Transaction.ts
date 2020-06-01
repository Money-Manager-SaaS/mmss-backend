import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Account from './Account';
import Category from './Category';
import Payee from './Payee';

export default class Transaction extends Model {
  public id!: number;
  public transferType!: number;
  public amount!: number;
  public note?: string;
  public date?: Date;
  public accountID!: number;
  public toAccountID?: number;
  public categoryID?: number;
  public payeeID?: number;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
    autoIncrement: true,
    primaryKey: true,
  },
  transferType: {
    type: DataTypes.INTEGER,
    defaultValue: -1, // -1 is spending money
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  accountID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  toAccountID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  categoryID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  payeeID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'transactions',
});


Transaction.hasOne(Account, {
  sourceKey: 'id',
  foreignKey: 'accountID',
  as: 'Account',
});

Transaction.hasOne(Account, {
  sourceKey: 'id',
  foreignKey: 'toAccountID',
  as: 'ToAccount',
});

Transaction.hasOne(Category,{
  sourceKey: 'id',
  foreignKey: 'categoryID',
  as: 'Category',
});

Transaction.hasOne(Payee,{
  sourceKey: 'id',
  foreignKey: 'payeeID',
  as: 'Payee',
});
