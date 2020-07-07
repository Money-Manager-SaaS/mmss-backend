import { verifyJWT } from '../services/auth/provider';

/**
 *  the authorization header is required in request
 * @param req
 * @param res
 * @param next
 */
export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    try {
      const payload = await verifyJWT(token);
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
