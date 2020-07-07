import * as provider from './provider';
import { getOrmManager } from '../../db/ormManager';

const user1Data = {
  userName: 'un1',
  password: '12345678',
  email: 'un1@email.com',
};

describe(' test auth provider', () => {
  let user;

  beforeAll(async () => {

  });

  it('sign up a new user', async () => {
    try {
      const user = await provider.getOneByEmail(user1Data.email);
      if (user) {
        await provider.deleteOne(user.id, false)
      }
    } catch (e) {
      console.error(e);
    }

    user = (await provider.signUp(user1Data));

    console.log(user, 'the user');
    expect(user.password !== user1Data.password).toEqual(true);
    expect(user.checkPassword(user1Data.password)).toEqual(true);
  });

  it('find it', async () => {
    const byID = await provider.getOne(user.id);
    const byEmail = await provider.getOneByEmail(user.email);

    expect(byEmail).toEqual(byID);
    expect(byID.email).toEqual(user1Data.email);
    expect(byID.active).toEqual(true);
  });

  it('get a jwt token and verify', async ()=>{
    const token = provider.signJWT(user.id, user.email);
    expect(!!token).toEqual(true);
    const result = await provider.verifyJWT(token);
    expect(result.sub).toEqual(user.id);
    expect(result.email).toEqual(user.email);
    expect(result.iat).toBeLessThan(new Date().getTime());
    expect(result.exp).toBeGreaterThan(new Date().getTime());
  });

  it('disable it and enable it', async () => {
    const byID = await provider.disableOne(user.id);
    expect(byID.active).toEqual(false);
  });

  it('delete it', async () => {
    await provider.deleteOne(user.id);
    const u = await provider.getOneByEmail(user.id);
    expect(!u).toEqual(true);
  });

  afterAll(async () => {
    await getOrmManager().query(
      `DELETE FROM USER WHERE id = '${user.id}'; `
    );
  });
});
