import { Response } from 'express';
import { Transaction as Entity } from '../../entity/Transaction';
import logger from '../../logger';
import { In } from 'typeorm';
import { Account } from '../../entity/Account';

const getFindOption = (body: any, accounts: Account[]) => {
  const {accountID, toAccountID, categoryID, payeeID} = body;
  // limit to the ledger's accounts
  logger.debug('the accounts in req');
  logger.debug(accounts);

  const conditions = {
    accountId: In(accounts.map(acc=>acc.id))
  };

  if (!accountID && !toAccountID && !categoryID && !payeeID) {
    return null;
  }

  if (accountID) {
    Object.assign(
      conditions,
      {accountId: accountID},
    )
  }
  if (toAccountID) {
    Object.assign(
      conditions,
      {toAccountId: toAccountID},
    )
  }
  if (categoryID) {
    Object.assign(
      conditions,
      {categoryId: categoryID},
    )
  }
  if (payeeID) {
    Object.assign(
      conditions,
      {payeeId: payeeID},
    )
  }
  return {
    where: conditions
  }
};

export const getAll = async (req: any, res: Response) => {
  const entityRepo = Entity.getRepo();
  try {
    const items = await entityRepo.find(
      getFindOption(req.body, req.accounts)
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
