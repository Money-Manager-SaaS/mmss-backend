import Category from '../../db/models/Category';

export const getAll = async () => {
    const trans = await Category.findAll();
    return {transactions: trans};
};

export const getOne = async (id: number) => {
    const tran = await Category.findByPk(id);
    return tran;
};

export const updateOne = async (id: number, category: Category) => {
    const t: Category | null = await Category.findByPk(id);
    !!t && await t.update(category);
    return t;
};

export const deleteOne = async (id: number) => {
    const t: Category | null = await Category.findByPk(id);
    !!t && await t.destroy();
    return t;
};
