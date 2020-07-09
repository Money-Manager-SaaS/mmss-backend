import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { User } from './src/entity/User';
import { getOrmManager } from './src/db/ormManager';

const user2Data = {
  userName: 'un2',
  password: '12345678',
  email: 'un2@email.com',
};

beforeAll(async () => {
  console.log('before all');
  await createConnection();
  console.log('get test connection done');


  const UserRepo = getOrmManager().getRepository(User);
  const user = (await UserRepo.create(user2Data));
  await UserRepo.save(user);

  console.log(user2Data.userName, 'test user created');
});

afterAll(async () => {
  await getOrmManager().query(
    `DELETE FROM USER WHERE email = '${user2Data.email}'; `
  );
  console.log(user2Data.userName, 'test user deleted');

  const defaultConnection = getConnection();
  await defaultConnection.close();
  console.log('close connections done');
});
