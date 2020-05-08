import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Transaction from './Transaction';


export default class Category extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
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
}, {
    indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['ledgerID', 'name']
    },],
  sequelize,
  tableName: 'categories',
});

Category.hasMany(Transaction,{
   sourceKey: 'id',
   foreignKey: 'categoryID',
   as: 'fkRefCategory',
});