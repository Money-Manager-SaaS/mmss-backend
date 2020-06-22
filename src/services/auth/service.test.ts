import {signIn} from './service';
import { mockRequest, mockResponse } from 'mock-req-res';


// mock request and response
// https://itnext.io/mocking-expressjs-request-and-response-objects-63405e9c58ff
// more example here: https://www.npmjs.com/package/mock-req-res

describe('signIn', ()=> {
    const req = mockRequest({body: {username: "tim", password: "123456"}});
    console.log(req.body.username, req.body.password);
    const res = mockResponse();

    it('signIn', async ()=> {
      await signIn(req, res);
      expect(res.cookie('t')).toBeDefined();
    })
  }
);