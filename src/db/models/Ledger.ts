import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './User';
import Category from './Category';
import Transaction from './Transaction';

export default class Ledger extends Model {
  public id!: number;
  public userID!: number;
  public ledgerName!: string;
}

Ledger.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  ledgerName: {
    type: DataTypes.STRING(256),
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'ledgers',
});

// Ledger.hasOne(User, {
//   sourceKey: 'userID',
//   foreignKey: 'id',
//   as: 'constraint_userid',
// });

Ledger.hasMany(Category, {
  sourceKey: 'id',
  foreignKey: 'ledgerID',
  as: 'fkRefLedgerForCategory',
});

Ledger.hasMany(Transaction, {
  sourceKey: 'id',
  foreignKey: 'ledgerID',
  as: 'fkRefLedgerForTransaction',
});
