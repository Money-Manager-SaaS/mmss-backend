import * as services from './service';
import passportJWT from '../../middleware/passportJWT';
export default [
  {
    path: '/api/auth/signin',
    method: 'post',
    handler: [services.signIn],
  },
  {
    path: '/api/auth/signup',
    method: 'post',
    handler: [services.signUp],
  },
  {
    path: '/api/auth/secret',
    method: 'get',
    handler: [passportJWT, services.secret],
  },
];
