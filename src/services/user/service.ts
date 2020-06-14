import { Request, Response } from 'express';
import * as provider from './provider';

export const getAll = async ({ }: Request, res: Response) => {
  const result = await provider.getAll();
  // todo if want to use message, code, do it here at service, not at provider
  res.status(200).send(result);
};

export const signIn = async ({ params, body }: Request, res: Response) => {
  const [token, id, email] = await provider.signIn(body?.username, body?.password);

      // Optional if we choose to set the token to a cookie in the response
    // object so its available in the client side if cookie is the
    // prefer for of jwt storage
    res.cookie('t', token, {
      expires: new Date(Date.now() + 9999),
      httpOnly: true,
    })

    return res.status(200).send(JSON.stringify({
      token,
      user: {
        _id: id,
        name: body?.username,
        email: email,
      },
    }));
};

export const create = async ({ body, params }: Request, res: Response) => {
  const result = await provider.signUp(body);
  res.status(200).send(result);
};

export const updateOne = async ({ body, params }: Request, res: Response) => {
  const result = await provider.updateOne(+params?.id, body);
  res.status(200).send(result);
};

export const deleteOne = async ({  params }: Request, res: Response) => {
  const result = await provider.deleteOne(+params?.id);
  res.status(200).send(result);
};
