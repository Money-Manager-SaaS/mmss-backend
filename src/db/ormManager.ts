import { createConnection, getManager } from 'typeorm';
import * as ormConfig from '../../ormconfig';
import logger from '../logger';

export const getDBPath = () => {
  return getDBConfig().database;
}

export const getDBConfig = () => {
  return ormConfig;
}

export const getOrmManager = () => {
  return getManager();
};

export const prepareConnection = async () => {
  const connection = await createConnection();
  if (ormConfig.type==='sqlite' && !ormConfig.synchronize) {
    logger.info('using sqlite db and turn off FK constraint');
    await connection.query('PRAGMA foreign_keys=OFF');
    await connection.synchronize();
    await connection.query('PRAGMA foreign_keys=ON');
  }
  return connection;
}
