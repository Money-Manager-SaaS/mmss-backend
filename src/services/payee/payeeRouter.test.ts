import theRouter from './payeeRouter';
import * as supertest from 'supertest';
import * as express from "express";
import { getOrmManager } from '../../db/ormManager';
import { User } from '../../entity/User';
import { signAccessToken } from '../auth/provider';
import { Ledger } from '../../entity/Ledger';
import logger from '../../logger';

const app = express();
app.use('/', theRouter);

const entityData = {
  name: 'test-payee',
  description: 'haha optional',
  ledgerID: null,
};

const ledger2Data = {
  name: 'ledger2payee',
  userId: null,
};

describe("payee routes", () => {
  let token;
  let user;
  let ledger;
  let entity;
  let updatedEntityData;

  beforeAll(async () => {
    const UserRepo = User.getRepo();
    const users = await UserRepo.find();
    user = users[0];
    token = signAccessToken(users[0].id, user.email);

    const ledgerRepo = Ledger.getRepo();
    ledger = await ledgerRepo.create(ledger2Data);
    ledger.user = user;
    await ledgerRepo.save(ledger);
  });

  afterAll(async () => {
    await getOrmManager().query(
      `DELETE FROM PAYEE where id = '${entity.id}'; `
    );

    await getOrmManager().query(
      `DELETE FROM LEDGER where name = '${ledger.name}';`
    );
  });

  it('get all before create, should be empty', async () => {
    const resp = await supertest(app).get('/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(204);
    expect(!resp.body?.length);
  });

  it('create one', async () => {
    const resp = await supertest(app).post('/' + ledger.id)
      .send(entityData)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(entityData.name);
    expect(+resp.body.ledgerId).toEqual(+ledger.id);
    entity = resp.body;
    logger.debug('entity created');
    logger.debug(entity);
  });

  it('get one', async () => {
    const resp = await supertest(app).get(`/${ledger.id}/${entity.id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual(entityData.name);
  });

  it('get all should be one', async () => {
    const resp = await supertest(app).get(`/${ledger.id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(1);
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
      name: 'test-entity-1',
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
    expect(resp.body.name).toEqual(updatedEntityData.name);
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
