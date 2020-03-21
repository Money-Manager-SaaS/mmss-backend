import path from 'path';
import { Sequelize } from 'sequelize';

const sampleDB = path.resolve(__dirname, './data/demo2.db');
const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: sampleDB,
  }
);
// const sequelize = new Sequelize('sqlite::memory:');
export default sequelize;
