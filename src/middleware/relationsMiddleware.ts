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
    logger.debug('middleware ledger req');
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

  if (!accountID) {
    res.status(400).send('account id is required');
  }

  const hasPermission = (entity: Account | Category | Payee, ledger, userID) => {
    return (
      entity && entity.ledgerId === ledger.id && ledger.userId === userID
    );
  }
  let ledger;

  try {
    ledger = req.ledger;
    const account = await Account.getRepo().findOne(accountID);
    logger.debug('middleware trans req');
    logger.debug(ledger);
    logger.debug(account);
    logger.debug(req.user.id)
    if (!hasPermission(account, ledger, req.user.id)) {
      res.status(403).send('you do not have permission');
    }
  } catch (e) {
    logger.error(e);
    res.status(400).send('ledger and account id are required');
  }

  try {
    if (categoryID) {
      const category = await Category.getRepo().findOne(categoryID);
      if (!hasPermission(category, ledger, req.user.id)) {
        res.status(403).send('you do not have permission');
      }
    }
    if (toAccountID) {
      const entity = await Account.getRepo().findOne(toAccountID);
      if (!hasPermission(entity, ledger, req.user.id)) {
        res.status(403).send('you do not have permission ');
      }
    }
    if (payeeID) {
      const entity = await Payee.getRepo().findOne(payeeID);
      if (!hasPermission(entity, ledger, req.user.id)) {
        res.status(403).send('you do not have permission ');
      }
    }
  } catch (e) {
    logger.error(e);
    res.status(400).send('errors in relations to category, account, payee');
  }

  next();
};
