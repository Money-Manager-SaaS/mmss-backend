import { getConnection } from 'typeorm';
import { User } from './src/entity/User';
import { getDBPath, getOrmManager, prepareConnection } from './src/db/ormManager';
import logger from './src/logger';
import * as fs from 'fs';

const user2Data = {
  userName: 'un2',
  password: '12345678',
  email: 'un2@email.com',
};


beforeAll(async () => {
  await fs.copyFile(
    'test.sqlite.backup', getDBPath(),
    (e) => {
      logger.error(e);
    }
  )


  logger.info('before all');
  await prepareConnection();
  logger.info('get test connection done');

  const UserRepo = User.getRepo();
  const user = (await UserRepo.create(user2Data));
  await UserRepo.save(user);


  logger.info(user2Data.userName, 'test user and ledger created');
});

afterAll(async () => {
  const defaultConnection = getConnection();
  await defaultConnection.close();
  logger.info('close connections done');
  await fs.unlink(
    getDBPath(),
    (e) => {
      logger.error(e);
    }
  );
});
