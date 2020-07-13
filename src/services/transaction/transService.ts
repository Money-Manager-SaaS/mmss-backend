import { Response } from 'express';
import { Transaction as Entity } from '../../entity/Transaction';
import logger from '../../logger';
import { getFindOption, getQueryOptions } from './utils';

/**
 * there is some limitation here
 * lt gt
 * dateStart dateEnd cannot be used together as query parameter
 * @param req
 * @param res
 */
export const getAll = async (req: any, res: Response) => {
  const entityRepo = Entity.getRepo();
  try {
    let option = getFindOption(req.body, req.accounts);
    if (req?.query) {
      option = getQueryOptions(req.query, option);
    }
    logger.debug('# to get all req transactions option');
    logger.debug(option);

    const [items, count] = await entityRepo.findAndCount(
      option
    );
    if (items?.length && count>0) {
      res.status(200).send({
        data: items,
        count: count,
      });
    } else {
      logger.debug('cannot find transactions');
      logger.debug(items);
      res.status(204).send({
        data: [],
        count: 0,
      });
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
    const item = await entityRepo.findOne(entityID, getFindOption(ledgerID, req.accounts));
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
    item.accountId = req.account.id;
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
    const item = await entityRepo.findOne(entityID, getFindOption(ledgerID, req.accounts));
    logger.debug(item);
    if (item) {
      const {
        body,
        account,
        toAccount,
        category,
        payee,
      } = req;
      if (account) {
        item.account = account;
      }
      if (category) {
        item.category = category;
      }
      if (toAccount) {
        item.toAccount = toAccount;
      }
      if (payee) {
        item.payee = payee;
      }
      await entityRepo.save(item);
      const r = await entityRepo.update(item.id, body);
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
    const item = await entityRepo.findOne(entityID, getFindOption(ledgerID, req.accounts));
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
