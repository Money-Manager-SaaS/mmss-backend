import { Request, Response } from 'express';
import * as provider from './provider';

export const index = async ({ query }: Request, res: Response) => {
  const result = await provider.index();
  res.status(200).send(result);
};

export const getOne = async ({ params }: Request, res: Response) => {
  const result = await provider.getOne(+params?.id);
  res.status(200).send(result);
};

export const update = async ({ body, params }: Request, res: Response) => {
  const result = await provider.update(+params?.id, body);
  res.status(200).send(result);
};
