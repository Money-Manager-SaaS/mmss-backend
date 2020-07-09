import theRouter from './ledgerRouter';
import * as supertest from 'supertest';
import * as express from "express";
import { getOrmManager } from '../../db/ormManager';
import { User } from '../../entity/User';
import { signAccessToken } from '../../auth/provider';

const app = express();
app.use('/', theRouter);

const ledgerData = {
  name: 'test-ledger',
  description: 'haha optional',
  userID: undefined,
};


describe("routes", () => {
  let token;
  let user;
  let ledger;
  let updatedLedgerData;

  beforeAll(async () => {
    const UserRepo = getOrmManager().getRepository(User);
    const users = await UserRepo.find();
    user = users[0];
    token = signAccessToken(users[0].id, user.email);
    console.log('get an access token and a user');
    ledgerData.userID = user.id;
  });

  afterAll(async () => {
    await getOrmManager().query(
      `DELETE FROM LEDGER; `
    );
  });

  it('create one', async () => {
    const resp = await supertest(app).post('/')
      .send(ledgerData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(ledgerData.name);
    ledger = resp.body;
  });

  it('get one', async () => {
    const resp = await supertest(app).get('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(ledgerData.name);
  });

  it('shout not get not existed one', async () => {
    const resp = await supertest(app).get('/' + ledger.id+1)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
  });

  it('update one', async () => {
    updatedLedgerData = {
      ...ledger,
      name: 'test-ledger-1',
    };
    const resp = await supertest(app).put('/' + ledger.id)
      .send(updatedLedgerData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
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

  it('get updated one', async () => {
    const resp = await supertest(app).get('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(updatedLedgerData.name);
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

});
