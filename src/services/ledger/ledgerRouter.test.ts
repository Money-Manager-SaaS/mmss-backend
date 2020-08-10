import theRouter from './ledgerRouter';
import * as supertest from 'supertest';
import * as express from "express";
import { getOrmManager } from '../../db/ormManager';
import { User } from '../../entity/User';
import { signAccessToken } from '../auth/provider';
import logger from '../../logger';
import defaultLedger from './defaultLedger';

const app = express();
app.use('/', theRouter);

const ledgerData = {
  name: 'test-ledger',
  description: 'haha optional',
  userID: null,
};


describe("ledger routes", () => {
  let token;
  let user;
  let ledger;
  let updatedLedgerData;

  beforeAll(async () => {
    const UserRepo = getOrmManager().getRepository(User);
    const users = await UserRepo.find();
    user = users[0];
    token = signAccessToken(users[0].id, user.email);
    logger.info('get an access token and a user');
    ledgerData.userID = user.id;
  });

  afterAll(async () => {
    await getOrmManager().query(
      `DELETE FROM LEDGER; `
    );
  });

  it('get all before create, should be empty', async () => {
    const resp = await supertest(app).get('/')
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
    expect(!resp.body?.length);
  });

  it('create one', async () => {
    const resp = await supertest(app).post('/')
      .send(ledgerData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(ledgerData.name);
    expect(resp.body.user.userName).toEqual(user.userName);
    ledger = resp.body;
  });

  it('get one', async () => {
    const resp = await supertest(app).get('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(ledgerData.name);
  });

  it('get all should be one', async () => {
    const resp = await supertest(app).get('/')
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(1);
  });

  it('shout not get not existed one', async () => {
    const resp = await supertest(app).get('/' + ledger.id+1)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
  });

  it('update one', async () => {
    const tmpLedger = {...ledgerData};
    delete tmpLedger.userID;
    updatedLedgerData = {
      ...tmpLedger,
      name: 'test-ledger-1',
    };
    const resp = await supertest(app).put('/' + ledger.id)
      .send(updatedLedgerData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
  });

  it('get updated one', async () => {
    const resp = await supertest(app).get('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(updatedLedgerData.name);
  });

  it('should not update not existed one', async () => {
    updatedLedgerData = {
      ...ledger,
      name: 'test-ledger-1',
    };
    const resp = await supertest(app).put('/' + ledger.id+1)
      .send(updatedLedgerData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(400);
  });

  it('delete the one', async () => {
    const resp = await supertest(app).delete('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
  });

  it('should not delete un-exited one', async () => {
    const resp = await supertest(app).delete('/' + ledger.id+1)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(400);
  });

  it('should not get after delete', async () => {
    const resp = await supertest(app).get('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
  });

  it('get default one', async () => {
    const resp = await supertest(app).post('/default')
      .send({})
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    // todo better test asserting
    expect(resp.body.accounts.length).toEqual(defaultLedger.accounts.length)
  });

});
