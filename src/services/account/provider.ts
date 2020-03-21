import Account from '../../db/models/Account';

export const getAll = async () => {
    const trans = await Account.findAll();
    return {transactions: trans};
};

export const getOne = async (id: number) => {
    const tran = await Account.findByPk(id);
    return tran;
};

export const updateOne = async (id: number, category: Account) => {
    const t: Account | null = await Account.findByPk(id);
    !!t && await t.update(category);
    return t;
};

export const deleteOne = async (id: number) => {
    const t: Account | null = await Account.findByPk(id);
    !!t && await t.destroy();
    return t;
};
