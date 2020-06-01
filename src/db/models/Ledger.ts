import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './User';

export default class Ledger extends Model {
  public id!: number;
  public userID!: number;
  public name!: string;
  public description?: string;
}

Ledger.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userID', 'name']
    }
  ],
  sequelize,
  tableName: 'ledgers',
});

Ledger.hasOne(User, {
  sourceKey: 'id',
  foreignKey: 'userID',
  as: 'User',
});
