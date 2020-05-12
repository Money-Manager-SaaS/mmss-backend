import { Request, Response } from 'express';
import * as provider from './provider';

export const getAll = async ({ }: Request, res: Response) => {
  const result = await provider.getAll();
  res.status(200).send(result);
};

export const getOne = async ({ params }: Request, res: Response) => {
  const result = await provider.getOne(+params?.id);
  res.status(200).send(result);
};

export const create = async ({ body, params }: Request, res: Response) => {
  const result = await provider.create(body);
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
