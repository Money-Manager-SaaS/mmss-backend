import User from '../models/User';
import faker from '../faker';
import Ledger from '../models/Ledger';
import Account from '../models/Account';
import Category from '../models/Category';
import Payee from '../models/Payee';
import Transaction from '../models/Transaction';

export const userSeeder = async (userCount: number) => {
  const forceSync = !!process.env.forceSync;
  await User.sync({force: forceSync});
  const users = await Promise.all([...Array(userCount).keys()].map(
    async (): Promise<User> => {
      const user = await User.create({
        userName: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.random.word(),
      });
      return user;
    }
  ));
  return users;
};


export const ledgerSeeder = async (num: number, users: User[]) => {
  const forceSync = !!process.env.forceSync;
  await Ledger.sync({force: forceSync});
  const ledgers = await Promise.all([...Array(num).keys()].map(
    async (): Promise<Ledger> => {
      return Ledger.create({
        name: 'Ledger ' + faker.name.jobArea() + faker.random.word(),
        userID: users[Math.floor(Math.random() * users.length)].id,
        description: faker.lorem.text(),
      });
    }
  ));
  return ledgers;
};


export const accountSeeder = async (num: number, ledgers: Ledger[]): Promise<Array<Account>> => {
  const forceSync = !!process.env.forceSync;
  await Account.sync({force: forceSync});
  return Promise.all([...Array(num).keys()].map(
    async (): Promise<Account> => {
      return Account.create({
        name: 'Account ' + faker.finance.accountName() + faker.random.word(),
        amount: faker.finance.amount(),
        currency: 'NZD',
        description: faker.lorem.text(),
        ledgerID: ledgers[Math.floor(Math.random() * ledgers.length)].id,
      });
    }
  ));
};


export const categorySeeder = async (num: number, ledgers: Ledger[]): Promise<Array<Category>> => {
  const forceSync = !!process.env.forceSync;
  await Category.sync({force: forceSync});
  return Promise.all([...Array(num).keys()].map(
    async (): Promise<Category> => {
      return Category.create({
        name: 'Category ' + faker.random.word(),
        description: faker.lorem.text(),
        ledgerID: ledgers[Math.floor(Math.random() * ledgers.length)].id,
      });
    }
  ));
};

export const payeeSeeder = async (num: number, ledgers: Ledger[]): Promise<Array<Payee>> => {
  const forceSync = !!process.env.forceSync;
  await Payee.sync({force: forceSync});
  return Promise.all([...Array(num).keys()].map(
    async (): Promise<Payee> => {
      return Payee.create({
        name: 'Payee ' + faker.random.word(),
        description: faker.lorem.text(),
        ledgerID: ledgers[Math.floor(Math.random() * ledgers.length)].id,
      });
    }
  ));
};

export const transactionSeeder = async (
  num: number,
  acct: Account,
  accounts: Account[],
  categories: Category[],
  payees: Payee[],
  amount?: number,
): Promise<Array<Transaction>> => {
  const forceSync = !!process.env.forceSync;
  await Transaction.sync({force: forceSync});
  return Promise.all([...Array(num).keys()].map(
    async (): Promise<Transaction> => {
      const transferType = [-1, 0, 1][Math.floor(Math.random() * 3)];
      let toAccountID = undefined;

      if (transferType === 0) {
        toAccountID = acct.id === accounts.length - 1 ? 0 : acct.id + 1;
      }
      return Transaction.create({
        transferType: transferType,
        amount: amount ? amount : faker.finance.amount(),
        note: faker.lorem.text(),
        date: faker.date.recent(),
        accountID: acct.id,
        toAccountID: toAccountID,
        categoryID: Math.random() > 0.5 ? categories[Math.floor(Math.random() * categories.length)].id : undefined,
        payeeID: Math.random() > 0.5 ? payees[Math.floor(Math.random() * payees.length)].id : undefined,
      });
    }
  ));
};
