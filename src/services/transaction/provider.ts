import path from "path";
import Transaction from '../../db/models/Transaction';
import { Op } from 'sequelize';

export const index = async () => {
    const trans = await Transaction.findAll();
    return {transactions: trans};
};

export const getOne = async (pk:number) => {
    const tran = await Transaction.findByPk(pk);
    return tran;
};

export const update = async (id: number, transaction: Transaction) => {
    const t:Transaction | null = await Transaction.findByPk(id);
    !!t && await t.update(transaction)
    return t;
};
