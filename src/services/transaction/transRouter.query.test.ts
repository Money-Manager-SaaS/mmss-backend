import theRouter from './transRouter';
import * as supertest from 'supertest';
import * as express from "express";
import { getOrmManager } from '../../db/ormManager';
import { User } from '../../entity/User';
import { signAccessToken } from '../auth/provider';
import { Ledger } from '../../entity/Ledger';
import logger from '../../logger';
import { Account } from '../../entity/Account';

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


describe("transactions routes basic query parameters", () => {
  let token;
  let user;
  let transactions = [];
  let ledger;
  let account;
  let entity;

  beforeAll(async () => {
    // create user
    const UserRepo = User.getRepo();
    const users = await UserRepo.find();
    user = users[0];
    token = signAccessToken(users[0].id, user.email);

    // create ledger
    const ledgerRepo = Ledger.getRepo();
    ledger = await ledgerRepo.create(ledger2Data);
    ledger.user = user;
    await ledgerRepo.save(ledger);

    // create account
    const accountRepo = Account.getRepo();
    account = await accountRepo.create(accountData);
    account.ledger = ledger;
    await accountRepo.save(account);
    logger.debug('account created');
    logger.debug(account);
  });

  it('create one', async () => {
    entityData.accountID = account.id;
    const resp = await supertest(app).post('/' + ledger.id)
      .send(entityData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.amount).toEqual(entityData.amount);
    expect(+resp.body.accountId).toEqual(+account.id);
    entity = resp.body;
    transactions.push(entity);
    logger.debug('entity created');
    logger.debug(entity);
  });
  //
  it('get all with query parameters', async () => {
    const resp = await supertest(app).get(`/${ledger.id}?limit=2&accountID=${account.id}&lt=1000`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(1);
  });

  it('get all with wrong skip and limit', async () => {
    const resp = await supertest(app).get(`/${ledger.id}?limit=2&skip=1`)
      .set({'Authorization': token}
      );
    logger.debug(resp.body);
    expect(resp.status).toEqual(204);
    // expect(resp.body.count).toEqual(0);
  });

  it('get all with amount lt', async () => {
    const resp = await supertest(app).get(`/${ledger.id}?lt=1000`)
      .set({'Authorization': token}
      );
    logger.debug(resp.body);
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(1);
  });

  it('get all with amount gt', async () => {
    const resp = await supertest(app).get(`/${ledger.id}?gt=1000`)
      .set({'Authorization': token}
      );
    logger.debug(resp.body);
    expect(resp.status).toEqual(204);
  });

});
