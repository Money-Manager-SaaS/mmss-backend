import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

export default class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public last_login!: Date;
  public date_login!: Date;
  public passwordhash!:string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  date_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  passwordhash: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
});

