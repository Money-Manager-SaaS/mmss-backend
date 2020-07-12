import { createConnection, getManager } from 'typeorm';
import * as ormConfig from '../../ormconfig';

export const getDBPath = () => {
  return ormConfig.database;
}

export const getOrmManager = () => {
  return getManager();
};

export const prepareConnection = async () => {
  const connection = await createConnection();
  if (ormConfig.type==='sqlite' && !ormConfig.synchronize) {
    await connection.query('PRAGMA foreign_keys=OFF');
    await connection.synchronize();
    await connection.query('PRAGMA foreign_keys=ON');
  }
  return connection;
}
