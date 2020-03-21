import { Request, Response } from 'express';


export const index = async ({ query }: Request, res: Response) => {
  const result = await index();
  res.status(200).send(result);
}
