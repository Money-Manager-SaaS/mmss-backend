import Transaction from '../../db/models/Transaction';

// 2. squelize. model get the data based on the parameter.
export const getAll = async (request) => {
    const trans = await Transaction.findAll(
        {
            where: {
                date: {
                          [Op.and]: {
                            [Op.lt]: request.date_to,
                            [Op.gt]: request.date_from
                    }
                 },
                 payeeID: mapping(request.payee),
            }
        }
    );
    return {transactions: trans};
};

export const getOne = async (id: number) => {
    const tran = await Transaction.findByPk(id);
    return tran;
};

export const create = async (data: any) => {
    const tran = Transaction.create({
          transferType: +data?.transferType,
          amount: data?.amount,
          accountID: data?.accountID,
          toAccountID: data?.toAccountID,
          note: data?.note,
          date: data?.date,
          categoryID: data?.categoryID,
          payeeID: data?.payeeID,
      }
    );
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
