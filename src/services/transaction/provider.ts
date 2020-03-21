import Transaction from '../../db/models/Transaction';


export const getAll = async () => {
    const trans = await Transaction.findAll();
    return {transactions: trans};
};

export const getOne = async (id: number) => {
    const tran = await Transaction.findByPk(id);
    return tran;
};

export const updateOne = async (id: number, transaction: Transaction) => {
    const t: Transaction | null = await Transaction.findByPk(id);
    !!t && await t.update(transaction);
    return t;
};

export const deleteOne = async (id: number) => {
    const t: Transaction | null = await Transaction.findByPk(id);
    !!t && await t.destroy();
    return t;
};
