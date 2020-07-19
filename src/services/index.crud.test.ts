import theRouter from './index';
import * as supertest from 'supertest';
import * as express from "express";
import { User } from '../entity/User';
import { signAccessToken } from './auth/provider';
import logger from '../logger';
import * as faker from 'faker';

const app = express();
app.use('/', theRouter);

const ledgers = [];
const accounts = [];
const categories = [];
const payees = [];
const transactions = [];


describe("transactions routes basic query parameters", () => {
  let token;
  let user;

  beforeAll(async () => {
    // sign user
    const UserRepo = User.getRepo();
    const users = await UserRepo.find();
    user = users[0];
    token = signAccessToken(users[0].id, user.email);

  });

  it('create 2 ledgers ', async () => {
    for (let i = 0; i < 2; i++) {
      const name = faker.random.words(2) + faker.random.number();
      const data = {
        name,
        description: faker.random.words(4) + faker.random.number(),
      };
      const resp = await supertest(app).post('/ledgers')
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      expect(resp.body.name).toEqual(name);
      ledgers.push(resp.body);
      logger.debug('create a ledger ' + resp.body.name);
    }
  });

  it('create 4 accounts to ledger1', async () => {
    const ledger = ledgers[0];
    for (let i = 0; i < 4; i++) {
      const name = faker.random.words(2) + faker.random.number();
      const data = {
        name,
        description: faker.random.words(4) + faker.random.number(),
        amount: faker.random.number(),
        currency: {
          symbol: '$',
          name: 'USD',
          rate: 1,
        }
      };
      const resp = await supertest(app).post('/accounts/' + ledger.id)
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      expect(resp.body.name).toEqual(name);
      accounts.push(resp.body);
      logger.debug('create an account ' + resp.body.name);
    }
  });

  it('create 4 categories to ledger1', async () => {
    const ledger = ledgers[0];
    for (let i = 0; i < 4; i++) {
      const data = {
        name: faker.random.words(2) + faker.random.number(),
        description: faker.random.words(4) + faker.random.number(),
      };
      const resp = await supertest(app).post('/categories/' + ledger.id)
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      categories.push(resp.body);
      logger.debug('create a category ' + resp.body.name);
    }
  });

  it('create 4 payees to ledger1', async () => {
    const ledger = ledgers[0];
    for (let i = 0; i < 4; i++) {
      const data = {
        name: faker.random.words(2) + faker.random.number(),
        description: faker.random.words(4) + faker.random.number(),
      };
      const resp = await supertest(app).post('/payees/' + ledger.id)
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      payees.push(resp.body);
      logger.debug('create a payee ' + resp.body.name);
    }
  });

  it('create 4 transfer transactions', async () => {
    const ledger = ledgers[0];
    for (let i = 0; i < 4; i++) {
      const data = {
        amount: Math.abs(faker.random.number()),
        description: faker.random.words(2) + faker.random.number(),
        transferType: 0,
        accountID: accounts[0].id,
        toAccountID: accounts[1].id,
      };
      const resp = await supertest(app).post('/transactions/' + ledger.id)
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      transactions.push(resp.body);
      logger.debug('create transactions ' + resp.body.amount);
    }
  });

  it('create 4 withdraw transactions', async () => {
    const ledger = ledgers[0];
    for (let i = 0; i < 4; i++) {
      const data = {
        amount: Math.abs(faker.random.number()),
        description: faker.random.words(2) + faker.random.number(),
        transferType: -1,
        accountID: accounts[0].id,
        categoryID: categories[0].id,
        payeeID: payees[0].id,
      };
      const resp = await supertest(app).post('/transactions/' + ledger.id)
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      transactions.push(resp.body);
      logger.debug('create transactions ' + resp.body.amount);
    }
  });

  it('create 4 deposit transactions', async () => {
    const ledger = ledgers[0];
    for (let i = 0; i < 4; i++) {
      const data = {
        amount: Math.abs(faker.random.number()),
        description: faker.random.words(2) + faker.random.number(),
        transferType: 1,
        accountID: accounts[0].id,
        categoryID: categories[0].id,
        payeeID: payees[0].id,
      };
      const resp = await supertest(app).post('/transactions/' + ledger.id)
        .send(data)
        .set({'Authorization': token}
        );
      expect(resp.status).toEqual(200);
      transactions.push(resp.body);
      logger.debug('create transactions ' + resp.body.amount);
    }
  });

  it('get all', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id)
      .set({'Authorization': token}
      );
    logger.debug('all transactions', resp.body.data);
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(transactions.length);
    expect(resp.body.data?.length).toEqual(transactions.length);
  });


  it('get all from category 1', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?categoryID=${categories[0].id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(transactions.length - 4);
    expect(resp.body.data?.length).toEqual(transactions.length - 4);
  });

  it('get all from toAccount 1', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?toAccountID=${accounts[1].id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(transactions.length - 8);
    expect(resp.body.data?.length).toEqual(transactions.length - 8);
  });

  it('get all from account 1', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?accountID=${accounts[0].id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(transactions.length);
    expect(resp.body.data?.length).toEqual(transactions.length);
  });

  it('get all from payee 1', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?payeeID=${payees[0].id}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(transactions.length - 4);
    expect(resp.body.data?.length).toEqual(transactions.length - 4);
  });


  it('get all transfer', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?transferType=1`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual( 4);
    expect(resp.body.data?.length).toEqual(4);
  });

  it('get all withdraw', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?transferType=-1`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual( 4);
    expect(resp.body.data?.length).toEqual(4);
  });

  it('get all deposit', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?transferType=1`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual( 4);
    expect(resp.body.data?.length).toEqual(4);
  });


  it('get all description like', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?description=${transactions[0].description}`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toBeGreaterThanOrEqual(1);
    expect(resp.body.data?.length).toBeGreaterThanOrEqual(1);
  });


  it('get all limit 8', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?limit=8`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(8);
    expect(resp.body.total).toEqual(12);
    expect(resp.body.data?.length).toEqual(8);
  });

  it('get all skip 4', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/transactions/' + ledger.id +`?skip=4`)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.count).toEqual(8);
    expect(resp.body.total).toEqual(12);
    expect(resp.body.data?.length).toEqual(8);
  });

  it('get one ledger', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/ledgers/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.accounts.length).toEqual(4);
    expect(resp.body.categories.length).toEqual(4);
    expect(resp.body.payees.length).toEqual(4);
  });

  it('get init for ledger 1', async () => {
    const ledger = ledgers[0];
    const resp = await supertest(app).get('/init/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.data.ledger.accounts.length).toEqual(4);
    expect(resp.body.data.ledger.categories.length).toEqual(4);
    expect(resp.body.data.ledger.payees.length).toEqual(4);
    expect(resp.body.count).toEqual(12);
    expect(resp.body.data.transactions.length).toEqual(12);
  });

  it('get init for ledger 2', async () => {
    const ledger = ledgers[1];
    const resp = await supertest(app).get('/init/' + ledger.id)
      .set({'Authorization': token}
      );
    expect(resp.status).toEqual(200);
    expect(resp.body.data.ledger.accounts.length).toEqual(0);
    expect(resp.body.data.ledger.categories.length).toEqual(0);
    expect(resp.body.data.ledger.payees.length).toEqual(0);
    expect(resp.body.count).toEqual(0);
    expect(resp.body.data.transactions.length).toEqual(0);
  });

  it('get init for ledger 102 (not exist)', async () => {
    const ledger = ledgers[1];
    const resp = await supertest(app).get('/init/' + ledger.id+10090456890645809)
      .set({'Authorization': token}
      );
    expect(resp.status !== 200);
  });

});
