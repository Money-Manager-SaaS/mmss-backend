import { verifyAccessToken } from '../services/auth/provider';

/**
 *  the authorization header is required in request
 * @param req
 * @param res
 * @param next
 */
export const authenticateJWT = async (req, res, next) => {
  if (process.env.BYPATH_ACCESS_TOKEN && process.env.NODE_ENV === 'development' && !process.env.JEST_TESTING) {
    // for local development only
    next()
  }

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    try {
      const payload = await verifyAccessToken(token);
      if (payload.exp <= new Date().getTime()) {
        res.sendStatus(401);
      }
      req.userID = payload.userID;
      req.email = payload.email;
      next();
    } catch (e) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
