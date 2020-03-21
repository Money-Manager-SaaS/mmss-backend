import Account from '../models/Account';
import Transaction from '../models/Transaction';

export const init = async() => {

  await Account.sync({force: false});
  await Transaction.sync({force: false});

  const cash = await Account.create({
    name: 'cash',
    amount: '100',
  });


  const transaction = await Transaction.create({
    transferType: -1,
    amount: 10,
    accountID: cash.id,
    note: 'hi'
  });

  const findIt = await Transaction.findByPk(transaction.id);
  console.log(findIt);
};

if (typeof require !== 'undefined' && require.main === module) {
  init();
}
