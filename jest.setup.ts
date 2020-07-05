import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

beforeAll(async () => {
  console.log('before all');
  await createConnection();
  console.log('get test connection done');
});

afterAll(async () => {
  const defaultConnection = getConnection();
  await defaultConnection.close();
  console.log('close connections done');
});
