import {signUp, signIn, encryptPassword, validate} from './provider';

describe('encryptPassword', ()=> {

  it('encryptPassword', ()=> {
    expect(encryptPassword("12345")).toEqual("158ee933a64b8629913bbb87046a0336a615e086");
  })

  it('validate', ()=> {
    expect(validate("12345")).toEqual("Password must be at least 6 characters");
  })

});

