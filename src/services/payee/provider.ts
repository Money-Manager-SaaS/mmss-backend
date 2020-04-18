import Payee from '../../db/models/Payee';

export const getAll = async () => {
    const trans = await Payee.findAll();
    return {payees: trans};
};

export const getOne = async (id: number) => {
    const tran = await Payee.findByPk(id);
    return tran;
};

export const updateOne = async (id: number, category: Payee) => {
    const t: Payee | null = await Payee.findByPk(id);
    !!t && await t.update(category);
    return t;
};

export const deleteOne = async (id: number) => {
    const t: Payee | null = await Payee.findByPk(id);
    !!t && await t.destroy();
    return t;
};
