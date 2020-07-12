import { Ledger } from '../entity/Ledger';
import logger from '../logger';
import { Account } from '../entity/Account';
import { Category } from '../entity/Category';
import { Payee } from '../entity/Payee';

export const prepareLedger = async (req, res, next) => {
  const ledgerID = req?.params?.ledgerID;
  if (!ledgerID) {
    res.status(400).send('ledger id is required');
  }
  try {
    const ledger = await Ledger.getRepo().findOne(ledgerID);
    logger.debug('middleware ledger in req');
    logger.debug(ledger);
    logger.debug( req.user.id)
    if (!ledger || ledger.userId !== req.user.id) {
      res.status(403).send('forbidden for this ledger');
    }
    req.ledgerID = ledgerID;
    req.ledger = ledger;
    next();
  } catch (e) {
    logger.error(e);
    res.status(400).send('ledger id is required');
  }
};

/**
 * prepare categories including account, payee, category
 * @param req
 * @param res
 * @param next
 */
export const prepareTransactionRelations = async (req, res, next) => {
  const accountID = req?.body?.accountID;
  const toAccountID = req?.body?.toAccountID;
  const categoryID = req?.body?.categoryID;
  const payeeID = req?.body?.payeeID;

  const hasPermission = (entity: Account | Category | Payee, ledger, userID) => {
    return (
      entity && entity.ledgerId === ledger.id && ledger.userId === userID
    );
  }
  const ledger = req.ledger;

  try {
    logger.debug('account found '+accountID);
    if (accountID) {
      const account = await Account.getRepo().findOne(accountID);
      if (!account) {
        res.status(400).send('cannot find account with id '+accountID);
      }
      if (!hasPermission(account, ledger, req.user.id)) {
        res.status(403).send('you do not have permission');
      }
      req.account = account;
      logger.debug('account found');
      logger.debug(account);
      delete req.body.accountID;
    }
    if (categoryID) {
      const category = await Category.getRepo().findOne(categoryID);
      if (!hasPermission(category, ledger, req.user.id)) {
        res.status(403).send('you do not have permission');
      }
      req.category = category;
      delete req.body.categoryID;
    }
    if (toAccountID) {
      const entity = await Account.getRepo().findOne(toAccountID);
      if (!hasPermission(entity, ledger, req.user.id)) {
        res.status(403).send('you do not have permission ');
      }
      req.account = entity;
      delete req.body.toAccountID;
    }
    if (payeeID) {
      const entity = await Payee.getRepo().findOne(payeeID);
      if (!hasPermission(entity, ledger, req.user.id)) {
        res.status(403).send('you do not have permission ');
      }
      req.payee=entity;
      delete req.body.payeeID;
    }
  } catch (e) {
    logger.error(e);
    res.status(400).send('errors in relations to category, account, payee');
  }
  next();
};


export const prepareAccounts = async (req, res, next) => {
  const ledger = req.ledger;
  try {
    const accounts = await Account.find({
      ledgerId: ledger.id
    });
    req.accounts = accounts;
    next();
  } catch (e) {
    logger.error(e);
    res.status(500).send('internal error, cannot get accounts');
  }

}
