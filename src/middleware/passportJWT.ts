import passport from 'passport';
import JwtPassport from 'passport-jwt';
import User from '../db/models/User';

const JWT_SECRET = 'mmcloud';

const cookieExtractor = (req: any) => {
  console.log(req.cookies);
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtPassport.Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    },
    async (req: any, payload: any, done: any) => {
      try {
        console.debug('payload');

        // Find the user specified in token
        const user = await User.findOne({
          where: {
            email: payload.sub,
          },
        });

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }
        // Otherwise, return the user
        req.email = user.email;
        done(null, user.email);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

const passportJWT = passport.authenticate('jwt', { session: false });

export default passportJWT;
