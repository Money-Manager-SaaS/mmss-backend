import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { User } from './src/entity/User';
import { getOrmManager, prepareConnection } from './src/db/ormManager';
import logger from './src/logger';

const user2Data = {
  userName: 'un2',
  password: '12345678',
  email: 'un2@email.com',
};

beforeAll(async () => {
  logger.debug('before all');
  await prepareConnection();
  logger.debug('get test connection done');

  const UserRepo = User.getRepo();
  const user = (await UserRepo.create(user2Data));
  await UserRepo.save(user);


  logger.debug(user2Data.userName, 'test user and ledger created');
});

afterAll(async () => {
  await getOrmManager().query(
    `
    DELETE FROM USER WHERE email = '${user2Data.email}'; 
    `
  );
  logger.debug('test data deleted');

  const defaultConnection = getConnection();
  await defaultConnection.close();
  logger.debug('close connections done');
});
