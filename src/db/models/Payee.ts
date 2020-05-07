import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Transaction from './Transaction';

export default class Payee extends Model {
  public id!: number;
  public name!: string;
}

Payee.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
  },
}, {
  sequelize,
  tableName: 'payees',
});

Payee.hasMany(Transaction, {
  sourceKey: 'id',
  foreignKey: 'payeeID',
  as: 'fkRefPayee',
});