import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Account from './Account';
import Category from './Category';

export default class Transaction extends Model {
  public id!: number;
  public transferType!: number;
  public amount!: number;
  public note?: string;
  public date?: Date;
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
  note: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize,
  tableName: 'transactions',
});


// Transaction.hasOne(Account, {
//   sourceKey: 'id',
//   foreignKey: 'accountID',
//   as: 'Account',
// });
//
// Transaction.hasOne(Account, {
//   sourceKey: 'id',
//   foreignKey: 'toAccountID',
//   as: 'ToAccount',
// });
//
// Transaction.hasOne(Category,{
//   sourceKey: 'id',
//   foreignKey: 'categoryID',
//   as: 'Category',
// });
