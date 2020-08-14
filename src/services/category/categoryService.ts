import { Response } from 'express';
import { Category as Entity } from '../../entity/Category';
import logger from '../../logger';
import { IsNull } from 'typeorm';


const getFindOption = (ledgerId) => (
  {
    where: {
      ledgerId: ledgerId,
      deletedAt: IsNull()
    }
  }
);

export const getAll = async (req: any, res: Response) => {
  const entityRepo = Entity.getRepo();
  try {
    const items = await entityRepo.find(
      getFindOption(req.ledgerID)
    );
    if (items?.length) {
      res.status(200).send(items);
    } else {
      res.status(204).send([]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};


export const getOne = async (req: any, res: Response) => {
  const entityRepo = Entity.getRepo();
  const ledgerID = req.ledgerID;
  try {
    const entityID = req.params.entityID;
    logger.debug('get an entity ' + entityID);
    const item = await entityRepo.findOne(entityID, getFindOption(ledgerID));
    logger.debug(item);
    if (item) {
      res.status(200).send(item);
    } else {
      res.status(204).send({});
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const createOne = async (req, res: Response) => {
  const entityRepo = Entity.getRepo();
  try {
    const item = await entityRepo.create(req.body) as unknown as Entity;
    item.ledgerId = req.ledgerID;
    await entityRepo.save(item);
    res.status(200).send(item);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const updateOne = async (req, res: Response) => {
  const ledgerID = req.ledgerID;
  const entityRepo = Entity.getRepo();
  try {
    const entityID = req.params.entityID;
    logger.debug('update an entity ' + entityID);
    const item = await entityRepo.findOne(entityID, getFindOption(ledgerID));
    logger.debug(item);
    if (item) {
      delete req.body.ledgerID;
      const r = await entityRepo.update(item.id, req.body);
      res.status(200).send(r);
    }
    res.status(400).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res: Response) => {
  const ledgerID = req.ledgerID;
  const entityRepo = Entity.getRepo();
  try {
    const entityID = req.params.entityID;
    logger.debug('delete an entity ' + entityID);
    const item = await entityRepo.findOne(entityID, getFindOption(ledgerID));
    logger.debug(item);
    if (item) {
      await entityRepo.softDelete(item.id);
      res.status(200).json({});
    } else {
      res.status(400).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
