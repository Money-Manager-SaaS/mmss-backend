import * as provider from './provider';

describe(' test auth provider', ()=> {
  const user1Data = {
    userName: 'un1',
    password: '12345678',
    email: 'un1@email.com',
  };

  let user;

  beforeAll(async ()=>{

  });

  it ('sign up a new user', async()=> {
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

  it ('find it', async()=>{
    const byID = await provider.getOne(user.id);
    const byEmail = await provider.getOneByEmail(user.email);

    expect(byEmail).toEqual(byID);
    expect(byID.email).toEqual(user1Data.email);
  });

  it ('disable it and enable it', async()=>{
    const byID = await provider.disableOne(user.id);

    expect(byID.active).toEqual(false);
  });

  it ('delete it', async()=>{
    await provider.deleteOne(user.id);
    // const deletedUser = await provider.getOneByEmail(user.id);
    // console.log(deletedUser);
  });

  afterAll(async ()=> {
    try {
      const user = await provider.getOneByEmail(user1Data.email);
      if (user) {
        await provider.deleteOne(user.id, false)
      }
    } catch (e) {
      console.error(e);
    }
  })
});
