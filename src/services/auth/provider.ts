import { User } from "../../entity/User";
import { getOrmManager } from '../../db/ormManager';
import * as jwt from 'jsonwebtoken';


export const getOne = async (id: number): Promise<User> => {
  const UserRepo = getOrmManager().getRepository(User);
  const user = await UserRepo.findOne(id);
  return user as User;
};

export const getOneByEmail = async (email: string): Promise<User> => {
  const UserRepo = getOrmManager().getRepository(User);
  const user = await UserRepo.findOne({email: email});
  return user as User;
};

export const disableOne = async (id: number): Promise<User> => {
  const UserRepo = getOrmManager().getRepository(User);
  const user = await UserRepo.findOne(id);
  user.active = false;
  const updatedUser = await UserRepo.save(user);
  return updatedUser;
};


export const deleteOne = async (id: number, softDelete = true): Promise<void> => {
  const UserRepo = getOrmManager().getRepository(User);
  const user = await UserRepo.findOne(id);
  if (softDelete) {
    await UserRepo.softDelete(user.id);
  } else {
    await UserRepo.delete(user.id);
  }
};



export const signUp = async (userBody?: any): Promise<User> => {
  const UserRepo = getOrmManager().getRepository(User);
  const user = (await UserRepo.create(userBody));
  const users = await UserRepo.save(user);
  return users as unknown as User;
};


export const signIn = async (email: string, password: string): Promise<User> => {
  const UserRepo = getOrmManager().getRepository(User);
  const user = await UserRepo.findOne({email: email});
  if (user && user.checkPassword(password)) {
    return user;
  } else {
    return null;
  }
};

export interface IJWTPayload {
  sub: number, // subject
  userID?: number,
  email?: string,
  iat: number, // timestamp issue at
  exp: number, // exp timestamp
}

/**
 * ref https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
 */
export const signJWT = (userID: number, email: string): string => {
  const currentTimeStamp = new Date().getTime();
  return jwt.sign(
    {
      sub: userID,
      userID: userID,
      email: email,
      iat: currentTimeStamp,
      exp: currentTimeStamp +  60 * 60 * 24,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256'
    }
  );
};

export const verifyJWT = async (token: string): Promise<IJWTPayload> => {
  const payload: IJWTPayload = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      algorithms: ['HS256']
    }) as unknown as IJWTPayload;
  return payload;
};
