import { Request, Response } from 'express';
import * as provider from './provider';


export const singIn = async ({body}: Request, res: Response) => {
  const result = await provider.signIn(body?.email, body?.password);
  if (result) {
    result.password = undefined;
    res.status(200).send(result);
  } else {
    res.status(401).end();
  }
};

export const singUp = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await provider.signUp(body);
    result.password = undefined;
    res.status(200).send(result);
  } catch (e) {
    res.status(401).end();
  }
};

export const deleteUser = async ({params}: Request, res: Response) => {
  const user = await provider.signIn(params?.email, params?.password);
  if (user) {
    const result = await provider.deleteOne(user.id);
    res.status(200).send(result);
  }
  res.status(400).end();
};

export const resetPassword = async ({params}: Request, res: Response) => {
  // haha todo add a reset password endpoint
};
