import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './User';

export default class Ledger extends Model {
  public id!: number;
  public userid!: number;
}

Ledger.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userid: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  sequelize,
  tableName: 'ledgers',
});

Ledger.hasOne(User, {
  sourceKey: 'userid',
  foreignKey: 'id',
  as: 'constraint_userid',
});