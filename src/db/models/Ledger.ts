import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './User';
import Category from './Category';
import Transaction from './Transaction';
import Account from './Account';
import Payee from './Payee';

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
    indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['userID', 'ledgerName']
    },],
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

Ledger.hasMany(Account,{
   sourceKey: 'id',
   foreignKey: 'ledgerID',
   as: 'fkRefAccount',
});

Ledger.hasMany(Payee,{
   sourceKey: 'id',
   foreignKey: 'ledgerID',
   as: 'fkRefPayee',
});