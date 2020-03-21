import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../utils/db';
import Account from './Account';

export default class Transaction extends Model {
  public id!: number;
  public transferType!: number;
  public amount!: number;
  public accountID!: number;

  public note?: string;
  public date?: Date;
  public subCategoryID?: number;
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
  note: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  subCategoryID: {
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
