import User from '../../db/models/User';
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

const requiredSignIn = expressJwt({
    secret: "abcdefg",
    userProperty: 'auth',
  })

export const getAll = async () => {
    const all_users = await User.findAll();
    return {users: all_users};
};

export const signIn = async (userName: string, password: string) => {
    const user = await User.findOne({
        where: {
            userName: userName,
        },
    });

    // To verify the password from the request body using
    // the authenticate method in the model UserSchema
    if ( user!.authenticate(password) == null) {
        return 'Email and Password do not match';
    }
  
    // Generate jwt sign using a secret key and user id
    const token = jwt.sign({
        _id: user!.id,
    }, "abcdefg");

    return [token, user!.id, user!.email] ;
};

export const create = async (data: any) => {
    // todo: + hash func
    /*passwordHash = data?.password;*/
    const user = User.create({
          userName: data?.userName,
          email: data?.email,
          passwordHash: data?.passwordHash,
      }
    );
    return user;
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
