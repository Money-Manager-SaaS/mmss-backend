import {signUp, signIn, encryptPassword, validate} from './provider';

describe('encryptPassword', ()=> {

  it('encryptPassword', ()=> {
    encryptPassword("12345");
    expect(encryptPassword("12345")).toEqual("158ee933a64b8629913bbb87046a0336a615e086");
  })
});

