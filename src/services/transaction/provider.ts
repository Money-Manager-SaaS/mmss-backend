import path from "path";
import Transaction from '../../db/models/Transaction';

export const index = async () => {
    const trans = await Transaction.findAll();
    return {transactions: trans};
};

export const getOne = async () => {
    const trans = await Transaction.findAll();
    return {transactions: trans};
};
