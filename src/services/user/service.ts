import { Request, Response } from 'express';
import * as provider from './provider';

export const getAll = async ({ }: Request, res: Response) => {
  const result = await provider.getAll();
  // todo if want to use message, code, do it here at service, not at provider
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

export const getOne = async ({ params }: Request, res: Response) => {
  const result = await provider.getOne(+params?.id);
  res.status(200).send(result);
};
