import User from '../../db/models/User';
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import crypto from 'crypto'


export const getAll = async () => {
    const all_users = await User.findAll();
    return {users: all_users};
};

export const updateOne = async (id: number, user: User) => {
    const u: User | null = await User.findByPk(id);
    !!u && await u.update(user);
    return u;
};

export const deleteOne = async (id: number) => {
    const u: User | null = await User.findByPk(id);
    !!u && await u.destroy();
    return u;
};

export const getOne = async (id: number) => {
    const user = await User.findByPk(id);
    return user;
};
