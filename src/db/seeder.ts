import Account from './models/Account';
import Transaction from './models/Transaction';
import Category from './models/Category';
import User from './models/User';
import Ledger from './models/Ledger';
import Payee from './models/Payee';


export const init = async () => {
  const forceSync = !!process.env.forceSync;
  await Account.sync({force: forceSync});
  await Transaction.sync({force: forceSync});
  await Category.sync({force: forceSync});
  await User.sync({force: forceSync});
  await Ledger.sync({force: forceSync});
  await Payee.sync({force: forceSync});

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

  const jack = await User.create({
    username: 'jack',
    email: 'jack.JJJ@gmail.com',
    last_login: '2010/08/19',
    date_login: '2011/09/10',
    passwordhash: '89djheddkhdee33'
  });

  const tom = await User.create({
    username: 'tom',
    email: 'tom.c@Kmail.com',
    last_login: '2011/10/19',
    date_login: '2018/03/18',
    passwordhash: '90d0dke888dje3j'
  });


  const supermarket = await Ledger.create({
    userid:7870009,
    ledgername: 'supermarket',
  });

  const employee = await Payee.create({
    name: 'xiao zhang',
  });

  console.log('db seeding done');
};

if (typeof require !== 'undefined' && require.main === module) {
  init();
}
