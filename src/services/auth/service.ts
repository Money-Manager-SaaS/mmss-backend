import { Request, Response } from 'express';
import * as provider from './provider';

export const signIn = async ({ params, body }: Request, res: Response) => {
  const [token, id, email] = await provider.signIn(body?.email, body?.password);
  console.debug(body?.email, body?.password);
  // Optional if we choose to set the token to a cookie in the response
  // object so its available in the client side if cookie is the
  // prefer for of jwt storage

  res.cookie('t', token, {
    expires: new Date(Date.now() + 9999),
    httpOnly: true,
  });

  res.status(200).send({
    email: email,
  });
};

export const signUp = async ({ body, params }: Request, res: Response) => {
  const result = await provider.signUp(body);
  res.status(200).send(result);
};
