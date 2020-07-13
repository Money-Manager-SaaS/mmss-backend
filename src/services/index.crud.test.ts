import theRouter from './index';
import * as supertest from 'supertest';
import * as express from "express";
import { User } from '../entity/User';
import { signAccessToken } from './auth/provider';
import { Ledger } from '../entity/Ledger';
import logger from '../logger';
import { Account } from '../entity/Account';
import * as faker from 'faker';

const app = express();
app.use('/', theRouter);

const entityData = {
  description: 'haha optional',
  amount: 10,
  toAmount: null,
  accountID: undefined,
  toAccountID: undefined,
  categoryID: undefined,
  payeeID: undefined,
};

const ledger2Data = {
  name: 'ledger2transaction2',
  description: 'desp',
  userId: null,
};

const accountData = {
  name: 'account3',
  description: 'haha',
  amount: 11,
}

const ledgers = [];
const accounts = [];
const categories = [];
const payees = [];
const transactions = [];


describe("transactions routes basic query parameters", () => {
  let token;
  let user;
  let ledger;

  beforeAll(async () => {
    // sign user
    const UserRepo = User.getRepo();
    const users = await UserRepo.find();
    user = users[0];
    token = signAccessToken(users[0].id, user.email);

    // create 1 ledgers
    const ledgerRepo = Ledger.getRepo();
    ledger = await ledgerRepo.create(ledger2Data);
    ledger.user = user;
    await ledgerRepo.save(ledger);
  });

  it('create 2 ledgers ', async () => {
    for (let i =0; i< 2; i++) {
     const data = {
       name: faker.name.title(),
       description: faker.random.words(5),
     };
      const resp = await supertest(app).post('/ledgers')
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      ledgers.push(resp.body);
      logger.debug('create a ledger ' + resp.body.name);
    }
  });
});
