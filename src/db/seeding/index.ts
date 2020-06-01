import { accountSeeder, categorySeeder, ledgerSeeder, payeeSeeder, transactionSeeder, userSeeder } from './seeders';
import Account from '../models/Account';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import Ledger from '../models/Ledger';
import Payee from '../models/Payee';
import User from '../models/User';


export const init = async () => {
  const forceSync = !!process.env.forceSync;
  await Account.sync({force: forceSync});
  await Transaction.sync({force: forceSync});
  await Category.sync({force: forceSync});
  await User.sync({force: forceSync});
  await Ledger.sync({force: forceSync});
  await Payee.sync({force: forceSync});

  const users = await userSeeder(2);

  const ledgers = await ledgerSeeder(3, users);

  const accounts = await accountSeeder(8, ledgers);
  const categories = await categorySeeder(4, ledgers);
  const payees = await payeeSeeder(4, ledgers);

  await Promise.all(accounts.map(
    async (acct) => {
      const trans = await transactionSeeder(
        10,
        acct,
        accounts,
        categories,
        payees
      );
      return trans;
    }
  ));

  console.log('db seeding done');
};

if (typeof require !== 'undefined' && require.main === module) {
  init();
}
