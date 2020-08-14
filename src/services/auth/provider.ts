import { User } from '../../entity/User';
import * as jwt from 'jsonwebtoken';
import createDefaultLedger from '../ledger/defaultLedger';
export const getOne = async (id: number): Promise<User> => {
  const UserRepo = User.getRepo();
  const user = await UserRepo.findOne(id);
  return user as User;
};

export const getOneByEmail = async (email: string): Promise<User> => {
  const UserRepo = User.getRepo();
  const user = await UserRepo.findOne({ email: email });
  return user as User;
};

export const disableOne = async (id: number): Promise<User> => {
  const UserRepo = User.getRepo();
  const user = await UserRepo.findOne(id);
  user.active = false;
  const updatedUser = await UserRepo.save(user);
  return updatedUser;
};

export const deleteOne = async (id: number, softDelete = true): Promise<void> => {
  const UserRepo = User.getRepo();
  const user = await UserRepo.findOne(id);
  if (softDelete) {
    await UserRepo.softDelete(user.id);
  } else {
    await UserRepo.delete(user.id);
  }
};

export const signUp = async (userBody?: any): Promise<User> => {
  const UserRepo = User.getRepo();
  const user = await UserRepo.create(userBody);
  const users = await UserRepo.save(user);
  await createDefaultLedger(user);
  return (users as unknown) as User;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const UserRepo = User.getRepo();
  const user = await UserRepo.findOne({ email: email });
  if (user && user.checkPassword(password)) {
    return user;
  } else {
    return null;
  }
};

export interface IJWTPayload {
  sub: number; // subject
  userID?: number;
  email?: string;
  iat: number; // timestamp issue at
  exp: number; // exp timestamp
}

/**
 * ref https://stackoverflow.com/questions/26739167/jwt-json-web-token-automatic-prolongation-of-expiration/54378344#54378344
 */
export enum TokenType {
  Access = 'Access',
  RefreshToken = 'RefreshToken',
}

/**
 * ref https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
 */
const signJWT = (userID: number, email?: string, tokenType = TokenType.Access, minutes: number = 60): string => {
  const currentTimeStamp = new Date().getTime();
  // todo not use secret but use public and secret key here
  const secret = tokenType === TokenType.Access ? process.env.JWT_SECRET : process.env.JWT_REFRESH_SECRET;
  return jwt.sign(
    {
      sub: userID,
      userID: userID,
      email: email,
      iat: currentTimeStamp,
      exp: currentTimeStamp + 1000 * 60 * minutes,
    },
    secret,
    {
      algorithm: 'HS256',
    }
  );
};

/**
 * can be got through verify refresh token or password
 * @param userID
 * @param email
 */
export const signAccessToken = (userID: number, email?: string) => {
  return signJWT(userID, email, TokenType.Access, 60);
};

/**
 * can only get signed through password login
 * @param userID
 * @param email
 */
export const signRefreshToken = (userID: number, email?: string) => {
  return signJWT(userID, email, TokenType.RefreshToken, 60 * 24 * 14);
};

const verifyJWT = async (token: string, tokenType = TokenType.Access): Promise<IJWTPayload> => {
  const secret = tokenType === TokenType.Access ? process.env.JWT_SECRET : process.env.JWT_REFRESH_SECRET;
  try {
    const payload: IJWTPayload = ((await jwt.verify(token, secret, {
      algorithms: ['HS256'],
    })) as unknown) as IJWTPayload;
    return payload;
  } catch (e) {
    throw e;
  }
};

export const verifyAccessToken = (token: string): Promise<IJWTPayload> => {
  return verifyJWT(token, TokenType.Access);
};

export const verifyRefreshToken = (token: string): Promise<IJWTPayload> => {
  return verifyJWT(token, TokenType.RefreshToken);
};
