import Account from '../../db/models/Ledger';

export const getAll = async () => {
    const trans = await Ledger.findAll();
    return {ledgers: trans};
};

export const getOne = async (id: number) => {
    const tran = await Ledger.findByPk(id);
    return tran;
};

export const updateOne = async (id: number, category: ledger) => {
    const t: Ledger | null = await Ledger.findByPk(id);
    !!t && await t.update(category);
    return t;
};

export const deleteOne = async (id: number) => {
    const t: Ledger | null = await Ledger.findByPk(id);
    !!t && await t.destroy();
    return t;
};
