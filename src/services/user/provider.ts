import User from '../../db/models/User';
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import crypto from 'crypto'

const requiredSignIn = expressJwt({
    secret: "abcdefg",
    userProperty: 'auth',
  })


export const encryptPassword = (password: string) => {
    if(password=='')
    {
        return '';
    }
    try {
      return crypto.createHmac('sha1', "this.salt").update(password).digest('hex');
    } catch (err) {
      return '';
    }
  }

export const validate = (password: string) => {
    if (password && password.length < 6) {
      return 'Password must be at least 6 characters';
    }
  }

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

export const signUp = async (data: any) => {
    const user = User.create({
          userName: data?.userName,
          email: data?.email,
          password: encryptPassword(data?.password),
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

export const getOne = async (id: number) => {
    const user = await User.findByPk(id);
    return user;
};
