import {getAll} from './service';
import { mockRequest, mockResponse } from 'mock-req-res';
import { HTTP400Error } from "../../utils/httpErrors";

// mock request and response
// https://itnext.io/mocking-expressjs-request-and-response-objects-63405e9c58ff
// more example here: https://www.npmjs.com/package/mock-req-res

describe('getall category', ()=> {
    const req = mockRequest({});
    const res = mockResponse();

    it('getAll', async ()=> {
        await getAll(req, res);
        expect(res.cookie()).toBeUndefined;
    })
  }
);