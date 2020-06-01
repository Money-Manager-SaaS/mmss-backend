import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Ledger from './Ledger';


export default class Category extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public ledgerID!: number;
}

Category.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
  },
  description: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  ledgerID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['ledgerID', 'name']
    },
  ],
  sequelize,
  tableName: 'categories',
});

Category.hasOne(Ledger, {
  sourceKey: 'id',
  foreignKey: 'ledgerID',
  as: 'Ledger',
});
