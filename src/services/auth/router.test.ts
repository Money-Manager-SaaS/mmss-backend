import theRouter from './router';
import * as supertest from 'supertest';
import * as express from "express";
import { Router } from 'express';
import { Test } from 'supertest';
import { getOrmManager } from '../../db/ormManager';

const user1Data = {
  userName: 'un1',
  password: '12345678',
  email: 'un1@email.com',
};

const app = express();
app.use('/auth', theRouter);

// a helper function to make a POST request.
export function post(url, body): Test{
  const httpRequest = supertest(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json');
  return httpRequest;
}


// a helper function to make a POST request.
export function deleteUser(url, body): Test{
  const httpRequest = supertest(app).delete(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json');
  return httpRequest;
}

describe("routes", () => {
  let user;
  afterAll(async () => {
    await getOrmManager().query(
      `DELETE FROM USER WHERE id = '${user.id}'; `
    );
  });

  it('sign up a user', async () => {
    const resp = await post('/auth/signup', user1Data);
    user = resp.body;
    expect(resp.status).toEqual(200);
    expect(user.email).toEqual(user1Data.email);
  });

  it('sign up same user again', async () => {
    const resp = await post('/auth/signup', user1Data);
    expect(resp.status).toEqual(401);
  });

  it('sign in the user', async () => {
    const resp = await supertest(app).post('/auth/signin').send(user1Data);
    expect(resp.status).toEqual(200);
  });

  it('sign in the user with wrong password', async () => {
    const resp = await supertest(app).post('/auth/signin').send(Object.assign({}, user1Data, {password: '1'}));
    expect(resp.status).toEqual(401);
  });
});
