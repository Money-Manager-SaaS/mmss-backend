import { verifyAccessToken } from '../services/auth/provider';
import { User } from '../entity/User';

/**
 *  the authorization header is required in request
 * @param req
 * @param res
 * @param next
 */
export const authenticateJWT = async (req, res, next) => {
  if (process.env.BYPATH_ACCESS_TOKEN === 'true' && process.env.NODE_ENV === 'development' && process.env.JEST_TESTING !== 'true') {
    // for local development only
    console.log('bypassing the access token');
    const user = (await User.getRepo().find())[0];
    req.user = user;
    req.userID = user.id;
    req.email = user.email;
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader;
      try {
        const payload = await verifyAccessToken(token);
        if (payload.exp <= new Date().getTime()) {
          res.sendStatus(401);
        }
        const user = (await User.getRepo().findOne(payload.userID))[0];
        req.user = user;
        req.userID = payload.userID;
        req.email = payload.email;
        next();
      } catch (e) {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  }
};
