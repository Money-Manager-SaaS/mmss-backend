import theRouter from './ping';
import * as supertest from 'supertest';
import * as express from "express";


const app = express();
app.use('/ping', theRouter);

describe("routes", () => {
  it('a ping, should always be true', async () => {
    const resp = await supertest(app).get('/ping');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual('echo');
  });
});
