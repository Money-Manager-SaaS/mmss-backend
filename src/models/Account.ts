import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../utils/db';

export default class Account extends Model {
  public id!: number;
  public name!: string;
  public amount!: number;
}

Account.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'accounts',
});
