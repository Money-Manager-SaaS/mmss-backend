import { Response } from 'express';
import { Account as Entity} from '../../entity/Account';


const getFindOption = (ledgerID) => (
  {
    relations: ['ledger'],
    where: {
      ledger: {
        id: ledgerID
      }
    }
  }
);

export const getAll = async (req: any, res: Response) => {
  const ledgerRepo = Entity.getRepo();
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
  const ledgerRepo = Entity.getRepo();
  const ledgerID = req.params?.ledgerID;
  try {
    const ledger = await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && item.user.id === req.user.id) {
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
  const ledgerRepo = Entity.getRepo();
  try {
    const ledger = await ledgerRepo.create(req.body) as unknown as Ledger;
    item.user = req.user;
    await ledgerRepo.save(ledger);
    res.status(200).send(ledger);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const updateOne = async (req, res: Response) => {
  const ledgerID = req.params?.ledgerID;
  const ledgerRepo = Entity.getRepo();
  try {
    const ledger = await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && item.user.id === req.user.id) {
      await ledgerRepo.update(item.id, req.body);
      res.status(200).end();
    }
    res.status(400).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res: Response) => {
  const ledgerID = req.params?.ledgerID;
  const ledgerRepo = Entity.getRepo();
  try {
    const ledger =  await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && item.user.id === req.user.id) {
      await ledgerRepo.softDelete(item.id);
      res.status(200).json({});
    } else {
      res.status(400).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
