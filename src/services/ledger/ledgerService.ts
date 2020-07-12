import { Response } from 'express';
import { Ledger } from '../../entity/Ledger';


const getFindOption = (userID) => (
  {
    where: {
      userId: userID
    }
  }
);

export const getAll = async (req: any, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledgers = await ledgerRepo.find(
      getFindOption(req.user.id)
    );
    if (ledgers?.length) {
      res.status(200).send(ledgers);
    } else {
      res.status(204).send([]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};


export const getOne = async (req: any, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  const ledgerID = req.params?.ledgerID;
  try {
    const ledger = await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && ledger.userId === req.user.id) {
      res.status(200).send(ledger);
    } else {
      res.status(204).send({});
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const createOne = async (req, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.create(req.body) as unknown as Ledger;
    ledger.user = req.user;
    await ledgerRepo.save(ledger);
    delete ledger.user.password;
    res.status(200).send(ledger);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const updateOne = async (req, res: Response) => {
  const ledgerID = req.params?.ledgerID;
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && ledger.userId === req.user.id) {
      const r = await ledgerRepo.update(ledger.id, req.body);
      res.status(200).send(r);
    }
    res.status(400).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res: Response) => {
  const ledgerID = req.params?.ledgerID;
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger =  await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && ledger.userId === req.user.id) {
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
