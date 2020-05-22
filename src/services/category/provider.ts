import Category from '../../db/models/Category';

export const getAll = async () => {
    const trans = await Category.findAll();
    return {categories: trans};
};

export const getOne = async (id: number) => {
    const tran = await Category.findByPk(id);
    return tran;
};

export const create = async (data: any) => {
    const category = Category.create({
          description: data?.description,
          ledgerID: data?.ledgerID,
          name: data?.name,
      }
    );
    return category;
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
