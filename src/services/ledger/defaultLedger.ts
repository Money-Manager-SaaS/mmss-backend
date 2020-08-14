import { Ledger } from '../../entity/Ledger';
import { Account } from '../../entity/Account';
import { Payee } from '../../entity/Payee';
import { Category } from '../../entity/Category';
import { getFindOption } from './ledgerUtils';

export const defaultLedgerData = {
  ledger: {
    name: 'Default',
    description: 'a default ledger for getting startted',
  },
  accounts: [
    {
      name: 'cash account',
      amount: 0,
      currency: { name: 'NZD', symbol: '$', rate: 1 },
    },
    {
      name: 'debit account',
      currency: { name: 'NZD', symbol: '$', rate: 1 },
      amount: 0,
    },
  ],
  categories: [
    {
      name: 'Other',
      description: 'Other',
    },
    {
      name: 'Food',
      description: 'vegetables, fruit, etc',
    },
  ],
  payees: [
    {
      name: 'Employer',
      description: 'the Boss',
    },
    {
      name: 'MM-Cloud',
      description: 'the best accounting and money tracker SaaS provider',
    },
  ],
};

export default async (user) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    let ledger = ((await ledgerRepo.create(defaultLedgerData.ledger)) as unknown) as Ledger;
    ledger.user = user;
    await ledgerRepo.save(ledger);

    const calls = [];

    const createAccount = async (data) => {
      const repo = Account.getRepo();
      const item = ((await repo.create(data)) as unknown) as Account;
      item.ledgerId = ledger.id;
      await repo.save(item);
    };
    defaultLedgerData.accounts.forEach((data) => {
      calls.push(createAccount(data));
    });

    const createCategory = async (data) => {
      const repo = Category.getRepo();
      const item = ((await repo.create(data)) as unknown) as Category;
      item.ledgerId = ledger.id;
      await repo.save(item);
    };
    defaultLedgerData.categories.forEach((data) => {
      calls.push(createCategory(data));
    });

    const createPayee = async (data) => {
      const repo = Payee.getRepo();
      const item = ((await repo.create(data)) as unknown) as Payee;
      item.ledgerId = ledger.id;
      await repo.save(item);
    };
    defaultLedgerData.payees.forEach((data) => {
      calls.push(createPayee(data));
    });

    await Promise.all(calls);

    // todo save this one db hit
    ledger = await ledgerRepo.findOne(
      ledger.id,
      Object.assign({}, getFindOption(user.id), {
        relations: ['accounts', 'categories', 'payees'],
      })
    );
  } catch (e) {
    throw new Error('Error');
  }
};
