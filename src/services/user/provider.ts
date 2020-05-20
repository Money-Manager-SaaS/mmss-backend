import User from '../../db/models/User';


export const getAll = async () => {
    const all_users = await User.findAll();
    return {users: all_users};
};

export const getOne = async (id: number) => {
    const user = await User.findByPk(id);
    return user;
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
