import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './User';

export default class Ledger extends Model {
  public id!: number;
  public userID!: number;
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
}, {
  sequelize,
  tableName: 'ledgers',
});

Ledger.hasOne(User, {
  sourceKey: 'id',
  foreignKey: 'userID',
  as: 'constraint_userid',
});