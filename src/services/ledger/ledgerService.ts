import { Request, Response } from 'express';
import { Ledger } from '../../entity/Ledger';

/**
 * should be used only for admin/manager
 * @param params
 * @param res
 */
export const getAll = async ({params}: Request, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  const ledgers = await ledgerRepo.find();
  if (ledgers?.length) {
    res.status(200).send(ledgers);
  }
  res.status(204).send([]);
};


export const getOne = async ({params}: Request, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.findOne(+params?.ledgerID);
    if (!ledger) {
      res.status(204).send({});
    }
    res.status(200).send(ledger);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const createOne = async ({body}: Request, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.create(body);
    await ledgerRepo.save(ledger);
    res.status(200).send(ledger);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const updateOne = async ({body, params}: Request, res: Response) => {
  const ledgerID = params?.ledgerID;
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.findOne(ledgerID);
    if (ledger) {
      await ledgerRepo.update(ledger.id, body);
      res.status(200).end();
    }
    res.status(400).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteOne = async ({body}: Request, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.findOne(body.id);
    if (ledger) {
      await ledgerRepo.softDelete(ledger.id);
      res.status(200).json({});
    } else {
      res.status(400).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
