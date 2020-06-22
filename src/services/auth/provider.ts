import User from '../../db/models/User';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import crypto from 'crypto';

const requiredSignIn = expressJwt({
  secret: 'abcdefg',
  userProperty: 'auth',
});

const authenticate = (plainText: string, password: string) => {
  return encryptPassword(plainText) === password;
};

export const encryptPassword = (password: string) => {
  if (password == '') {
    return '';
  }
  try {
    return crypto.createHmac('sha1', 'this.salt').update(password).digest('hex');
  } catch (err) {
    return '';
  }
};

export const validate = (password: string) => {
  if (password && password.length < 6) {
    return 'Password must be at least 6 characters';
  }
};

export const signIn = async (email: string, password: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  // To verify the password from the request body using
  // the authenticate method in the model UserSchema
  if (authenticate(password, user!.password) == null) {
    return 'Email and Password do not match';
  }
  //对比完密码后，应该找到用户的其他资料，比如ledge，accounts，categories，payees，返回给用户
  //并且signup也需要类似操作。
  // Generate jwt sign using a secret key and user id
  const token = jwt.sign(
    {
      _id: user!.id,
    },
    'abcdefg'
  );

  return [token, user!.id, user!.email];
};

export const signUp = async (data: any) => {
  const user = User.create({
    userName: data?.userName,
    email: data?.email,
    password: encryptPassword(data?.password),
  });
  return user;
};
