import JWT from 'jsonwebtoken';
const JWT_SECRET = 'mmcloud';

const signToken = (email: string) => {
  return JWT.sign(
    {
      iss: 'mmcloud',
      sub: email,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 30), // current time + 30 day ahead
    },
    JWT_SECRET
  );
};

export default signToken;
