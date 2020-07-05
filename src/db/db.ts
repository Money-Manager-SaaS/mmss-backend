import * as path from 'path';
import { Sequelize } from 'sequelize';

const sampleDB =  process.env.DB_PATH ? process.env.DB_PATH : path.resolve(__dirname,  '../../demo.db');
console.log(sampleDB, process.env.DB_PATH, 'find db path');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: sampleDB,
  }
);
// const sequelize = new Sequelize('sqlite::memory:');
export default sequelize;
