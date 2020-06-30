import { Request, Response } from 'express';
import * as provider from '../account/provider';


export const singin = async ({ params }: Request, res: Response) => {
  const result = await provider.getOne(+params?.id);
  res.status(200).send(result);
};
