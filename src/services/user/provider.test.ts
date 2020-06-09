import {signUp, signIn, encryptPassword, validate} from './provider';
import User from '../../db/models/User';

describe('encryptPassword', ()=> {
  it('encryptPassword', ()=> {
    expect(encryptPassword("12345")).toEqual("158ee933a64b8629913bbb87046a0336a615e086");
  })

  it('validate', ()=> {
    expect(validate("12345")).toEqual("Password must be at least 6 characters");
  })
});


describe('signUp', ()=> {
  it('signUp', async ()=> {
    signUp({
      userName: "tim",
      email: "tim@gmail.com",
      password: encryptPassword("123456"),
  });

  const user = await User.findOne({
    where: {
        userName: "tim",
    },
  });
  console.log("user!.id", user!.id);  
  expect(user!.id).toBeGreaterThan(0);
  })
});

describe('signIn', ()=> {
  it('signIn', async ()=> {
    const [token, id, email] = await signIn("tim", "123456");
    expect(email).toEqual("tim@gmail.com");
  })
}
);


