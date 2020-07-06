import { User } from "../../entity/User";
import { getOrmManager } from '../../db/ormManager';


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


// todo not use any here
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
