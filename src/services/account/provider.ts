import Account from '../../db/models/Account';

export const getAll = async () => {
    const trans = await Account.findAll();
    return {accounts: trans};
};

export const getOne = async (id: number) => {
    const tran = await Account.findByPk(id);
    return tran;
};

export const create = async (data: any) => {
    const account = Account.create({
          amount: data?.amount,
          ledgerID: data?.ledgerID,
          currency: data?.currency,
          name: data?.name,
      }
    );
    return account;
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
