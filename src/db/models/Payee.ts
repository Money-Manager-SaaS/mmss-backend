import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Ledger from './Ledger';

export default class Payee extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public ledgerID!: number;
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
  tableName: 'payees',
});

Payee.hasOne(Ledger, {
  sourceKey: 'id',
  foreignKey: 'ledgerID',
  as: 'Ledger',
});
