import Account from './models/Account';
import Transaction from './models/Transaction';
import Category from './models/Category';
import User from './models/User'


export const init = async () => {
  const forceSync = !!process.env.forceSync;
  await Account.sync({force: forceSync});
  await Transaction.sync({force: forceSync});
  await Category.sync({force: forceSync});

  const cash = await Account.create({
    name: 'cash',
    amount: '1000',
    currency: 'NZD',
  });

  const bank = await Account.create({
    name: 'debit',
    amount: '10000',
    currency: 'NZD',
  });

  const food = await Category.create(
    {
      name: 'Food'
    }
  );

  const transport = await Category.create(
    {
      name: 'Transport'
    }
  );

  const withdraw = await Transaction.create({
    transferType: -1,
    amount: 10,
    accountID: cash.id,
    categoryID: food.id,
    note: 'a spending on food'
  });


  const transfer = await Transaction.create({
    transferType: 0,
    amount: 10,
    accountID: bank.id,
    toAccountID: cash.id,
    note: 'transfer from bank to cash'
  });

  const income = await Transaction.create({
    transferType: 1,
    amount: 100,
    accountID: bank.id,
    note: 'an income'
  });

   const tom = await User.create({
    username: 'tom',
    email: 'tom@gmail.com',
    passwordhash: 'dferqerwere'
  });

   const jack = await User.create({
    username: 'jack',
    email: 'jack@gmail.com',
    passwordhash: 'fdfdfaerere'
  });

  console.log('db seeding done');
};

if (typeof require !== 'undefined' && require.main === module) {
  init();
}
