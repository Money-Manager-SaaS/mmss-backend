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
  //
  // it('create ledgers 2 users', async ()=> {
  //   const users = await userSeeder(1);
  //   const ledgers = await ledgerSeeder(2, users[0].id);
  //   expect(ledgers.length).toEqual(2);
  //   expect(ledgers[0].id).toBeGreaterThanOrEqual(0);
  //
  //   users[0].destroy();
  //   ledgers.forEach(
  //     (u)=> {
  //       u.destroy();
  //     }
  //   )
  // })
});

