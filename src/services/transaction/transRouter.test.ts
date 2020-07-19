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
  name: 'ledger2transaction',
  description: 'desp',
  userId: null,
};

const accountData = {
  name: 'account2',
  description: 'haha',
  amount: 11,
}


describe("transactions routes", () => {
  let token;
  let user;
  let transactions = [];
  let ledger;
  let account;
  let entity;
  let updatedEntityData;

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

  it('get all before create, should be empty', async () => {
    const resp = await supertest(app).get('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
    expect(!resp.body?.data?.length);
    expect(!resp.body?.count);
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

  it('get one', async () => {
    const resp = await supertest(app).get(`/${ledger.id}/${entity.id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.amount).toEqual(entity.amount);
    expect(+resp.body.accountId).toEqual(+account.id);
  });

  it('get all should be one now', async () => {
    const resp = await supertest(app).get(`/${ledger.id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(1);
    expect(resp.body.data?.length).toEqual(1);
    expect(resp.body.data[0].id).toEqual(entity.id);
  });

  it('shout not get not existed one', async () => {
    const resp = await supertest(app).get(`/${ledger.id}/${entity.id + 100}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
  });

  it('update one', async () => {
    const tmpEntity = {...entityData};
    updatedEntityData = {
      ...tmpEntity,
      amount: 12,
    };
    const resp = await supertest(app).put(`/${ledger.id}/${entity.id}`)
      .send(updatedEntityData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
  });

  it('get updated one', async () => {
    const resp = await supertest(app).get(`/${ledger.id}/${entity.id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.amount).toEqual(updatedEntityData.amount);
  });

  it('should not update not existed one', async () => {
    updatedEntityData = {
      ...entity,
      name: 'test-entity-1',
    };
    const resp = await supertest(app).put(`/${ledger.id}/${entity.id+1}`)
      .send(updatedEntityData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(400);
  });

  it('delete the one', async () => {
    const resp = await supertest(app).delete(`/${ledger.id}/${entity.id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
  });

  it('should not delete un-exited one', async () => {
    const resp = await supertest(app).delete(`/${ledger.id}/${entity.id+1}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(400);
  });

  it('should not get after delete', async () => {
    const resp = await supertest(app).get(`/${ledger.id}/${entity.id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
  });

});
