import { Request, Response } from 'express';
import * as provider from './provider';
import { verifyRefreshToken } from './provider';


export const singIn = async ({body}: Request, res: Response) => {
  const result = await provider.signIn(body?.email, body?.password);
  if (result) {
    result.password = undefined;
    const token = await provider.signAccessToken(result.id, result.email);
    const refreshToken = await provider.signRefreshToken(result.id, result.email);
    const body = {
      accessToken: token,
      refreshToken: refreshToken,
      //todo remove the two below, they are not required
      token,
      user: result,
    };
    res.status(200).json(body);
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


export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body?.refreshToken;

  if (refreshToken) {
    const token = refreshToken as string;
    try {
      const payload = await verifyRefreshToken(token);
      if (payload) {
        const token = await provider.signAccessToken(payload.sub, payload.email);
        const body = {
          accessToken: token
        };
        res.status(200).json(body);
      }
    } catch (e) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

export const resetPassword = async ({params}: Request, res: Response) => {
  // haha todo add a reset password endpoint
  // email sender
};
