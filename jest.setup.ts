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
  logger.info('before all');
  await prepareConnection();
  logger.info('get test connection done');

  const UserRepo = User.getRepo();
  const user = (await UserRepo.create(user2Data));
  await UserRepo.save(user);


  logger.info(user2Data.userName, 'test user and ledger created');
});

afterAll(async () => {
  await getOrmManager().query(
    `
    DELETE FROM USER WHERE email = '${user2Data.email}'; 
    `
  );
  logger.info('test data deleted');

  const defaultConnection = getConnection();
  await defaultConnection.close();
  logger.info('close connections done');
});
