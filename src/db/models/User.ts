import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Ledger from './Ledger';


export default class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public passwordHash!:string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  passwordHash: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
});

User.hasMany(Ledger, {
  sourceKey: 'id',
  foreignKey: 'userID',
  as: 'fkRefUser',
});
