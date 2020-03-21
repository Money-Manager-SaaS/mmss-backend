import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Account from './Account';
import Category from './Category';

export default class Transaction extends Model {
  public id!: number;
  public transferType!: number;
  public amount!: number;
  public accountID!: number;
  public toAccountID!: number;

  public note?: string;
  public date?: Date;
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
    defaultValue: -1,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  accountID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  toAccountID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  note: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
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
