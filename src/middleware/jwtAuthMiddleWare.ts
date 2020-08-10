import { verifyAccessToken } from '../services/auth/provider';
import { User } from '../entity/User';
import logger from '../logger';

/**
 *  the authorization header is required in request
 * @param req
 * @param res
 * @param next
 */
export const authenticateJWT = async (req, res, next) => {
  if (process.env.BYPATH_ACCESS_TOKEN === 'true' && process.env.NODE_ENV === 'development') {
    // for local development only
    logger.info('bypassing the access token');
    const user = (await User.getRepo().find())[0];
    req.user = user;
    req.userID = user.id;
    req.email = user.email;
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader;
      let payload;
      try {
        payload = await verifyAccessToken(token);
      } catch (e) {
        logger.error(['cannot verify payload' , e]);
        res.status(401).send('wrong token 30');
      }

      if (payload && payload?.exp && payload?.userID && payload.exp > new Date().getTime()) {
        let user:User;
        try {
          user = await User.getRepo().findOne(payload.userID);
          delete user.password;
        } catch (e) {
          logger.error(['cannot verify payload' , e]);
          res.status(401).send('wrong token 40');
        }
        req.user = user;
        req.userID = payload.userID;
        req.email = payload.email;
        next();
      } else {
        res.status(401).send('cannot verify token');
      }
    } else {
      res.status(400).send('authorization header is required');
    }
  }
};
