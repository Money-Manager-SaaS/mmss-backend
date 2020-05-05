import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

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
