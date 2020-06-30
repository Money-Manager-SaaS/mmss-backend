import {userSeeder, ledgerSeeder} from './seeders';

describe('create 2 users', ()=> {

  it('just 2 users', async ()=> {
    const users = await userSeeder(2);
    expect(users.length).toEqual(2);
    expect(users[0].id).toBeGreaterThanOrEqual(0);

    users.forEach(
      (u)=> {
        u.destroy();
      }
    )
  })
});

